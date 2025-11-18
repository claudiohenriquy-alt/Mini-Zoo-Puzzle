
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Level, PuzzlePiece, DraggablePieceState } from '../types';
import { GeminiService } from '../services/geminiService';
import { useAudio } from '../hooks/useAudio';

interface PuzzleScreenProps {
  level: Level;
  onComplete: () => void;
  onBack: () => void;
}

const PUZZLE_SIZE = 512;
const SNAP_THRESHOLD = 50; // Slightly increased threshold for easier snapping

interface DraggablePieceProps {
  p: PuzzlePiece;
  state: DraggablePieceState;
  imageUrl: string | null;
  onDragStart: (id: number) => void;
  onDrag: (id: number, dx: number, dy: number) => void;
  onDragEnd: (id: number) => void;
}

const DraggablePiece: React.FC<DraggablePieceProps> = ({ p, state, imageUrl, onDragStart, onDrag, onDragEnd }) => {
  const pieceRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (state.isSnapped) return;
    e.preventDefault();
    onDragStart(state.id);
    
    const startPos = { x: e.clientX, y: e.clientY };

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startPos.x;
      const dy = moveEvent.clientY - startPos.y;
      startPos.x = moveEvent.clientX;
      startPos.y = moveEvent.clientY;
      onDrag(state.id, dx, dy);
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      onDragEnd(state.id);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Added Touch Event Handlers for Mobile/Tablet support
  const onTouchStart = (e: React.TouchEvent) => {
    if (state.isSnapped) return;
    // Don't preventDefault here immediately or it might block clicking, 
    // but we handle scroll prevention in touchmove
    
    onDragStart(state.id);
    const touch = e.touches[0];
    const startPos = { x: touch.clientX, y: touch.clientY };

    const onTouchMove = (moveEvent: TouchEvent) => {
      // Prevent scrolling while dragging a piece
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const currentTouch = moveEvent.touches[0];
      const dx = currentTouch.clientX - startPos.x;
      const dy = currentTouch.clientY - startPos.y;
      
      startPos.x = currentTouch.clientX;
      startPos.y = currentTouch.clientY;
      
      onDrag(state.id, dx, dy);
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      onDragEnd(state.id);
    };

    // passive: false is required to use preventDefault() to stop scrolling
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  };

  if (!imageUrl) return null;

  return (
    <div
      ref={pieceRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`absolute rounded-lg border-2 border-white shadow-lg transition-all duration-75 ${state.isSnapped ? 'pointer-events-none' : 'cursor-grab'} ${state.isDragging ? 'cursor-grabbing scale-110 shadow-2xl' : ''}`}
      style={{
        left: state.currentPos.x,
        top: state.currentPos.y,
        width: p.width,
        height: p.height,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${PUZZLE_SIZE}px ${PUZZLE_SIZE}px`,
        backgroundPosition: `${p.bgPosX}px ${p.bgPosY}px`,
        zIndex: state.zIndex,
        touchAction: 'none', // Critical for browser to know this element handles its own touch
      }}
    />
  );
};

const PuzzleScreen: React.FC<PuzzleScreenProps> = ({ level, onComplete, onBack }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggableStates, setDraggableStates] = useState<DraggablePieceState[]>([]);
  const [showHint, setShowHint] = useState(false);
  const puzzleAreaRef = useRef<HTMLDivElement>(null);
  const { playSnap } = useAudio();
  
  const highestZIndex = useRef(level.pieces);

  useEffect(() => {
    const generateImage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await GeminiService.generateAnimalImage(level.animalName);
        setImageUrl(url);
      } catch (e) {
        setError("Could not load the animal's picture. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    generateImage();
  }, [level.animalName]);

  useEffect(() => {
    if (!imageUrl) return;

    const numPieces = level.pieces;
    const cols = Math.ceil(Math.sqrt(numPieces));
    const rows = Math.ceil(numPieces / cols);
    const pieceWidth = PUZZLE_SIZE / cols;
    const pieceHeight = PUZZLE_SIZE / rows;

    const newPieces: PuzzlePiece[] = [];
    for (let i = 0; i < numPieces; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      newPieces.push({
        id: i,
        x: col * pieceWidth,
        y: row * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
        bgPosX: -col * pieceWidth,
        bgPosY: -row * pieceHeight,
      });
    }
    setPieces(newPieces);
    
    // Distribute pieces randomly around the board
    const newDraggableStates: DraggablePieceState[] = newPieces.map((p, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = PUZZLE_SIZE * 0.6 + Math.random() * 100;
        return {
            id: p.id,
            currentPos: {
                x: PUZZLE_SIZE / 2 + Math.cos(angle) * radius - p.width / 2,
                y: PUZZLE_SIZE / 2 + Math.sin(angle) * radius - p.height / 2,
            },
            isDragging: false,
            isSnapped: false,
            zIndex: i + 1,
        };
    });
    setDraggableStates(newDraggableStates);

  }, [imageUrl, level.pieces]);

  const handleDragStart = (id: number) => {
    highestZIndex.current += 1;
    setDraggableStates(states =>
      states.map(s =>
        s.id === id ? { ...s, isDragging: true, zIndex: highestZIndex.current } : s
      )
    );
  };

  const handleDrag = (id: number, dx: number, dy: number) => {
    setDraggableStates(states =>
      states.map(s =>
        s.id === id ? { ...s, currentPos: { x: s.currentPos.x + dx, y: s.currentPos.y + dy } } : s
      )
    );
  };

  const handleDragEnd = (id: number) => {
    const pieceState = draggableStates.find(s => s.id === id);
    const pieceDef = pieces.find(p => p.id === id);
    if (!pieceState || !pieceDef) return;

    const dist = Math.sqrt(
      Math.pow(pieceState.currentPos.x - pieceDef.x, 2) +
      Math.pow(pieceState.currentPos.y - pieceDef.y, 2)
    );

    let isSnapped = false;
    if (dist < SNAP_THRESHOLD) {
        isSnapped = true;
        playSnap();
    }
    
    const finalX = isSnapped ? pieceDef.x : pieceState.currentPos.x;
    const finalY = isSnapped ? pieceDef.y : pieceState.currentPos.y;

    setDraggableStates(states =>
      states.map(s =>
        s.id === id ? { ...s, isDragging: false, isSnapped, currentPos: {x: finalX, y: finalY} } : s
      )
    );
  };

  useEffect(() => {
    if (draggableStates.length > 0 && draggableStates.every(s => s.isSnapped)) {
      setTimeout(onComplete, 500);
    }
  }, [draggableStates, onComplete]);

  const showHintTemporarily = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 1000);
  };

  const piecesLeft = draggableStates.filter(s => !s.isSnapped).length;

  if (isLoading) return <div className="w-full h-full flex justify-center items-center font-display text-3xl">Loading Animal...</div>;
  if (error) return <div className="w-full h-full flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 p-4 overflow-hidden touch-none">
      <div className="absolute top-4 left-4 flex gap-4 z-50">
        <button onClick={onBack} className="text-gray-600 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <button onClick={showHintTemporarily} className="text-gray-600 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Lightbulb size={24} /> Hint
        </button>
      </div>
      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md font-bold z-50">
        Pieces left: {piecesLeft}
      </div>
      <div className="relative" ref={puzzleAreaRef} style={{ width: PUZZLE_SIZE * 1.5, height: PUZZLE_SIZE * 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="relative bg-gray-300/50 rounded-2xl shadow-inner" style={{width: PUZZLE_SIZE, height: PUZZLE_SIZE }}>
            {showHint && <img src={imageUrl!} className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />}
            {pieces.map(p => (
                <div key={`slot-${p.id}`}
                     className="absolute border-2 border-dashed border-gray-400 rounded-lg"
                     style={{
                         left: p.x,
                         top: p.y,
                         width: p.width,
                         height: p.height
                     }}
                />
            ))}
        </div>
        
        {pieces.map(p => {
            const state = draggableStates.find(s => s.id === p.id);
            if (!state) return null;
            return (
                <DraggablePiece 
                    key={p.id} 
                    p={p} 
                    state={state} 
                    imageUrl={imageUrl}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                />
            );
        })}
      </div>
    </div>
  );
};

export default PuzzleScreen;
