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
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// Template data
const templates = [
  {
    id: 1,
    name: "Minimal Portfolio",
    description: "Clean and professional design with focus on your work",
    image: "/portfilio.png",
    colors: ['#2D3748', '#4A5568', '#CBD5E0', '#F7FAFC']
  },
  {
    id: 2,
    name: "Creative Showcase",
    description: "Vibrant layout perfect for designers and artists",
    image: "/portfilio.png",
    colors: ['#F56565', '#ED8936', '#ECC94B', '#48BB78']
  },
  {
    id: 3,
    name: "Modern Resume",
    description: "Sleek template ideal for professionals and developers",
    image: "/portfilio.png",
    colors: ['#4299E1', '#3182CE', '#63B3ED', '#EBF8FF']
  }
];

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;

  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  marign-top:5%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const HeaderContent = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top:2px;
  `;

const AnimationSection = styled.div`
  width: 350px;
  height: 350px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
    margin: 0 auto;
    order: -1;
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

const ContentSection = styled.div`
  width: 100%;
  margin-top:0;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TemplateCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  background: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: ${({ $index }) => $index * 0.1}s;
  cursor: pointer;
  border: 2px solid ${({ $selected }) => $selected ? '#667eea' : 'transparent'};
  position: relative;
  overflow: hidden;
  margin-top:0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${({ $selected, $colors }) => 
      $selected ? '#667eea' : `linear-gradient(90deg, ${$colors[0]}, ${$colors[1]})`};
  }
`;

const TemplateImage = styled.div`
  height: 200px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);

  ${TemplateCard}:hover & {
    transform: scale(1.03);
  }
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const TemplateDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  line-height: 1.6;
`;

const SelectButton = styled.button`
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  border-radius: 12px;
  border: none;
  background: ${({ $selected }) => $selected ? 'linear-gradient(135deg, #48BB78, #38A169)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: auto;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 20px -5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1.25rem 1.75rem;
  border-radius: 24px;
  box-shadow: 0 15px 30px -5px rgba(0,0,0,0.1);
  font-weight: 500;
  color: #2d3748;
  animation: ${scaleIn} 0.3s ease-out, ${float} 4s ease-in-out infinite;
  max-width: 300px;
  text-align: center;
  line-height: 1.5;
  font-size: 1.1rem;
  z-index: 10;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.3s ease;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.9);

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.9) transparent transparent;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 250px;
    padding: 1rem 1.5rem;
  }
`;

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [speechText, setSpeechText] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);
  const voiceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    
    const setVoice = () => {
      const voices = synth.getVoices();
      // Prioritize female voices (common names: Zira, Samantha, Karen, Tessa, etc.)
      voiceRef.current = voices.find(v => 
        v.lang.includes('en-') && 
        (v.name.includes('Female') || 
         v.name.includes('Zira') || 
         v.name.includes('Samantha') || 
         v.name.includes('Karen') || 
         v.name.includes('Tessa') ||
         v.name.includes('woman') ||
         v.name.toLowerCase().includes('female'))
      ) || voices[0];
      
      speakText("Welcome! Please select your preferred template");
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVoice;
    }

    if (synth.getVoices().length > 0) {
      setVoice();
    } else {
      setTimeout(setVoice, 1000);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text) => {
    if (!voiceRef.current || !text) return;
    
    setSpeechText(text);
    setShowSpeech(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.rate = 0.9;
    utterance.pitch = 1.1; 
    utterance.volume = 1;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      setShowSpeech(false);
    }, 6000);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    speakText(`Excellent choice! The ${template.name} template is perfect for ${template.description.toLowerCase()}`);
    
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    
    setTimeout(() => {
      navigate('/next-page');
    }, 3500);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <Title style={{justifyContent:"center",marginTop:"15%"}}>Find Your Perfect Template</Title>
          <span style={{fontWeight:"bold", fontSize:"130%"}}>Select Template that reflect your personal style</span>
          <Subtitle>
            Select from our professionally designed templates to showcase your work in the best light.
            Each template is optimized for different professional needs.
          </Subtitle>
        </HeaderContent>

        <AnimationSection>
          <DotLottieReact
            src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
          <SpeechBubble $visible={showSpeech}>
            {speechText}
          </SpeechBubble>
        </AnimationSection>
      </HeaderContainer>

      <ContentSection>
        <TemplateGrid>
          {templates.map((template, index) => (
            <TemplateCard 
              key={template.id}
              $index={index}
              $selected={selectedTemplate === template.id}
              $colors={template.colors}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <TemplateImage $image={template.image} />
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
              <SelectButton $selected={selectedTemplate === template.id}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {selectedTemplate === template.id ? (
                    <path d="M5 13l4 4L19 7" />
                  ) : (
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  )}
                </svg>
                {selectedTemplate === template.id ? 'Selected!' : 'Select Template'}
              </SelectButton>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </ContentSection>
    </Container>
  );
};

export default TemplateSelector;