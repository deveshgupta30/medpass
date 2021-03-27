import jwt from "jsonwebtoken";

const createAccessToken = (userId, userEmail, userRole) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: userId,
      email: userEmail,
      role: userRole,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "10m",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message);
        reject(new Error("InternalServerError"));
        return;
      }
      resolve(token);
    });
  });
};

const decodeToken = (accessToken, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secret, (err, payload) => {
      if (err) {
        console.error(err.message);
        reject(new Error("Unauthorized"));
        return;
      }
      resolve(payload);
    });
  });
};

export { createAccessToken, decodeToken };
