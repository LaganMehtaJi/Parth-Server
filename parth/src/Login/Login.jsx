import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaIdCard, FaUniversity } from "react-icons/fa";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  
  // Background images for different user types
  const backgroundImages = {
    student: 'https://img.freepik.com/free-vector/hand-drawn-student-background_23-2149464866.jpg',
    recruiter: 'https://img.freepik.com/free-vector/hand-drawn-student-background_23-2149464866.jpg',
    admin: 'https://img.freepik.com/free-vector/hand-drawn-student-background_23-2149464866.jpg'
  };
  const titles = {
    student: {
      main: "Let's Start Learning",
      sub: "Please login to access your courses and materials"
    },
    recruiter: {
      main: "Find Top Talent",
      sub: "Please login to access candidate profiles"
    },
    admin: {
      main: "Admin Dashboard",
      sub: "Please login to manage the platform"
    }
  };

  // Main form validation
  const validationSchema = yup.object({
    registrationNo: yup
      .string()
      .min(5, 'Minimum 5 characters required')
      .when([], {
        is: () => type === 'student',
        then: (schema) => schema.required('Please enter roll no'),
        otherwise: (schema) => schema.notRequired(),
      }),
    name: yup
      .string()
      .min(5, 'Minimum 5 characters required')
      .when([], {
        is: () => type === 'recruiter',
        then: (schema) => schema.required('Please enter company name'),
        otherwise: (schema) => schema.notRequired(),
      }),
    adminCode: yup
      .string()
      .when([], {
        is: () => type === 'admin',
        then: (schema) => schema.required('Please enter admin code'),
        otherwise: (schema) => schema.notRequired(),
      }),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter email'),
    pass: yup.string().required('Please enter password'),
  });

  // Forgot password form validation
  const forgotPasswordSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter your email'),
  });

  // OTP and new password validation
  const otpValidationSchema = yup.object({
    otp: yup
      .string()
      .length(6, 'OTP must be 6 characters')
      .required('Please enter OTP'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter new password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  useEffect(() => {
    const formdata = JSON.parse(localStorage.getItem(type)); // Fixed: removed curly braces around type
    if (formdata) {
      formik.setValues({
        ...formik.values,
        ...formdata
      });
    }
  }, [type]);

  const formik = useFormik({
    initialValues: {
      registrationNo: '',
      name: '',
      adminCode: '',
      email: '',
      pass: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      localStorage.setItem(type, JSON.stringify(values)); // Fixed: removed curly braces around type
      axios.post(`http://localhost:3000/api/auth/${type}/${type}`, values)
        .then((res) => {
          console.log(res.data.message);
          navigate(`/home`);
          toast.success(` ${res.data.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).catch((error) => {
          console.log(error.response?.data);
          toast.error(error.response?.data?.message || 'Login failed', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
      console.log('Form values:', values);
      resetForm();
      setSubmitting(false);
    },
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('Forgot password values:', values);
      // Simulate sending email
      setTimeout(() => {
        toast.success(`Password reset link sent to ${values.email}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsForgotPasswordOpen(false);
        resetForm();
        setSubmitting(false);
      }, 1500);
    },
  });

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${backgroundImages[type] || backgroundImages.student})` }}
    >
      <ToastContainer />
      
      {/* Main Login Form */}
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md mx-4 backdrop-blur-sm bg-opacity-90">
        {/* Dynamic header based on user type */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {titles[type]?.main || titles.student.main}
          </h1>
          <p className="text-gray-600 mt-2">
            {titles[type]?.sub || titles.student.sub}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Student Field */}
          {type === 'student' && (
            <div className="space-y-2">
              <div className="relative">
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="registrationNo"
                  placeholder="Your Roll Number"
                  value={formik.values.registrationNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              {formik.touched.registrationNo && formik.errors.registrationNo && (
                <div className="text-red-500 text-sm ml-1">{formik.errors.registrationNo}</div>
              )}
            </div>
          )}

          {/* Recruiter Field */}
          {type === 'recruiter' && (
            <div className="space-y-2">
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Company Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm ml-1">{formik.errors.name}</div>
              )}
            </div>
          )}

          {/* Admin Field */}
          {type === 'admin' && (
            <div className="space-y-2">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="adminCode"
                  placeholder="Admin Access Code"
                  value={formik.values.adminCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              {formik.touched.adminCode && formik.errors.adminCode && (
                <div className="text-red-500 text-sm ml-1">{formik.errors.adminCode}</div>
              )}
            </div>
          )}

          {/* Email Field (Common for all) */}
          <div className="space-y-2">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm ml-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field (Common for all) */}
          <div className="space-y-2">
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                name="pass"
                placeholder="Your Password"
                value={formik.values.pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>
            {formik.touched.pass && formik.errors.pass && (
              <div className="text-red-500 text-sm ml-1">{formik.errors.pass}</div>
            )}
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button 
                type="button"
                className="font-medium text-orange-500 hover:text-orange-600"
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium shadow-md hover:shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full border border-gray-300 flex items-center justify-center py-3 rounded-lg gap-3 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-orange-500 hover:text-orange-600">
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
              <p className="text-gray-600 mt-1">
                Enter your details to receive a password reset OTP
              </p>
            </div>

            <form onSubmit={forgotPasswordFormik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {/* <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={forgotPasswordFormik.values.name}
                    onChange={forgotPasswordFormik.handleChange}
                    onBlur={forgotPasswordFormik.handleBlur}
                    className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div> */}
                {/* {forgotPasswordFormik.touched.name && forgotPasswordFormik.errors.name && (
                  <div className="text-red-500 text-sm ml-1">{forgotPasswordFormik.errors.name}</div>
                )} */}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={forgotPasswordFormik.values.email}
                    onChange={forgotPasswordFormik.handleChange}
                    onBlur={forgotPasswordFormik.handleBlur}
                    className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                {forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email && (
                  <div className="text-red-500 text-sm ml-1">{forgotPasswordFormik.errors.email}</div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
              <p className="text-gray-600 mt-1">
                Enter the OTP sent to {emailForReset} and your new password
              </p>
            </div>

            <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otpFormik.values.otp}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                {otpFormik.touched.otp && otpFormik.errors.otp && (
                  <div className="text-red-500 text-sm ml-1">{otpFormik.errors.otp}</div>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={otpFormik.values.newPassword}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                {otpFormik.touched.newPassword && otpFormik.errors.newPassword && (
                  <div className="text-red-500 text-sm ml-1">{otpFormik.errors.newPassword}</div>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={otpFormik.values.confirmPassword}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    className="pl-10 w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                {otpFormik.touched.confirmPassword && otpFormik.errors.confirmPassword && (
                  <div className="text-red-500 text-sm ml-1">{otpFormik.errors.confirmPassword}</div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;