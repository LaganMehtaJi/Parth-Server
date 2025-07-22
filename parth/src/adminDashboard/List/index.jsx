import React, { useState, useEffect } from 'react';

const ListComponent = () => {
  // State for companies
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Tech Corp',
      roles: [
        {
          id: 1,
          name: 'Frontend Developer',
          students: [],
          filters: {
            field: '',
            class: '',
            minMarks: 0,
            status: 'all' // 'selected', 'pending', 'rejected', 'shortlisted'
          }
        }
      ],
      currentRound: 1,
      activeRoleId: 1
    }
  ]);
  
  // State for all students
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', field: 'Frontend', class: '2023', marks: 85, status: 'pending' },
    { id: 2, name: 'Jane Smith', field: 'Frontend', class: '2024', marks: 92, status: 'pending' },
    { id: 3, name: 'Mike Johnson', field: 'Backend', class: '2023', marks: 78, status: 'pending' }
  ]);
  
  const [activeCompanyId, setActiveCompanyId] = useState(1);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newRoleName, setNewRoleName] = useState('');

  // Get active company
  const activeCompany = companies.find(c => c.id === activeCompanyId);
  const activeRole = activeCompany?.roles.find(r => r.id === activeCompany.activeRoleId);

  // Filter students based on active role filters
  const filteredStudents = students.filter(student => {
    const role = activeRole;
    if (!role) return false;
    
    // Filter by field
    if (role.filters.field && student.field !== role.filters.field) return false;
    
    // Filter by class
    if (role.filters.class && student.class !== role.filters.class) return false;
    
    // Filter by marks
    if (role.filters.minMarks && student.marks < role.filters.minMarks) return false;
    
    // Filter by status
    if (role.filters.status !== 'all' && student.status !== role.filters.status) return false;
    
    return true;
  });

  // Add student to current role list
  const addStudentToRole = (studentId) => {
    if (!activeRole.students.includes(studentId)) {
      const updatedCompanies = companies.map(company => {
        if (company.id === activeCompanyId) {
          return {
            ...company,
            roles: company.roles.map(role => {
              if (role.id === activeRole.id) {
                return {
                  ...role,
                  students: [...role.students, studentId]
                };
              }
              return role;
            })
          };
        }
        return company;
      });
      setCompanies(updatedCompanies);
    }
  };

  // Remove student from current role list
  const removeStudentFromRole = (studentId) => {
    const updatedCompanies = companies.map(company => {
      if (company.id === activeCompanyId) {
        return {
          ...company,
          roles: company.roles.map(role => {
            if (role.id === activeRole.id) {
              return {
                ...role,
                students: role.students.filter(id => id !== studentId)
              };
            }
            return role;
          })
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
  };

  // Update student status
  const updateStudentStatus = (studentId, status) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          status: status,
          history: [
            ...(student.history || []),
            {
              company: activeCompany.name,
              role: activeRole.name,
              round: activeCompany.currentRound,
              status: status,
              date: new Date().toISOString()
            }
          ]
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Add new company
  const addCompany = () => {
    if (newCompanyName.trim()) {
      const newCompany = {
        id: Date.now(),
        name: newCompanyName,
        roles: [{
          id: 1,
          name: 'New Role',
          students: [],
          filters: {
            field: '',
            class: '',
            minMarks: 0,
            status: 'all'
          }
        }],
        currentRound: 1,
        activeRoleId: 1
      };
      setCompanies([...companies, newCompany]);
      setNewCompanyName('');
    }
  };

  // Add new role to active company
  const addRole = () => {
    if (newRoleName.trim()) {
      const updatedCompanies = companies.map(company => {
        if (company.id === activeCompanyId) {
          return {
            ...company,
            roles: [
              ...company.roles,
              {
                id: Date.now(),
                name: newRoleName,
                students: [],
                filters: {
                  field: '',
                  class: '',
                  minMarks: 0,
                  status: 'all'
                }
              }
            ]
          };
        }
        return company;
      });
      setCompanies(updatedCompanies);
      setNewRoleName('');
    }
  };

  // Update role filters
  const updateRoleFilters = (filterName, value) => {
    const updatedCompanies = companies.map(company => {
      if (company.id === activeCompanyId) {
        return {
          ...company,
          roles: company.roles.map(role => {
            if (role.id === activeRole.id) {
              return {
                ...role,
                filters: {
                  ...role.filters,
                  [filterName]: value
                }
              };
            }
            return role;
          })
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
  };

  return (
    <div className="list-component">
      {/* Company Selection */}
      <div className="company-selection">
        <h2>Companies</h2>
        <div className="company-tabs">
          {companies.map(company => (
            <div 
              key={company.id} 
              className={`company-tab ${activeCompanyId === company.id ? 'active' : ''}`}
              onClick={() => setActiveCompanyId(company.id)}
            >
              {company.name}
            </div>
          ))}
        </div>
        
        <div className="add-company">
          <input
            type="text"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            placeholder="New company name"
          />
          <button onClick={addCompany}>Add Company</button>
        </div>
      </div>

      {/* Role Selection */}
      {activeCompany && (
        <div className="role-selection">
          <h3>Roles for {activeCompany.name}</h3>
          <div className="role-tabs">
            {activeCompany.roles.map(role => (
              <div
                key={role.id}
                className={`role-tab ${activeCompany.activeRoleId === role.id ? 'active' : ''}`}
                onClick={() => {
                  const updatedCompanies = companies.map(c => {
                    if (c.id === activeCompanyId) {
                      return {
                        ...c,
                        activeRoleId: role.id
                      };
                    }
                    return c;
                  });
                  setCompanies(updatedCompanies);
                }}
              >
                {role.name}
              </div>
            ))}
          </div>
          
          <div className="add-role">
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="New role name"
            />
            <button onClick={addRole}>Add Role</button>
          </div>
        </div>
      )}

      {/* Filters */}
      {activeRole && (
        <div className="filters">
          <h4>Filters</h4>
          <select 
            value={activeRole.filters.field} 
            onChange={(e) => updateRoleFilters('field', e.target.value)}
          >
            <option value="">All Fields</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
          
          <select 
            value={activeRole.filters.class} 
            onChange={(e) => updateRoleFilters('class', e.target.value)}
          >
            <option value="">All Classes</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          
          <input
            type="number"
            value={activeRole.filters.minMarks}
            onChange={(e) => updateRoleFilters('minMarks', parseInt(e.target.value))}
            placeholder="Min Marks"
          />
          
          <select 
            value={activeRole.filters.status} 
            onChange={(e) => updateRoleFilters('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="selected">Selected</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="shortlisted">Shortlisted</option>
          </select>
        </div>
      )}

      {/* Student Lists */}
      <div className="student-lists">
        {/* Available Students */}
        <div className="available-students">
          <h4>Available Students</h4>
          {filteredStudents
            .filter(student => !activeRole?.students.includes(student.id))
            .map(student => (
              <div 
                key={student.id} 
                className="student-card"
                onClick={() => addStudentToRole(student.id)}
              >
                <h5>{student.name}</h5>
                <p>Field: {student.field}</p>
                <p>Class: {student.class}</p>
                <p>Marks: {student.marks}</p>
                <p>Status: {student.status}</p>
              </div>
            ))}
        </div>

        {/* Selected Students */}
        {activeRole && (
          <div className="selected-students">
            <h4>Selected Students for {activeRole.name}</h4>
            {activeRole.students.map(studentId => {
              const student = students.find(s => s.id === studentId);
              if (!student) return null;
              
              return (
                <div key={student.id} className="student-card selected">
                  <h5>{student.name}</h5>
                  <p>Field: {student.field}</p>
                  <p>Class: {student.class}</p>
                  <p>Marks: {student.marks}</p>
                  
                  <select
                    value={student.status}
                    onChange={(e) => updateStudentStatus(student.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                    <option value="shortlisted">Shortlisted</option>
                  </select>
                  
                  <button onClick={() => removeStudentFromRole(student.id)}>Remove</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListComponent;