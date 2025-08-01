import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, type, expiry } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    if (!email || !type || !expiry) {
      navigate('/login/student'); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("OTP expired. Please request again.");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, type, expiry, navigate]);

  const formik = useFormik({
    initialValues: {
      otp: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, 'OTP must be 6 digits')
        .required('OTP is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Replace with your API call
        const res = await axios.post(`http://localhost:3000/api/auth/reset-password`, {
          email,
          type,
          otp: values.otp,
          newPassword: values.newPassword,
        });

        toast.success(res.data.message || "Password reset successful");
        setTimeout(() => navigate(`/login/${type}`), 2000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Invalid OTP or error");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-6">Sent to: <span className="font-medium">{email}</span></p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              maxLength={6}
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="123456"
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-red-500 text-sm">{formik.errors.otp}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter new password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || timeLeft <= 0}
            className={`w-full py-2 px-4 text-white rounded-md ${formik.isSubmitting || timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Verify & Reset Password'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          {timeLeft > 0 ? `OTP expires in ${timeLeft}s` : 'OTP expired. Please retry.'}
        </div>
      </div>
    </div>
  );
};

export default Otp;
