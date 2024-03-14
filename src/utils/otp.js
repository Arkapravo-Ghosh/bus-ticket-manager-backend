const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let index = 0; index < 6; index++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  };
  return OTP;
};

export default generateOTP;