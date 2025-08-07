import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Color palettes
const colorPalettes = [
  ['#C2A8DB', '#B28BCC', '#8BC9CA', '#82C7D6'],
  ['#00C9BC', '#219E65', '#1E5A00', '#A8C600'],
  ['#A7E6D1', '#FFDDAC', '#F4B1B1', '#D4ADEB'],
  ['#00194F', '#003E7A', '#0073B3', '#9CD6F1'],
  ['#F15B2A', '#F0C14B', '#A3D9A5', '#81B29A'],
  ['#F6D1CC', '#F6AC88', '#F6D58F', '#CFC3A3'],
];

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 40px;
  margin-top:0px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentSection = styled.div`
  flex: 1;
`;

const AnimationSection = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2, #F15B2A, #F0C14B);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradient} 8s ease infinite;
  padding: 0.5rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
  
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, #4a5568, #718096);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    
    span {
      font-size: 1.2rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 30px;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 0px;
`;

const PaletteCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  background: #fff;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: ${({ $index }) => $index * 0.1}s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  }
`;

const ColorsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
`;

const ColorBox = styled.div`
  flex: 1;
  height: 60px;
  border-radius: 8px;
  background: ${({ $color }) => $color};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const PaletteName = styled.h3`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 600;
`;

const SelectButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PromptText = styled.div`
  position: absolute;
  bottom: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  font-weight: 500;
  color: #4a5568;
  animation: ${float} 3s ease-in-out infinite;
  z-index: 2;
`;

const paletteNames = [
  "Serene Pastels",
  "Vibrant Nature",
  "Soft Harmony",
  "Deep Ocean",
  "Warm Contrast",
  "Muted Earth"
];

const ColorSelector = () => {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const voiceRef = useRef(null);
  const navigate = useNavigate();

  // Enhanced female voice detection
  const findFemaleVoice = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    
    // List of known female voice identifiers across platforms
    const femaleVoiceIdentifiers = [
      'female', 'woman', 'girl',
      // Windows voices
      'zira', 'eva', 'hazel',
      // macOS voices
      'samantha', 'karen', 'tessa', 'serena', 'ava', 'allison',
      // Chrome OS voices
      'english female', 'en-us female',
      // Other common female names
      'susan', 'audrey', 'lisa', 'melanie', 'naomi'
    ];
    
    // First try to find an exact match
    const exactMatch = voices.find(voice => {
      const voiceName = voice.name.toLowerCase();
      return femaleVoiceIdentifiers.some(id => voiceName.includes(id));
    });
    
    if (exactMatch) return exactMatch;
    
    // Then try to find by gender property if available
    const genderMatch = voices.find(voice => 
      voice.lang.includes('en-') && voice.gender === 'female'
    );
    
    if (genderMatch) return genderMatch;
    
    // Fallback to any English voice
    return voices.find(voice => voice.lang.includes('en-')) || voices[0];
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    
    const initializeVoice = () => {
      voiceRef.current = findFemaleVoice();
      
      if (voiceRef.current) {
        speakText("Welcome to your color palette selection. Please choose your favorite color combination for your portfolio.");
      }
    };

    // Some browsers need this event listener
    synth.onvoiceschanged = initializeVoice;

    // Try to load voices immediately
    if (synth.getVoices().length > 0) {
      initializeVoice();
    } else {
      // If voices aren't loaded yet, try again after a short delay
      const voiceCheckInterval = setInterval(() => {
        if (synth.getVoices().length > 0) {
          clearInterval(voiceCheckInterval);
          initializeVoice();
        }
      }, 100);
      
      return () => clearInterval(voiceCheckInterval);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text) => {
    if (!voiceRef.current || !text) return;
    
    setCurrentSpeech(text);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.rate = 0.9;  // Comfortable speaking rate
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    utterance.volume = 1;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handlePaletteSelect = (index) => {
    setSelectedPalette(index);
    const paletteName = paletteNames[index];
    speakText(`You've selected the ${paletteName} palette. Excellent choice! This color combination will give your portfolio a ${paletteName.toLowerCase()} aesthetic. Let's continue to the next step.`);
    
    // Store the selected palette
    localStorage.setItem('selectedPalette', JSON.stringify({
      colors: colorPalettes[index],
      name: paletteNames[index]
    }));
    
    // Navigate to next page after a short delay
    setTimeout(() => {
      navigate('/Template'); 
    }, 10000); // Longer delay to allow voice to finish
  };

  return (
    <Container>
      <ContentSection>
        <Title>
          Discover Your Perfect Palette
          <span>Select colors that reflect your personal style</span>
        </Title>
        <Subtitle>
          Choose from our carefully curated color palettes to find the perfect combination 
          for your portfolio. Each palette is designed to create visual harmony and make your 
          content stand out.
        </Subtitle>
        
        <PaletteGrid>
          {colorPalettes.map((palette, index) => (
            <PaletteCard 
              key={index} 
              $index={index}
              onClick={() => handlePaletteSelect(index)}
            >
              <PaletteName>{paletteNames[index]}</PaletteName>
              <ColorsRow>
                {palette.map((color, i) => (
                  <ColorBox key={i} $color={color} />
                ))}
              </ColorsRow>
              <SelectButton>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Select Palette
              </SelectButton>
            </PaletteCard>
          ))}
        </PaletteGrid>
      </ContentSection>

      <AnimationSection>
        <DotLottieReact
          src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
          loop
          autoplay
          style={{ width: '150%', height: '80%' }}
        />
        <PromptText>{currentSpeech || "Choose colors that inspire you"}</PromptText>
      </AnimationSection>
    </Container>
  );
};

export default ColorSelector;