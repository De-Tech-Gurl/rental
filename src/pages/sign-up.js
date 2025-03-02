import React, { useState, useEffect } from 'react';
import '../css/custom.css';
import illustration from '../img/human-daily-activity-concept-vector-illustration_1317464-10386-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();  // Initialize navigate hook
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('../../backend/signup.php', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Full Response:", response.data); // Debug the full response

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({ firstname: '', lastname: '', email: '', password: '' });

        // Redirect to sign-in page after a short delay
        setTimeout(() => {
          navigate('/sign-in');
        }, 3000);  // 3-second delay
      } else {
        setErrors(response.data.errors || {});  // Set errors or default to an empty object
        setErrorMessage(response.data.message || 'Please fix the errors and try again.');
      }
    } catch (error) {
      console.error("Axios error:", error.response ? error.response.data : error.message);
      setErrorMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'white' }}>
      <div className="row vh-100">
        <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: '#f2f2f2' }}>
          <img src={illustration} alt="Illustration of daily human activity" className="img-fluid" />
        </div>

        <div className="right col-md-7 d-flex justify-content-center pt-3">
          <div>
            <h2 className="text-center mb-4 pt-sm-5">Create Your Account</h2>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage} Redirecting to sign-in...</div>}

            <form id="signup-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="firstname"
                  type="text"
                  className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
              </div>

              <div className="mb-3">
                <input
                  name="lastname"
                  type="text"
                  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
              </div>

              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-danger w-100">Sign Up</button>
            </form>

            <p className="text-center mt-3 small">
              <input className="form-check-input" type="checkbox" required /> By signing up, I agree to the
              <a href="#" className="text-decoration-none"> Privacy Statement</a> and
              <a href="#" className="text-decoration-none"> Terms of Service</a>.
            </p>

            <p className="text-center mt-3">Or sign up with</p>
            <div className="d-flex justify-content-center mt-3" style={{ gap: '10px' }}>
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon={faApple} />
              </button>
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon={faGoogle} />
              </button>
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon={faFacebookF} />
              </button>
            </div>

            <p className="text-center mt-4 small">
              Already registered? <Link to="/sign-in" className="text-decoration-none">Sign in</Link>
            </p>

            <p className="text-center mt-4 small">
              LPT is protected by reCAPTCHA and the Google
              <a href="#" className="text-decoration-none"> Privacy Policy</a> and
              <a href="#" className="text-decoration-none"> Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
