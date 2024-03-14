const checkJSON = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid JSON" });
  };
  next();
};

export default checkJSON;