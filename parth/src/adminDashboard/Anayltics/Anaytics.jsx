import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Card, CardContent, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
);

const AnalyticsDashboard = () => {
  // State for filters
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for all data
  const [studentData, setStudentData] = useState({
    programs: [],
    skills: [],
    companies: [],
    jobData: [],
    studentSkills: [],
    placementStats: []
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
      
        const [programsRes, skillsRes, companiesRes, jobsRes, placementsRes] = await Promise.all([
          axios.get('/api/programs'),
          axios.get('/api/skills'),
          axios.get('/api/companies'),
          axios.get('/api/jobs'),
          axios.get('/api/placements')
        ]);

        setStudentData({
          programs: programsRes.data,
          skills: skillsRes.data,
          companies: companiesRes.data,
          jobData: jobsRes.data,
          placementStats: placementsRes.data,
          // Generate student skills data based on programs and skills
          studentSkills: programsRes.data.map(program => ({
            program,
            skills: skillsRes.data.reduce((acc, skill) => {
              acc[skill] = Math.floor(Math.random() * 100); // Replace with actual data from API
              return acc;
            }, {})
          }))
        });
      } catch (err) {
        setError(err.response?.data?.message);
        console.error('Error fetching data:', err);
        
        // Fallback to sample data if API fails
        setStudentData({
          programs: ['BCA', 'MBA', 'MCA', 'BBA', 'BCA AI', 'BCA CTIS'],
          skills: ['MERN', 'Docker', 'Python', 'Java', 'Data Science', 'Cloud Computing'],
          companies: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft', 'Google'],
          jobData: [],
          studentSkills: [],
          placementStats: []
        });
        
        // Initialize sample data
        const jobData = ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft', 'Google'].map(company => ({
          company,
          jobsPosted: Math.floor(Math.random() * 50) + 10,
          averageSalary: Math.floor(Math.random() * 10) + 5,
          hiresByProgram: ['BCA', 'MBA', 'MCA', 'BBA', 'BCA AI', 'BCA CTIS'].reduce((acc, program) => {
            acc[program] = Math.floor(Math.random() * 20);
            return acc;
          }, {})
        }));

        const placementStats = ['BCA', 'MBA', 'MCA', 'BBA', 'BCA AI', 'BCA CTIS'].map(program => ({
          program,
          totalStudents: Math.floor(Math.random() * 200) + 50,
          placed: Math.floor(Math.random() * 180) + 30,
          avgPackage: (Math.random() * 5 + 3).toFixed(2),
          skillDistribution: ['MERN', 'Docker', 'Python', 'Java', 'Data Science', 'Cloud Computing'].reduce((acc, skill) => {
            acc[skill] = Math.floor(Math.random() * 100);
            return acc;
          }, {})
        }));

        setStudentData(prev => ({
          ...prev,
          jobData,
          placementStats,
          studentSkills: ['BCA', 'MBA', 'MCA', 'BBA', 'BCA AI', 'BCA CTIS'].map(program => ({
            program,
            skills: ['MERN', 'Docker', 'Python', 'Java', 'Data Science', 'Cloud Computing'].reduce((acc, skill) => {
              acc[skill] = Math.floor(Math.random() * 100);
              return acc;
            }, {})
          }))
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selections
  const filteredJobData = selectedProgram === 'All' 
    ? studentData.jobData 
    : studentData.jobData.map(company => ({
        ...company,
        jobsPosted: company.hiresByProgram[selectedProgram] || 0
      }));

  const filteredStudentSkills = selectedProgram === 'All'
    ? studentData.studentSkills
    : studentData.studentSkills.filter(skill => skill.program === selectedProgram);

  const filteredSkillData = selectedSkill === 'All'
    ? studentData.studentSkills
    : studentData.studentSkills.map(program => ({
        program: program.program,
        [selectedSkill]: program.skills[selectedSkill]
      }));

  // Prepare chart data
  const programComparisonData = {
    labels: studentData.programs,
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: studentData.placementStats.map(stat => 
          Math.round((stat.placed / stat.totalStudents) * 100)),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Average Package (LPA)',
        data: studentData.placementStats.map(stat => stat.avgPackage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const skillDistributionData = {
    labels: studentData.skills,
    datasets: filteredStudentSkills.map(program => ({
      label: program.program,
      data: studentData.skills.map(skill => program.skills[skill]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderWidth: 1
    }))
  };

  const companyHiringData = {
    labels: studentData.companies,
    datasets: studentData.programs.map(program => ({
      label: program,
      data: studentData.companies.map(company => 
        studentData.jobData.find(j => j.company === company)?.hiresByProgram[program] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderWidth: 1
    }))
  };

  const topSkillsData = {
    labels: studentData.skills,
    datasets: [
      {
        label: 'Skill Popularity',
        data: studentData.skills.map(skill => 
          studentData.studentSkills.reduce((sum, program) => sum + program.skills[skill], 0)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  const programSkillRadarData = {
    labels: studentData.skills,
    datasets: studentData.studentSkills.map(program => ({
      label: program.program,
      data: studentData.skills.map(skill => program.skills[skill]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1
    }))
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading dashboard data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Typography>Showing sample data instead</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f7fa' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '20px' }}>
        Student & Job Analytics Dashboard
      </Typography>
      
      {/* Filters */}
      <Card style={{ marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Academic Program</InputLabel>
                <Select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  label="Academic Program"
                >
                  <MenuItem value="All">All Programs</MenuItem>
                  {studentData.programs.map(program => (
                    <MenuItem key={program} value={program}>{program}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Skill</InputLabel>
                <Select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  label="Skill"
                >
                  <MenuItem value="All">All Skills</MenuItem>
                  {studentData.skills.map(skill => (
                    <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  label="Time Range"
                >
                  <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
                  <MenuItem value="Last Year">Last Year</MenuItem>
                  <MenuItem value="Last 2 Years">Last 2 Years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Students</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#3498db' }}>
                {studentData.placementStats.reduce((sum, stat) => sum + stat.totalStudents, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Placed Students</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#2ecc71' }}>
                {studentData.placementStats.reduce((sum, stat) => sum + stat.placed, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Jobs Posted</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                {studentData.jobData.reduce((sum, company) => sum + company.jobsPosted, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Avg. Package (LPA)</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#9b59b6' }}>
                {(
                  studentData.placementStats.reduce((sum, stat) => sum + parseFloat(stat.avgPackage), 0) / 
                  studentData.placementStats.length
                ).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Charts */}
      <Grid container spacing={3}>
        {/* Program Comparison */}
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Program Comparison</Typography>
              <Bar 
                data={programComparisonData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                  },
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Skill Distribution */}
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Skill Distribution</Typography>
              <Line 
                data={skillDistributionData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                  },
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Company Hiring */}
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Company Hiring by Program</Typography>
              <Bar 
                data={companyHiringData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                  },
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Skills */}
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Skills Across All Programs</Typography>
              <Doughnut 
                data={topSkillsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'right' }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Program Skill Radar */}
        <Grid item xs={12}>
          <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Program Skill Radar Chart</Typography>
              <Radar 
                data={programSkillRadarData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' }
                  },
                  scales: {
                    r: { beginAtZero: true }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Tables */}
      <Grid container spacing={3} style={{ marginTop: '10px' }}>
        <Grid item xs={12} md={6}>
          <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Placement Statistics by Program</Typography>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Program</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Total Students</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Placed</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Placement %</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Avg. Package (LPA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.placementStats.map((stat, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #ddd', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <td style={{ padding: '12px' }}>{stat.program}</td>
                        <td style={{ padding: '12px' }}>{stat.totalStudents}</td>
                        <td style={{ padding: '12px' }}>{stat.placed}</td>
                        <td style={{ padding: '12px' }}>{Math.round((stat.placed / stat.totalStudents) * 100)}%</td>
                        <td style={{ padding: '12px' }}>{stat.avgPackage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Company Job Postings</Typography>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Company</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Jobs Posted</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Avg. Salary (LPA)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Top Hiring Program</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.jobData.map((company, index) => {
                      const topProgram = Object.entries(company.hiresByProgram)
                        .sort((a, b) => b[1] - a[1])[0][0];
                      return (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={{ padding: '12px' }}>{company.company}</td>
                          <td style={{ padding: '12px' }}>{company.jobsPosted}</td>
                          <td style={{ padding: '12px' }}>{company.averageSalary}</td>
                          <td style={{ padding: '12px' }}>{topProgram}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AnalyticsDashboard;