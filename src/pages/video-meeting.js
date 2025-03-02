import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/MeetingPage.css";
import { useNavigate } from "react-router-dom";

const VideoMeeting = () => {
  const [user, setUser] = useState(null);
  const [meetingCode, setMeetingCode] = useState("");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Video Meetings Dashboard";

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.get("http://localhost/debbie/backend/logout.php");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if (isMeetingActive && localVideoRef.current && streamRef.current) {
      localVideoRef.current.srcObject = streamRef.current;
    }
  }, [isMeetingActive]);

  const createMeeting = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      setIsMeetingActive(true);
      const generatedCode = Math.random().toString(36).substring(7);
      setMeetingCode(generatedCode);
      showToast(`Meeting created! Code: ${generatedCode}`);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      showToast(`Error accessing camera and microphone: ${error.message}`, "error");
    }
  };

  const joinMeeting = () => {
    if (!meetingCode) {
      showToast("Please enter a meeting code", "error");
      return;
    }
    showToast("Joining meeting...");
    setTimeout(createMeeting, 1000);
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      setIsAudioMuted((prev) => !prev);
      streamRef.current.getAudioTracks().forEach((track) => (track.enabled = !isAudioMuted));
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      setIsVideoOff((prev) => !prev);
      streamRef.current.getVideoTracks().forEach((track) => (track.enabled = !isVideoOff));
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsMeetingActive(false);
    setMeetingCode("");
    showToast("Call ended");
  };

  const showToast = (message, type = "info") => {
    const toastContainer = document.querySelector(".toast-container");
    const toast = document.createElement("div");
    toast.className = `toast show bg-${type === "error" ? "danger" : "info"} text-white`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `<div class="toast-body">${message}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="container">
      {user && (
        <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1000 }}>
          <button className="btn btn-danger btn-sm" onClick={logout}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>
      )}
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg mx-auto">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center">Welcome {user ? `${user.firstname} ${user.lastname}` : "User"}!</h1>
              <h4 className="text-center text-muted mb-4">Video calls and meetings for everyone</h4>
              <p className="text-center text-muted mb-4">Connect, collaborate, and celebrate from anywhere</p>
              <div className="d-grid gap-3">
                <button className="btn btn-primary btn-lg" onClick={createMeeting}>
                  <i className="fas fa-video me-2"></i> Create Meeting
                </button>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter a code or link"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                  />
                  <button className="btn btn-outline-primary" onClick={joinMeeting}>
                    <i className="fas fa-sign-in-alt me-2"></i> Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMeetingActive && (
        <div className="meeting-container active">
          <div className="video-container">
            <video ref={localVideoRef} id="localVideo" autoPlay muted playsInline></video>
          </div>
          <div className="meeting-code">{meetingCode}</div>
          <div className="participant-name">
            <i className="fas fa-user-circle"></i>
            <span>{user ? `${user.firstname} ${user.lastname}` : "Participant"}</span>
          </div>
          <div className="controls">
            <button className={`control-btn ${!isAudioMuted ? "active" : ""}`} onClick={toggleAudio} title="Mute">
              <i className={`fas ${isAudioMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </button>
            <button className={`control-btn ${!isVideoOff ? "active" : ""}`} onClick={toggleVideo} title="Stop Video">
              <i className={`fas ${isVideoOff ? "fa-video-slash" : "fa-video"}`}></i>
            </button>
            <button className="control-btn end-call" onClick={endCall} title="End Call">
              <i className="fas fa-phone-slash"></i>
            </button>
          </div>
        </div>
      )}

      <div className="orientation-warning">Please rotate your device to portrait mode for a better experience.</div>
      <div className="loading-spinner"></div>
      <div className="toast-container"></div>
    </div>
  );
};

export default VideoMeeting;
