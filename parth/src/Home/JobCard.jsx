// src/components/JobCards.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/JobSlice';
import JobCard from './JobCards'; 
export default function JobCards() {
  const dispatch = useDispatch();
  const { list: jobs, page, limit, totalPages, status } = useSelector(state => state.jobs);

  const observer = useRef();

  const lastJobRef = useCallback(node => {
    if (status === 'loading') return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        dispatch(fetchJobs({ page: page + 1, limit }));
      }
    });

    if (node) observer.current.observe(node);
  }, [dispatch, page, status, totalPages, limit]);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchJobs({ page: 1, limit }));
    }
  }, [dispatch, page, limit]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <div key={job._id} ref={index === jobs.length - 1 ? lastJobRef : null}>
            <JobCard job={job} />
          </div>
        ))}
      </div>

      {status === 'loading' && (
        <div className="text-center mt-4 text-gray-500">Loading more jobs...</div>
      )}

      {page >= totalPages && (
        <div className="text-center mt-4 text-gray-500">No more jobs to show.</div>
      )}
    </div>
  );
}
