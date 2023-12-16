import React, { useState } from "react";
import "./App.css";
import OTPInput from "./Components/OTPInput";

function App() {
  const [otp, setOtp] = useState("");
  const onChange = (value) => setOtp(value);

  return (
    <div className="app-container">
      <h1>Please insert your One-Time-Password</h1>
      <OTPInput value={otp} valueLength={6} onChange={onChange} />
    </div>
  );
}

export default App;
