'use client';
import React, { useState, useEffect, useRef } from 'react';

interface PinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  title?: string;
  isLoading?: boolean;
}

export default function PinDialog({ isOpen, onClose, onSubmit, title = "Enter PIN", isLoading = false }: PinDialogProps) {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus next
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto submit when full
    if (index === 3 && value && newPin.every(v => v !== '')) {
      onSubmit(newPin.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-sm p-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-on-surface mb-6">{title}</h3>
        
        <div className="flex gap-4 justify-center mb-8">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-outline-variant bg-surface-container focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              disabled={isLoading}
            />
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 btn bg-surface-container text-on-surface-variant hover:bg-surface-container-high py-3"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            onClick={() => onSubmit(pin.join(''))}
            disabled={isLoading || pin.some(v => v === '')}
            className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
