import React from 'react';
import InteractiveCharacter from './Interactive';
import './Portfilio.css';

export default function Portfilio() {
  return (
    <div className="App">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className=" fixed bottom text-3xl font-bold">
            My <strong style={{ color: 'blue' }}>Portfolio</strong> Builder
          </h3>
        </div>
      </div>
      
    <div className="fixed bottom-5 right-5 z-50 w-230">
  <InteractiveCharacter />
</div>
    </div>
  );
}
