import React from 'react';
import Predictor from '../../components/Predictor';

export default function PredictorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
        <Predictor />
      </div>
    </main>
  );
}
