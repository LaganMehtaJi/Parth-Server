import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCardd";


const StudentList = ({refresh}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/student/data");
        setStudents(response.data.message); // Assuming message is array of students
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchStudents();
  }, [refresh]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {students.map((student) => (
          <StudentCard key={student._id} studentData={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
