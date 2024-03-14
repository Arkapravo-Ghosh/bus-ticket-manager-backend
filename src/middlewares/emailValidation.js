const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid request" });
  };
  try {
    if (typeof email === "string" && pattern.test(email)) {
      next();
    } else {
      return res.status(400).json({ message: "Invalid email" });
    };
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  };
};

export default validateEmail;