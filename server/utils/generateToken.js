import jwt from "jsonwebtoken";

export const setCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // REQUIRED for SameSite=None
    sameSite: "None", // Allow cross-domain cookies
    domain: ".fixiiit.store", // Leading dot for subdomains
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
