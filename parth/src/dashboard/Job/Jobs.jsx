import React, { useEffect, useState } from 'react';
import { FiBriefcase, FiUserCheck, FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/JobSlice'

const Jobs = () => {
  const dispatch = useDispatch();
  const { list: jobHistory, status } = useSelector((state) => state.jobs);

  const [showHistory, setShowHistory] = useState(false);
  const [jobStats, setJobStats] = useState({ applied: 0, interviews: 0 });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(jobHistory)) {
      setJobStats({
        applied: jobHistory.length,
        interviews: jobHistory.filter((j) => j.interviewStatus === 'Completed').length,
      });
    }
  }, [jobHistory]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans">
      <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">
        <strong style={{ color: 'blue' }}>Job</strong> Updates
      </h1>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
          <div className="flex items-center gap-4">
            <FiBriefcase className="text-blue-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Jobs Applied</h2>
              <p className="text-3xl font-bold text-blue-700">{jobStats.applied}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
          <div className="flex items-center gap-4">
            <FiUserCheck className="text-green-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Interviews Given</h2>
              <p className="text-3xl font-bold text-green-700">{jobStats.interviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
        >
          {showHistory ? <FiChevronUp /> : <FiChevronDown />}
          {showHistory ? 'Hide Job History' : 'View Job History'}
        </button>
      </div>

      {/* Job History */}
      {showHistory && (
        <div className="space-y-4 transition-all duration-300">
          {status === 'loading' ? (
            <p className="text-center text-gray-500">Loading job history...</p>
          ) : status === 'failed' ? (
            <p className="text-center text-red-600">Error</p>
          ) : jobHistory.length === 0 ? (
            <p className="text-center text-gray-500">No job applications found.</p>
          ) : (
            jobHistory.map((job) => (
              <div
                key={job.id || job._id}
                className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-500">
                      <FiClock className="inline mr-1" />
                      Applied on: {job.dateApplied}
                    </p>
                    <p className="mt-1">
                      <span className="font-medium">Interview:</span>{' '}
                      <span
                        className={
                          job.interviewStatus === 'Completed'
                            ? 'text-green-600 font-semibold'
                            : 'text-yellow-600 font-semibold'
                        }
                      >
                        {job.interviewStatus}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Result:</span>{' '}
                      <span
                        className={
                          job.result === 'Selected'
                            ? 'text-green-700 font-bold'
                            : job.result === 'Rejected'
                            ? 'text-red-600 font-bold'
                            : 'text-gray-600 font-medium'
                        }
                      >
                        {job.result}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
