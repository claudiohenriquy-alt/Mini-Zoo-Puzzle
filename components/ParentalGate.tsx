
import React, { useState, useMemo } from 'react';
import ZooButton from './ZooButton';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  
  const { num1, num2, result } = useMemo(() => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    return { num1: n1, num2: n2, result: n1 + n2 };
  }, []);

  const handleSubmit = () => {
    if (parseInt(answer, 10) === result) {
      onSuccess();
    } else {
      setError('Not quite! Try again.');
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-2">Are you a grown-up?</h2>
        <p className="mb-4">To continue, please answer this question:</p>
        <p className="text-4xl font-display mb-4">{num1} + {num2} = ?</p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-2xl mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-center gap-4">
          <ZooButton color="bg-gray-400" onClick={onCancel}>Cancel</ZooButton>
          <ZooButton color="bg-brand-green" onClick={handleSubmit}>Confirm</ZooButton>
        </div>
      </div>
    </div>
  );
};

export default ParentalGate;
