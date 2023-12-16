import React, { useState, useEffect } from "react";
import "./OTPGenerator.css";

const OTPGenerator = ({ setOtp, setStep, setUsername, username }) => {
  const changeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const numbersRange = "0123456789";
    let otpValue = "";
    for (let i = 0; i < 6; i++) {
      otpValue += numbersRange[Math.floor(Math.random() * 10)];
    }
    setOtp(otpValue);
    setStep("showOtpStep");
  };

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <input
        value={username}
        type="name"
        placeholder="Username..."
        required
        onChange={changeUsernameHandler}
      ></input>
      <button type="submit">Generate OTP</button>
    </form>
  );
};

export default OTPGenerator;
