import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiBook, FiAward, 
  FiLink, FiPlus, FiX, FiChevronDown, FiGithub, 
  FiLinkedin, FiGlobe, FiCalendar, FiBriefcase 
} from 'react-icons/fi';

const StudentProfileForm = () => {
  // Basic Info State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    education: '',
    graduationYear: '',
    github: '',
    linkedin: '',
    website: '',
    experience: ''
  });

  // Education Options
  const educationOptions = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  // Skills State
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showEducationDropdown, setShowEducationDropdown] = useState(false);
  const skillDropdownRef = useRef(null);
  const educationDropdownRef = useRef(null);
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    startDate: '',
    endDate: ''
  });
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  // Certificates State
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    date: '',
    link: ''
  });
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  // Common skill options
  const skillOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java',
    'HTML/CSS', 'TypeScript', 'GraphQL', 'Docker', 'AWS',
    'UI/UX Design', 'Data Analysis', 'Machine Learning', 'Git'
  ];

  // Handle basic form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Character limit for experience
    if (name === 'experience' && value.length > 500) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle education selection
  const handleEducationSelect = (education) => {
    setFormData(prev => ({
      ...prev,
      education
    }));
    setShowEducationDropdown(false);
  };

  // Handle skill addition
  const handleAddSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
    }
    setNewSkill('');
    setShowSkillDropdown(false);
  };

  // Handle custom skill addition
  const handleAddCustomSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
      setShowSkillDropdown(false);
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Handle project form changes
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add project
  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects(prev => [...prev, newProject]);
      setNewProject({
        title: '',
        description: '',
        link: '',
        startDate: '',
        endDate: ''
      });
      setShowProjectForm(false);
    }
  };

  // Remove project
  const handleRemoveProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  // Handle certificate form changes
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add certificate
  const handleAddCertificate = () => {
    if (newCertificate.name.trim()) {
      setCertificates(prev => [...prev, newCertificate]);
      setNewCertificate({
        name: '',
        issuer: '',
        date: '',
        link: ''
      });
      setShowCertificateForm(false);
    }
  };

  // Remove certificate
  const handleRemoveCertificate = (index) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      skills,
      projects,
      certificates
    };
    console.log('Profile Data:', profileData);
    alert('Profile submitted successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-900">Student Profile</h1>
          <p className="mt-2 text-lg text-gray-600">Create your professional academic profile</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          {/* Basic Information Section */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="p-6 border-b border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiUser className="mr-2" /> Basic Information
            </h2>
            
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          
              

              {/* Education Dropdown */}
              <div className="sm:col-span-3 relative" ref={educationDropdownRef}>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    onClick={() => setShowEducationDropdown(!showEducationDropdown)}
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <span className="block truncate">
                      {formData.education || 'Select education level'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {showEducationDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto"
                      >
                        {educationOptions.map((option) => (
                          <motion.div
                            key={option}
                            whileHover={{ scale: 1.02, backgroundColor: '#f5f3ff' }}
                            className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                            onClick={() => handleEducationSelect(option)}
                          >
                            <span className="font-normal block truncate">
                              {option}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                  Graduation Year
                </label>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <input
                    type="number"
                    name="graduationYear"
                    id="graduationYear"
                    min="1900"
                    max="2100"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </motion.div>
              </div>

             

              <div className="sm:col-span-3">
                <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                  GitHub
                </label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiGithub className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="github"
                    id="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    placeholder="https://github.com/username"
                  />
                </motion.div>               
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLinkedin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="linkedin"
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    placeholder="https://linkedin.com/in/username"
                  />
                </motion.div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Personal Website
                </label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiGlobe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    placeholder="https://yourwebsite.com"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="p-6 border-b border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiAward className="mr-2" /> Skills
            </h2>
            
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-indigo-500 hover:text-indigo-700"
                    >
                      <FiX size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="relative" ref={skillDropdownRef}>
                <div className="flex">
                  <motion.div whileFocus={{ scale: 1.01 }} className="flex-1">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => {
                        setNewSkill(e.target.value);
                        setShowSkillDropdown(true);
                      }}
                      onFocus={() => setShowSkillDropdown(true)}
                      className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a skill"
                    />
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <FiChevronDown />
                  </button>
                </div>

                <AnimatePresence>
                  {showSkillDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto"
                    >
                      {skillOptions
                        .filter(option => 
                          option.toLowerCase().includes(newSkill.toLowerCase())
                        )
                        .map((option) => (
                          <motion.div
                            key={option}
                            whileHover={{ scale: 1.02, backgroundColor: '#f5f3ff' }}
                            className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                            onClick={() => handleAddSkill(option)}
                          >
                            <span className="font-normal block truncate">
                              {option}
                            </span>
                          </motion.div>
                        ))}
                      {newSkill.trim() && !skillOptions.includes(newSkill) && (
                        <motion.div
                          whileHover={{ scale: 1.02, backgroundColor: '#f5f3ff' }}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 flex items-center"
                          onClick={handleAddCustomSkill}
                        >
                          <FiPlus className="mr-2" />
                          <span className="font-normal block truncate">
                            Add "{newSkill}"
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="p-6 border-b border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiBook className="mr-2" /> Projects
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowProjectForm(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-1" /> Add Project
              </motion.button>
            </div>

            <AnimatePresence>
              {showProjectForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-gray-50 p-4 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="projectTitle"
                        value={newProject.title}
                        onChange={handleProjectChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="projectDescription"
                        rows={3}
                        value={newProject.description}
                        onChange={handleProjectChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="projectLink" className="block text-sm font-medium text-gray-700">
                        Link (optional)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="link"
                          id="projectLink"
                          value={newProject.link}
                          onChange={handleProjectChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="projectStartDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="projectStartDate"
                        value={newProject.startDate}
                        onChange={handleProjectChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="projectEndDate" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="projectEndDate"
                        value={newProject.endDate}
                        onChange={handleProjectChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowProjectForm(false)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Project
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 space-y-4">
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX />
                      </button>
                    </div>
                    {project.startDate && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <FiCalendar className="mr-1" />
                        {project.startDate} - {project.endDate || 'Present'}
                      </p>
                    )}
                    {project.description && (
                      <p className="mt-2 text-gray-600">{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        <FiLink className="mr-1" /> View Project
                      </a>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Certificates Section */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="p-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiAward className="mr-2" /> Certificates
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowCertificateForm(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-1" /> Add Certificate
              </motion.button>
            </div>

            <AnimatePresence>
              {showCertificateForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-gray-50 p-4 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="certificateName" className="block text-sm font-medium text-gray-700">
                        Certificate Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="certificateName"
                        value={newCertificate.name}
                        onChange={handleCertificateChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="certificateIssuer" className="block text-sm font-medium text-gray-700">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        name="issuer"
                        id="certificateIssuer"
                        value={newCertificate.issuer}
                        onChange={handleCertificateChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="certificateDate" className="block text-sm font-medium text-gray-700">
                        Date Issued
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="certificateDate"
                        value={newCertificate.date}
                        onChange={handleCertificateChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="certificateLink" className="block text-sm font-medium text-gray-700">
                        Credential URL (optional)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="link"
                          id="certificateLink"
                          value={newCertificate.link}
                          onChange={handleCertificateChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          placeholder="https://example.com/certificate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowCertificateForm(false)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddCertificate}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Certificate
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 space-y-4">
              <AnimatePresence>
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{certificate.name}</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertificate(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX />
                      </button>
                    </div>
                    {certificate.issuer && (
                      <p className="text-sm text-gray-600 mt-1">Issued by: {certificate.issuer}</p>
                    )}
                    {certificate.date && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <FiCalendar className="mr-1" />
                        {certificate.date}
                      </p>
                    )}
                    {certificate.link && (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        <FiLink className="mr-1" /> View Credential
                      </a>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Submit Button */}
          <div className="px-6 py-4 bg-gray-50 text-right">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Profile
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default StudentProfileForm;