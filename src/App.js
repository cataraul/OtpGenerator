import React, { useState, useEffect } from "react";
import "./App.css";
import OTPInput from "./Components/OTPInput";
import OTPGenerator from "./Components/OTPGenerator";

function App() {
  const [otp, setOtp] = useState("");
  const [userOTPValue, setUserOtpValue] = useState("");
  const [step, setStep] = useState("");
  const [availableTime, setAvailableTime] = useState(true);
  const [username, setUsername] = useState("");
  const [tries, setTries] = useState(0);
  const onChange = (value) => setUserOtpValue(value);

  useEffect(() => {
    setStep("initialStep");
  }, []);

  const goToAddOtp = () => {
    setStep("addOtpStep");
    setTimeout(() => {
      setAvailableTime(false);
    }, 30000);
  };

  return (
    <div className="app-container">
      {step === "initialStep" && (
        <div className="username-container">
          <h1>Please Insert your username and generate otp</h1>
          <OTPGenerator
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
            setUsername={setUsername}
            username={username}
          />
        </div>
      )}
      {step === "showOtpStep" && (
        <>
          <h1>{`Your OTP is: ${otp}`}</h1>
          <p>It will be available 30 seconds after you go to verify it.</p>
          <button onClick={goToAddOtp}>Add OTP</button>
        </>
      )}
      {step === "addOtpStep" && (
        <>
          <h1>Please insert your One-Time-Password</h1>
          <OTPInput
            otp={otp}
            valueLength={6}
            onChange={onChange}
            setStep={setStep}
            setOtp={setOtp}
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
            userOTPValue={userOTPValue}
            setUserOtpValue={setUserOtpValue}
            tries={tries}
            setTries={setTries}
          />
        </>
      )}
      {step === "verifiedOTP" && (
        <>
          <h1 className="success-message">{`Congrats, ${username}! You are in!`}</h1>
          <button
            onClick={() => {
              setOtp("");
              setStep("initialStep");
              setUsername("");
              setUserOtpValue("");
              setAvailableTime(true);
            }}
          >
            Try Again!
          </button>
        </>
      )}
      {step === "failedOTP" && (
        <>
          <h1 className="failed-message">{`Oh, we're sorry , ${username}! OTPs time has run out!`}</h1>
          <h2>Please try again!</h2>
          <button
            onClick={() => {
              setOtp("");
              setStep("initialStep");
              setUserOtpValue("");
              setAvailableTime(true);
            }}
          >
            Try Again!
          </button>
        </>
      )}
    </div>
  );
}

export default App;
