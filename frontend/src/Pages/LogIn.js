
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Alert from '../Components/Alert';
import { login } from '../Redux Toolkit/authSlice';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showLoginFirstAlert, setShowLoginFirstAlert] = useState(false);

  useEffect(() => {
    // Show login first alert when redirected from a protected route
    if (!isAuthenticated && navigate) {
      setShowLoginFirstAlert(true);
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .matches(
          /^b(cs|it|se)f\d{2}(a|m)\d{3}@pucit\.edu\.pk$/,
          'Invalid email format. Example: bitf20a015@pucit.edu.pk'
        ),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          // Handle error response
          const errorData = await response.json();
          console.error('Error:', errorData.err);
          setAlertMessage('Login failed. Please check your credentials.');
          setShowErrorAlert(true);
        } else {
          // Login successful
          const userData = await response.json();
          console.log('Login successful:', userData);

          // Dispatch the login action with user data
          dispatch(login({ user: userData, token: userData.token }));
          
          setAlertMessage('Login successful.');
          setShowSuccessAlert(true);
          // Redirect to the home page after 1 second (you can use setTimeout here)
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        }
      } catch (error) {
        console.error('Error:', error.message);
        setAlertMessage('An error occurred. Please try again.');
        setShowErrorAlert(true);
      }
    },
  });

  return (
    <div>
      {/* Show login first alert */}
      {showLoginFirstAlert && (
        <Alert
          type="danger"
          message="Please login first."
          onClose={() => setShowLoginFirstAlert(false)}
        />
      )}

      {/* Show success alert */}
      {showSuccessAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowSuccessAlert(false)} />
      )}

      {/* Show error alert */}
      {showErrorAlert && (
        <Alert type="danger" message={alertMessage} onClose={() => setShowErrorAlert(false)} />
      )}

      <div className="sign-up-container text-center mt-5 pt-5">
        <form className="sign-up-form pt-3" onSubmit={formik.handleSubmit}>
          <h4 className="pb-3 brownColor">LogIn</h4>

          <input
          placeholder="Email"
          type="email"
          name="email"
          className={`pt-2 mt-2 ${formik.touched.email && formik.errors.email ? 'error-input' : ''}`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error mt-1">{formik.errors.email}</div>
        )}

        <input
          placeholder="Password"
          type="password"
          name="password"
          className={`pt-2 mt-3 ${formik.touched.password && formik.errors.password ? 'error-input' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error mt-1">{formik.errors.password}</div>
        )}

          <button className="brownButton mt-4 mb-2" type="submit">
            Login
          </button>

          <h6 className="pt-3">
            Not registered yet?
            <NavLink className='ms-1 customLink' to='/signup'>
              SignUp here
            </NavLink>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Login;
