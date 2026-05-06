import User from "../models/User.js"
import { Op } from "sequelize"
export const getAllUsers = async (req, res) => {
    try {
    const users = await User.findAll({
        attributes: { exclude: ["password"] },
        where:{ role : 
            {
                 [Op.ne]: "admin" 
            } }
    })
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" })
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id,{
        attributes: { exclude: ["password"] }
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json(user)
  }
  catch (error) {
    return res.status(500).json({ message: "Error fetching user" })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, role, status } = req.body  

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await user.update({
      username: username ?? user.username,
      email: email ?? user.email,
      role: role ?? user.role,
      status: status ?? user.status,
    })

    return res.json({
      message: "User updated successfully",
      data: user
    })

  } catch (error) {
    return res.status(500).json({ message: "Error updating user" })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await user.update({ status: "INACTIVE" })

    return res.json({ message: "User deactivated successfully" })

  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" })
  }
}

export const approveUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.status = "ACTIVE"
    await user.save()
    return res.json({ message: "User approved successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Error approving user" })
  }
}

export const deactivateUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.status = "INACTIVE"
    await user.save()
    return res.json({ message: "User deactivated successfully" })
  }
  catch (error) {
    return res.status(500).json({ message: "Error deactivating user" })
  }
}
 export const changeUserRole = async (req, res) => {
  const { id } = req.params
  const { role } = req.body
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.role = role
    await user.save()
    return res.json({ message: "User role updated successfully" })
  }
  catch (error) {
    return res.status(500).json({ message: "Error updating user role" })
  }
}
