import React, { useState } from 'react';
// import '../css/custom.css';
import illustration from '../img/human-daily-activity-concept-vector-illustration_1317464-10386-removebg-preview.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost/debbie/backend/signin.php', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Server response:", response.data);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));  // Store user info
        navigate('/video-meeting');
      }
       else {
        if (response.data.errors) {
          setErrors(response.data.errors); // errors should be an object with field-specific messages
        } else if (response.data.message) {
          setErrorMessage(response.data.message);
        } else {
          setErrorMessage('An unknown error occurred.');
        }
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      const message = error.response?.data?.message || 'A network error occurred. Please try again later.';
      setErrorMessage(message);
    }
    
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'white' }}>
      <div className="row vh-100">
        <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center"
             style={{ backgroundColor: '#f2f2f2' }}>
          <img src={illustration} alt="Illustration of daily human activity" className="img-fluid" />
        </div>
        <div className="right col-md-7 d-flex justify-content-center pt-3">
          <div>
            <h2 className="text-center mb-4 pt-sm-5">Sign In</h2>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form id="signin-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="d-flex justify-content-between mb-3">
                <a href="forgot-password.php" className="text-decoration-none">Forgot password?</a>
                <a href="help.php" className="text-decoration-none">Help</a>
              </div>
              <button type="submit" className="btn btn-danger w-100">Sign In</button>
            </form>

            <p className="text-center mt-3 small">
              <input className="form-check-input" type="checkbox" required />
              By signing in, I agree to the <a href="#" className="text-decoration-none">LPT Privacy Statement</a>
              and <a href="#" className="text-decoration-none">Terms of Service</a>
            </p>

            <p className="text-center mt-3">Or sign in with</p>
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
              LPT is protected by reCAPTCHA and the Google
              <a href="#" className="text-decoration-none"> Privacy Policy</a> and
              <a href="#" className="text-decoration-none"> Terms of Service</a> apply.
            </p>

            <p className="text-center mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="text-decoration-none" onClick={(e) => {
                e.preventDefault();
                navigate('/sign-up');
              }}>
                Sign up here
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
