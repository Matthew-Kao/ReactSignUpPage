import Head from 'next/head';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Please enter a valid email address in the format 'example@domain.com'.";
    if (!formData.password) tempErrors.password = 'Password is required';
    else if (formData.password.length < 8) tempErrors.password = 'Password must be at least 8 characters long';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); 
    if (validate()) {
      console.log(formData);
      setSuccessMessage('Account successfully created!');
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); 
    } else {
      setSuccessMessage('');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { redirect: false });
    if (result?.ok) {
      setSuccessMessage('Account successfully created!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); 
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - My SaaS</title>
      </Head>
      <div className="container">
        <div className="form-container">
          <h1>Startup Launch!!! 🚀</h1>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                pattern=".{8,}"
                title="Password must be at least 8 characters long"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <div className="social-login">
            <button className="google" onClick={handleGoogleSignIn}>Sign Up with Google</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(45deg, #f3ec78, #af4261);
        }
        .form-container {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        h1 {
          color: #ff6f61;
          margin-bottom: 1rem;
        }
        h2 {
          color: #333;
          margin-bottom: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }
        label {
          display: block;
          font-weight: bold;
          color: #555;
          margin-bottom: 0.5rem;
        }
        input {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
          font-size: 1rem;
          color: #333;
          background: #fff;
        }
        .error {
          color: red;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        .success-message {
          color: green;
          font-size: 1rem;
          margin-top: 1rem;
        }
        button {
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          background-color: #0070f3;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
          font-size: 1rem;
        }
        button:hover {
          background-color: #005bb5;
        }
        .social-login {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        .google {
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          background-color: #db4437;
          color: white;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          width: 100%;
        }
        .google:hover {
          background-color: #c33d2e;
        }
      `}</style>
    </>
  );
}
