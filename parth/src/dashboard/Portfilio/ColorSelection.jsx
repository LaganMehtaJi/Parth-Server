import React, { useState, useRef, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProfessionalColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const animationRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  // Professional color palette
  const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#A37AFC', '#FF9E7D',
    '#7BC862', '#E17055', '#FDCB6E', '#00B894', '#0984E3',
    '#6C5CE7', '#FD79A8', '#55EFC4', '#81ECEC', '#74B9FF',
    '#A29BFE', '#FF7675', '#FFEAA7', '#636E72', '#2D3436',
    '#E84393', '#00CEC9', '#546DE5', '#F78FB3', '#F5CD79'
  ];

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowAnimation(true);
    setDisplayMessage(false);
    
    // Clear any existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Restart animation
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current.play();
    }

    // Show message after 2 seconds
    messageTimeoutRef.current = setTimeout(() => {
      setDisplayMessage(true);
    }, 2000);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleNext = () => {
    // Replace with your actual navigation logic
    console.log(`Selected color for portfolio: ${selectedColor}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Portfolio Template Customization</h1>
        <p style={styles.subtitle}>Select your primary brand color</p>
      </div>
      
      <div style={styles.colorGrid}>
        {colorPalette.map((color, index) => (
          <div
            key={index}
            style={{
              ...styles.colorSquare,
              backgroundColor: color,
              transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
              boxShadow: selectedColor === color 
                ? `0 0 0 2px #fff, 0 0 0 4px ${color}, 0 4px 20px ${hexToRgba(color, 0.4)}`
                : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onClick={() => handleColorSelect(color)}
            title={color}
          >
            {selectedColor === color && (
              <div style={styles.checkmark}>✓</div>
            )}
          </div>
        ))}
      </div>
      
      {showAnimation && (
        <div style={styles.animationSection}>
          <div style={styles.animationContainer}>
            <DotLottieReact
              lottieRef={animationRef}
              src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
              loop={false}
              autoplay={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          {displayMessage && (
            <div style={styles.messageContainer}>
              <p style={styles.message}> your portfolio template color</p>
              <div style={{ ...styles.selectedColor, backgroundColor: selectedColor }} />
              <p style={styles.colorHex}>{selectedColor}</p>
            </div>
          )}
        </div>
      )}
      
      <div style={styles.buttonContainer}>
        <button 
          style={styles.cancelButton}
          onClick={handleCancel}
        >
          Back
        </button>
        <button
          style={{
            ...styles.nextButton,
            opacity: selectedColor ? 1 : 0.6,
            cursor: selectedColor ? 'pointer' : 'not-allowed',
            transform: selectedColor ? 'translateY(0)' : 'translateY(0)'
          }}
          onClick={handleNext}
          disabled={!selectedColor}
        >
          Continue to Template
        </button>
      </div>
    </div>
  );
};

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Professional styling
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    maxWidth: '680px',
    margin: '40px auto',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    color: '#2d3436',
    marginBottom: '8px',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    color: '#636e72',
    fontSize: '16px',
    fontWeight: '400',
    margin: '0'
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    margin: '40px 0'
  },
  colorSquare: {
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: '12px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
    }
  },
  checkmark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
  },
  animationSection: {
    margin: '40px 0',
    animation: 'fadeIn 0.6s ease-out'
  },
  animationContainer: {
    width: '220px',
    height: '220px',
    margin: '0 auto 24px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  messageContainer: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    maxWidth: '400px',
    margin: '0 auto',
    animation: 'slideUp 0.5s ease-out'
  },
  message: {
    fontSize: '18px',
    color: '#2d3436',
    fontWeight: '500',
    margin: '0 0 16px 0'
  },
  selectedColor: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    margin: '0 auto 12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '2px solid white'
  },
  colorHex: {
    fontSize: '14px',
    color: '#636e72',
    fontWeight: '500',
    margin: '8px 0 0 0'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(0,0,0,0.05)'
  },
  cancelButton: {
    padding: '14px 28px',
    backgroundColor: 'transparent',
    color: '#636e72',
    border: '1px solid #dfe6e9',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f8f9fa',
      borderColor: '#b2bec3'
    }
  },
  nextButton: {
    padding: '14px 32px',
    backgroundColor: '#2d3436',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: selected => selected ? '#1a1e1f' : '#2d3436',
      transform: selected => selected ? 'translateY(-2px)' : 'none',
      boxShadow: selected => selected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
    }
  }
};

// Add global styles
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default ProfessionalColorSelector;