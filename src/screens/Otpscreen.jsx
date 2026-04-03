import React, { useState } from 'react';

const OtpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);

  const sendOtpHandler = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    alert(`OTP sent to ${phoneNumber}: ${otp}`); // Simulate OTP send
    setStep(2);
  };

  const verifyOtpHandler = () => {
    if (enteredOtp === generatedOtp) {
      setVerified(true);
    } else {
      alert('Incorrect OTP!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Phone Number Verification</h2>

      {step === 1 && (
        <>
          <input
            type='text'
            placeholder='Enter phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={sendOtpHandler} style={{ padding: '10px', width: '100%' }}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && !verified && (
        <>
          <input
            type='text'
            placeholder='Enter OTP'
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={verifyOtpHandler} style={{ padding: '10px', width: '100%' }}>
            Verify OTP
          </button>
        </>
      )}

      {verified && <p style={{ color: 'green' }}>✅ Phone number verified successfully!</p>}
    </div>
  );
};

export default OtpScreen;
