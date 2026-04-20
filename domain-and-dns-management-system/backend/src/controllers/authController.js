import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
  try {
    const { username, role, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password,10)
   
    const user = await User.create({
      username,
      email,
      password : hashedPassword,
      role: role || "user",
      status: "ACTIVE",
    })

    res.json({
      message: "Signup successful ✅",
      user_id: user.user_id,
    })
  } catch (error) {
    res.status(400).json({
      message: "Email already exists or invalid data ❌",
      error:error
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: { email },
  })

  if (!user) {
      return res.status(404).json({ message: "User not found ❌" })
  }

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
      return res.status(401).json({ message: "Invalid credentials ❌" })
  }

  if (user.status !== "ACTIVE") {
    return res.status(403).json({ message: "Account inactive ❌" })
  }

  const token = jwt.sign(
    {
      userID:user.user_id,
      role:user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    message: "Login successful 🎉",
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token
  })
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userID)
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" })
  }
}

