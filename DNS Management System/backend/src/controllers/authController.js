import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
      role: "user",
      status: "active",
    });

    res.json({
      message: "Signup successful ✅",
      user_id: user.user_id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Email already exists or invalid data ❌",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials ❌" });
  }

  if (user.status !== "active") {
    return res.status(403).json({ message: "Account inactive ❌" });
  }

  res.json({
    message: "Login successful 🎉",
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};
