import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      semester: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .required('Email is required')
        .matches(
          /^b(cs|it|se)f\d{2}(a|m)\d{3}@pucit\.edu\.pk$/,
          'Invalid email format. Example: bitf20a015@pucit.edu.pk'
        ),

      gender: Yup.string().required('Gender is required'),
      semester: Yup.string().required('Semester is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {

      console.log('Form values:', values);
      console.log('Form errors:', formik.errors);
      // Add your signup logic here, using values
      console.log(values);

    },
  });

  return (
    <div className="sign-up-container text-center mt-5 pt-5">
      <form className="sign-up-form" onSubmit={formik.handleSubmit}>
        <h4 className="pb-3 brownColor">SignUp</h4>

        <input
          placeholder="Name"
          className={`pt-2 ${formik.touched.name && formik.errors.name ? 'error-input' : ''}`}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

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

        <select
          name="gender"
          className={`pt-2 ${formik.touched.gender && formik.errors.gender ? 'error-input' : ''}`}
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled hidden>
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender && (
          <div className="error">{formik.errors.gender}</div>
        )}

        <select
          name="semester"
          className={`pt-2 ${formik.touched.semester && formik.errors.semester ? 'error-input' : ''}`}
          value={formik.values.semester}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled hidden>
            Semester
          </option>
          {[...Array(8).keys()].map((index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
          <option value="Alumni">Alumni</option>
        </select>
        {formik.touched.semester && formik.errors.semester && (
          <div className="error">{formik.errors.semester}</div>
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
          SignUp
        </button>

        <h6 className="pt-3">Already signed up? Login Here </h6>
      </form>
    </div>
  );
};

export default SignUpForm;
