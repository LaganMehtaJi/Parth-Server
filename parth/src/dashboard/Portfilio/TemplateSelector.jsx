import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';

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
    name: "Ui-Ux designer",
    description: "Clean and professional design with focus on your work",
    image: "/portfilio.png",
    colors: ['#2D3748', '#4A5568', '#CBD5E0', '#F7FAFC'],
    demoContent: {
      name: "Sarah Johnson",
      title: "Senior UI/UX Designer",
      about: "Specializing in creating intuitive user experiences with 8+ years of industry experience.",
      skills: ["User Research", "Wireframing", "Prototyping", "UI Design", "UX Strategy"],
      projects: [
        { name: "E-commerce Platform", description: "Redesigned checkout flow increased conversions by 32%" },
        { name: "Mobile Banking App", description: "Created award-winning interface for financial services" }
      ]
    }
  },
  {
    id: 2,
    name: "Software Developer",
    description: "Vibrant layout perfect for designers and artists",
    image: "/portfilio.png",
    colors: ['#F56565', '#ED8936', '#ECC94B', '#48BB78'],
    demoContent: {
      name: "Michael Chen",
      title: "Full Stack Developer",
      about: "Building scalable web applications with modern technologies.",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      projects: [
        { name: "Social Media Dashboard", description: "Built real-time analytics platform for influencers" },
        { name: "Inventory System", description: "Developed cloud-based solution for retail chain" }
      ]
    }
  },
  {
    id: 3,
    name: "Business Development",
    description: "Sleek template ideal for professionals and developers",
    image: "/portfilio.png",
    colors: ['#4299E1', '#3182CE', '#63B3ED', '#EBF8FF'],
    demoContent: {
      name: "David Wilson",
      title: "Business Development Executive",
      about: "Driving growth through strategic partnerships and market expansion.",
      skills: ["Sales Strategy", "Market Research", "Negotiation", "CRM", "Lead Generation"],
      projects: [
        { name: "Market Expansion", description: "Led entry into 3 new international markets" },
        { name: "Partner Program", description: "Developed ecosystem that increased revenue by 45%" }
      ]
    }
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
  margin-top: 5%;

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
  margin-top: 2px;
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
  margin-top: 0;
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
  margin-top: 0;

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
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [regNumber, setRegNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [speechText, setSpeechText] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const setVoice = () => {
      const voices = synth.getVoices();
      voiceRef.current = voices.find(v => 
        v.lang.includes('en-') && 
        (v.name.includes('Female') || 
         v.name.includes('Zira') || 
         v.name.includes('Samantha'))
      ) || voices[0];
      speakText("Welcome! Please enter your registration number and select a template");
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
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      setShowSpeech(false);
    }, 6000);
  };

  const fetchStudentData = async () => {
    if (!regNumber) {
      setError('Please enter a registration number');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/students/${regNumber}`);
      setStudentData(response.data);
      speakText(`Student data loaded for ${response.data.name}`);
    } catch (err) {
      setError('Student not found. Please check registration number');
      console.error('Error fetching student:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openTemplatePreview = (template) => {
    if (!studentData) {
      setError('Please load student data first');
      return;
    }

    setSelectedTemplate(template.id);
    speakText(`Opening ${template.name} template for ${studentData.name}`);

    const templateWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes');
    
    templateWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${studentData.name}'s ${template.name} Portfolio</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          body {
            background-color: #f8fafc;
            color: #1a202c;
          }
          .app-container {
            display: flex;
            min-height: 100vh;
          }
          .customization-panel {
            width: 300px;
            padding: 2rem;
            background: white;
            box-shadow: 2px 0 10px rgba(0,0,0,0.05);
            position: fixed;
            height: 100vh;
            overflow-y: auto;
          }
          .template-preview {
            flex: 1;
            margin-left: 300px;
            padding: 2rem;
          }
          .color-options {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 1.5rem 0;
          }
          .color-option {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s ease;
          }
          .color-option:hover {
            transform: scale(1.1);
          }
          .color-option.selected {
            border-color: #1a202c;
            transform: scale(1.1);
          }
          h1 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #1a202c;
          }
          h2 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0.5rem;
            color: #1a202c;
          }
          .template-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
            max-width: 800px;
            margin: 0 auto;
          }
          .template-header {
            padding: 2rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
          }
          .template-content {
            padding: 2rem;
          }
          .template-section {
            margin-bottom: 2rem;
          }
          .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-primary {
            background: #4f46e5;
            color: white;
          }
          .btn-primary:hover {
            background: #4338ca;
          }
          .skill-tag {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #e2e8f0;
            border-radius: 999px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
          }
          .project-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #edf2f7;
          }
        </style>
      </head>
      <body>
        <div class="app-container">
          <div class="customization-panel">
            <h1>${studentData.name}'s Portfolio</h1>
            <h2>Color Scheme</h2>
            <div class="color-options" id="colorOptions">
              ${template.colors.map(color => `
                <div class="color-option" 
                     style="background: ${color}" 
                     data-color="${color}"
                     onclick="setTemplateColor('${color}')"></div>
              `).join('')}
            </div>
            <button class="btn btn-primary" style="margin-top: 2rem;" onclick="window.close()">
              Close Preview
            </button>
          </div>
          
          <div class="template-preview">
            <div class="template-container" id="templateContainer">
              <div class="template-header" id="templateHeader">
                <div>
                  <h1>${studentData.name}</h1>
                  <p>${studentData.program} - ${studentData.year}</p>
                </div>
              </div>
              <div class="template-content">
                <div class="template-section">
                  <h2>About</h2>
                  <p>${studentData.bio || 'No bio available'}</p>
                </div>
                <div class="template-section">
                  <h2>Skills</h2>
                  <div>
                    ${studentData.skills?.map(skill => `
                      <span class="skill-tag">${skill}</span>
                    `).join('') || 'No skills listed'}
                  </div>
                </div>
                <div class="template-section">
                  <h2>Projects</h2>
                  ${studentData.projects?.map(project => `
                    <div class="project-item">
                      <h3>${project.title}</h3>
                      <p>${project.description}</p>
                    </div>
                  `).join('') || 'No projects listed'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <script>
          function setTemplateColor(color) {
            document.querySelectorAll('.color-option').forEach(option => {
              option.classList.remove('selected');
            });
            event.target.classList.add('selected');
            
            // Apply color to template elements
            document.getElementById('templateHeader').style.background = color;
            document.querySelector('.btn-primary').style.background = color;
          }
          
          // Select first color by default
          setTimeout(() => {
            document.querySelector('.color-option').click();
          }, 100);
        </script>
      </body>
      </html>
    `);
    
    templateWindow.document.close();
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <Title style={{justifyContent:"center",marginTop:"15%"}}>Student Portfolio Builder</Title>
          <span style={{fontWeight:"bold", fontSize:"130%"}}>Create your personalized portfolio</span>
          <Subtitle>
            Enter your registration number and select a template to preview your portfolio
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
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Enter registration number"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={fetchStudentData}
              disabled={isLoading}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Loading...' : 'Load Data'}
            </button>
          </div>
          {error && <p style={{ color: '#e53e3e' }}>{error}</p>}
          {studentData && (
            <div style={{ 
              background: '#f0fff4',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #c6f6d5',
              marginTop: '1rem'
            }}>
              <p>Loaded: <strong>{studentData.name}</strong> ({studentData.regNumber})</p>
            </div>
          )}
        </div>

        <TemplateGrid>
          {templates.map((template, index) => (
            <TemplateCard 
              key={template.id}
              $index={index}
              $selected={selectedTemplate === template.id}
              $colors={template.colors}
              onClick={() => openTemplatePreview(template)}
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
                {selectedTemplate === template.id ? 'Previewing' : 'Preview'}
              </SelectButton>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </ContentSection>
    </Container>
  );
};

export default TemplateSelector;