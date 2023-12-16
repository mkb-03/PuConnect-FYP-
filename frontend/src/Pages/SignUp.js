import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    semester: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here, using formData
    console.log(formData);
  };

  return (
    <div className="sign-up-container text-center mt-5 pt-5">
      <form className="sign-up-form" onSubmit={handleSubmit}>

        <h4 className=' pb-3 brownColor' >SignUp</h4>

        <input placeholder='Name' className='pt-2' type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="" disabled hidden>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select name="semester" value={formData.semester} onChange={handleChange} required>
          <option value="" disabled hidden>Semester</option>
          {[...Array(8).keys()].map((index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
          <option value="Alumni">Alumni</option>
        </select>

        <input placeholder='Password' type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button className='brownButton mt-2 mb-2' type="submit">SignUp</button>

        <h6 className='pt-3'>Already signed up? Login Here </h6>

      </form>
    </div>  
  );
};

export default SignUpForm;
