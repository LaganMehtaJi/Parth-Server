import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaKey, FaEye, FaEyeSlash, FaPlus, FaTrash } from 'react-icons/fa';

const History = () => {
  // Social media links state
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    portfolio: ''
  });

  // App passwords state
  const [appPasswords, setAppPasswords] = useState([
    { id: 1, name: 'Job Portal API', password: '••••••••', visible: false, created: '2023-05-15' },
    { id: 2, name: 'Resume Builder', password: '••••••••', visible: false, created: '2023-06-20' }
  ]);
  
  const [newAppName, setNewAppName] = useState('');

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (id) => {
    setAppPasswords(prev => prev.map(pw => 
      pw.id === id ? { ...pw, visible: !pw.visible } : pw
    ));
  };

  const generateNewPassword = () => {
    if (!newAppName.trim()) return;
    
    const newPassword = Math.random().toString(36).slice(-12); // Simple random string
    const newApp = {
      id: Date.now(),
      name: newAppName,
      password: newPassword,
      visible: true,
      created: new Date().toISOString().split('T')[0]
    };
    
    setAppPasswords(prev => [...prev, newApp]);
    setNewAppName('');
  };

  const deleteAppPassword = (id) => {
    setAppPasswords(prev => prev.filter(pw => pw.id !== id));
  };

  const saveChanges = () => {
    // API calls to save both social links and app passwords
    console.log('Saving:', { socialLinks, appPasswords });
    alert('Settings saved successfully!');
  };

  return (
    <div className="student-app-settings">
      <h2><FaKey /> Application Settings</h2>
      
      {/* Social Media Links Section */}
      <div className="settings-section">
        <h3>Social Media Links</h3>
        <div className="social-links-grid">
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          
          <div className="form-group">
            <label><FaGithub /> GitHub</label>
            <input
              type="url"
              name="github"
              value={socialLinks.github}
              onChange={handleSocialLinkChange}
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div className="form-group">
            <label><FaTwitter /> Twitter</label>
            <input
              type="url"
              name="twitter"
              value={socialLinks.twitter}
              onChange={handleSocialLinkChange}
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          
          <div className="form-group">
            <label>Portfolio Website</label>
            <input
              type="url"
              name="portfolio"
              value={socialLinks.portfolio}
              onChange={handleSocialLinkChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>

      {/* App Passwords Section */}
      <div className="settings-section">
        <h3>Application Passwords</h3>
        <p className="info-text">
          These passwords allow external applications to access your placement portal data.
        </p>
        
        <div className="app-passwords-list">
          {appPasswords.map(app => (
            <div key={app.id} className="app-password-item">
              <div className="app-info">
                <span className="app-name">{app.name}</span>
                <span className="app-created">Created: {app.created}</span>
              </div>
              <div className="password-display">
                {app.visible ? (
                  <span className="password-text">{app.password}</span>
                ) : (
                  <span className="password-dots">••••••••</span>
                )}
                <button 
                  onClick={() => togglePasswordVisibility(app.id)}
                  className="toggle-password"
                >
                  {app.visible ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button 
                  onClick={() => deleteAppPassword(app.id)}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="new-app-password">
          <input
            type="text"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            placeholder="Enter application name"
          />
          <button onClick={generateNewPassword} className="generate-btn">
            <FaPlus /> Generate New Password
          </button>
        </div>
      </div>

      <button onClick={saveChanges} className="save-btn">
        Save All Changes
      </button>

      {/* CSS would go here or in a separate file */}
      <style jsx>{`
        .student-app-settings {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h2, h3 {
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .settings-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .social-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        input[type="url"],
        input[type="text"] {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .app-passwords-list {
          margin-top: 20px;
        }
        
        .app-password-item {
          background: #f8f9fa;
          padding: 12px 15px;
          border-radius: 4px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .app-info {
          display: flex;
          flex-direction: column;
        }
        
        .app-name {
          font-weight: 500;
        }
        
        .app-created {
          font-size: 0.8em;
          color: #666;
        }
        
        .password-display {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .password-text, .password-dots {
          font-family: monospace;
        }
        
        .toggle-password, .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
        }
        
        .delete-btn:hover {
          color: #e74c3c;
        }
        
        .new-app-password {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        .generate-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .save-btn {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1em;
          margin-top: 20px;
        }
        
        .info-text {
          color: #666;
          font-size: 0.9em;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default History;