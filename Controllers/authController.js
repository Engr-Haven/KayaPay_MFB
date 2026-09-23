// AUTH LOGIN >>>
exports.authLogin = async (req, res) => {
  try {
    const NIBSSresponse = await fetch(
      "https://nibssbyphoenix.onrender.com/api/auth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: process.env.NIBSS_API_KEY,
          apiSecret: process.env.NIBSS_API_SECRET,
        }),
      },
    );

    if (!NIBSSresponse.ok) {
      console.error("External service status:", NIBSSresponse.status);
      //   throw new Error("Network response was not ok");
      return res.status(502).json({
        message: "External NIBSS service failed",
      });
    }

    const data = await NIBSSresponse.json();

    const accessToken = data.accessToken;
    if (!accessToken) {
      return res
        .status(502)
        .json({ message: "NIBSS service did not return an access token" });
    }

    // Stores the token gotten from NIBBS in a cookie for future use >>>
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });

    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//AUTH LOGOUT >>>
exports.authLogout = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Match whatever you used when creating the cookie (lax or strict)
    path: "/", // Crucial to match the creation path
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
