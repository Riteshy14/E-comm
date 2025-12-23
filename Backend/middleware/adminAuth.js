
const authAdmin = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      msg: "Admin access denied",
    });
  }
  next();
};

export default authAdmin;
