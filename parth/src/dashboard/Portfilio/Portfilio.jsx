import React from 'react';
import InteractiveCharacter from './Interactive';
import './Portfilio.css';

export default function Portfilio() {
  return (
    <div className="App">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            My <strong style={{ color: 'blue' }}>Portfolio</strong> Builder
          </h1>
        </div>
      </div>
      
      <InteractiveCharacter />
    </div>
  );
}
