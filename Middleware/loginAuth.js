// This middleware reads the cookie automatically. It does not call the provider's (NIBSS) token endpoint repeatedly. Also, Because you do not have the provider's signing secret i.e JWT_SECRET, this middleware does not call jwt.verify(). It just checks if the cookie exists. >>>

const loginAuth = (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  // Allows Postman or other clients to use Bearer tokens.
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Allows browsers to authenticate using the HttpOnly cookie.
  if (!token && req.headers.cookie) {
    const accessTokenCookie = req.headers.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("accessToken="));

    if (accessTokenCookie) {
      token = decodeURIComponent(accessTokenCookie.split("=")[1]);
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Store the provider token(NIBSS token) for the controller to use.
  req.accessToken = token;

  next();
};

module.exports = loginAuth;
