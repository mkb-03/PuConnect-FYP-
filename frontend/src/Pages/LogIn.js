import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
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
        } else {
          // Login successful
          const userData = await response.json();
          console.log('User logged in successfully:', userData);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  });

  return (
    <div className="sign-up-container text-center mt-5 pt-5">
      <form className="sign-up-form pt-3" onSubmit={formik.handleSubmit}>
        <h4 className="pb-3 brownColor">LogIn</h4>

        <input
          placeholder="Email"
          type="email"
          name="email"
          className={`pt-2 ${formik.touched.email && formik.errors.email ? 'error-input' : ''}`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <input
          placeholder="Password"
          type="password"
          name="password"
          className={`pt-2 ${formik.touched.password && formik.errors.password ? 'error-input' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <button className="brownButton mt-2 mb-2" type="submit">
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
  );
};

export default Login;
