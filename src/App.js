// import React from 'react';
// import Debbie from './Debbie'; 

// const App = () => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '20px' }}>
//             <Debbie />
//             <Debbie />
            
//         </div>
//     );
// };

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './lpt.css';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import LandingPage from './pages/landingpage';
import VideoMeeting from './pages/video-meeting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/video-meeting" element={<VideoMeeting />} />
      </Routes>
    </Router>
  );
}

export default App;



