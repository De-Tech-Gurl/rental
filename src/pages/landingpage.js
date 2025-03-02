
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const translations = {
    en: {
      header_title: 'Lincoln Pentalon Technologies',
      company_description:
        "At Lincoln Pentalon Technologies, we provide seamless communication solutions for today's digital world. Our video conferencing platform rivals industry giants like Google Meet and Zoom, offering top-notch quality, security, and user experience.",
      why_choose_us: 'Why Choose Us?',
    },
  };

  const features = [
    { title: 'Exceptional Quality', description: 'Crystal-clear audio and video for immersive virtual meetings.' },
    { title: 'Scalable Solutions', description: 'Designed for one-on-one meetings or large webinars alike.' },
    { title: 'Robust Security', description: 'Advanced encryption and security protocols to protect your data.' },
    { title: 'User-Friendly Interface', description: 'Intuitive design for seamless meeting experiences.' },
    { title: 'Versatile Integration', description: 'Connect with your favorite tools to enhance productivity.' },
    { title: 'Scalable Solutions', description: 'Designed for one-on-one meetings or large webinars alike.' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handleSignInClick = () => navigate('/sign-in');

  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm" style={{ padding: '1.5rem 0', borderBottom:'5px solid  white'  }}>
        <div className="container">
          <a className="navbar-brand text-brown" href="/signup">{translations[selectedLanguage]?.header_title}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-danger me-3" onClick={handleSignInClick}>Sign In</button>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Support</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero text-center text-dark d-flex align-items-center justify-content-center bg-white" style={{ backgroundColor: '', minHeight: '50vh',  }}>
        <div className="container">
          <h1 className="display-4 fw-bold">{translations[selectedLanguage]?.header_title}</h1>
          <p className="lead">{translations[selectedLanguage]?.company_description}</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">{translations[selectedLanguage]?.why_choose_us}</h2>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-brown">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4" style={{ position: 'relative', bottom: '0', width: '100%',  borderTop:'5px solid  white'  }}>
        <p className="mb-0">&copy; 2025 Lincoln Pentalon Technologies. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;