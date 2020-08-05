module.exports = (req, res, next) => {
	
  if (!req.user) {
    return res.render("error", {
      message: 'Login Firstly'
    });
	}
  
  next();
};
