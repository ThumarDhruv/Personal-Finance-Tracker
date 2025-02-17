import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, XCircle, Facebook, Github, LogIn as Google } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { LoginFormValues, RegisterFormValues, User } from '../types/auth';
import { getUsers, setUserSession, saveUser } from '../utils/auth';
import { useTheme } from '../hooks/useTheme';
import { FormikTouched, FormikErrors } from 'formik';
import { motion } from 'framer-motion';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const validationSchema = Yup.object({
    ...(type === 'register' && { 
      name: Yup.string().required('Full name is required') 
    }),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(
        type === 'login' ? 1 : 6, 
        type === 'login' ? 'Password is required' : 'Password must be at least 6 characters'
      )
      .required('Password is required'),
  });

  const formik = useFormik<LoginFormValues | (RegisterFormValues & { name: string })>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const users = getUsers();
      
      if (type === 'register') {
        const newUser: User = {
          id: uuidv4(),
          name: (values as RegisterFormValues).name,
          email: values.email,
          password: values.password
        };
        saveUser(newUser);
        setSubmitting(false);
        navigate('/login');
      } else {
        const user = users.find(u => u.email === values.email);
        
        if (user && user.password === values.password) {
          setUserSession(user);
          setSubmitting(false);
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        } else {
          setSubmitting(false);
          formik.setStatus('Invalid email or password');
        }
      }
    },
  });

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto p-4">
        <div className={`flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } hover:shadow-2xl transition-shadow duration-300`}>
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-green-500 p-12 hidden md:flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="mb-8 flex items-center justify-center p-2"
            >
              <img 
                src="https://icons.iconarchive.com/icons/tribalmarkings/aquave-cash/128/dollar-folder-icon.png" 
                alt="Auth Illustration"
                className="w-35 h-35 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4 text-center"
            >
              {type === 'login' ? 'Welcome Back!' : 'Join Our Community'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-indigo-100 text-center"
            >
              {type === 'login' 
                ? 'Sign in to access your account'
                : 'Create your account to get started'}
            </motion.p>
          </div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-1/2 p-12"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </motion.h2>

            {type === 'login' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6"
              >
                <p className={`text-center ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  You need to register first! 
                  <Link
                    to="/register"
                    className="ml-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </motion.div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {type === 'register' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <UserIcon className={`h-5 w-5 absolute top-3.5 left-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={(formik.values as RegisterFormValues).name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`pl-10 w-full rounded-lg py-3 px-4 border-2 focus:ring-2 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                      }`}
                    />
                    {(type === 'register' && (formik.touched as FormikTouched<RegisterFormValues>).name && (formik.errors as FormikErrors<RegisterFormValues>).name) && (
                      <div className="text-red-500 text-sm mt-1 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        {(formik.errors as FormikErrors<RegisterFormValues>).name}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: type === 'login' ? 0.6 : 0.8 }}
              >
                <div className="relative">
                  <Mail className={`h-5 w-5 absolute top-3.5 left-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...formik.getFieldProps('email')}
                    className={`pl-10 w-full rounded-lg py-3 px-4 border-2 focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" />
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: type === 'login' ? 0.8 : 1.0 }}
              >
                <div className="relative">
                  <Lock className={`h-5 w-5 absolute top-3.5 left-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                    className={`pl-10 w-full rounded-lg py-3 px-4 border-2 focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                    }`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" />
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Facebook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </button>

                <button
                  type="button"
                  onClick={() => window.open('https://github.com/login', '_blank')}
                  className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Github className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Or continue with
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-semibold
                           hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg"
                >
                  {type === 'login' ? 'Sign In (Registered Users Only)' : 'Create Account'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;