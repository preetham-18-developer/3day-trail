import React from 'react';
import CompareColleges from '../../components/CompareColleges';

export default function ComparePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow pt-10">
        <CompareColleges />
      </div>
    </main>
  );
}
