import { useEffect, useState } from "react"
import { getUsers, updateUser } from "../api/userApi"
import { showToast } from "../../../utils/toast"

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleApprove = async (user: any) => {
    await updateUser(user.user_id, {
      status: "ACTIVE",
      role: user.role || "USER"
    })
    showToast("User approved", "success")
    fetchUsers()
  }

  const handleDeactivate = async (user: any) => {
    await updateUser(user.user_id, {
      status: "INACTIVE"
    })
    showToast("User deactivated", "success")
    fetchUsers()
  }

  const handleRoleChange = async (user: any, role: string) => {
    await updateUser(user.user_id, {
      role
    })
    showToast("Role updated", "success")
    fetchUsers()
  }

  return (
    <div className="card">

      <div className="card-header border-0 pt-6">
        <h2 className="fw-bold">Users</h2>
      </div>

      <div className="card-body">
        <table className="table align-middle table-row-dashed fs-6 gy-5">

          <thead>
            <tr className="text-muted fw-bold fs-7 text-uppercase">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>

                {/* Name */}
                <td className="fw-bold">{u.username}</td>

                {/* Email */}
                <td>{u.email}</td>

                {/* Status */}
                <td>
                  <span className={`badge ${
                    u.status === "ACTIVE"
                      ? "badge-light-success"
                      : u.status === "PENDING"
                      ? "badge-light-warning"
                      : "badge-light-danger"
                  }`}>
                    {u.status}
                  </span>
                </td>

                {/* Role */}
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u, e.target.value)
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="text-end">

                  {u.status === "PENDING" && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleApprove(u)}
                    >
                      Approve
                    </button>
                  )}

                  {u.status === "ACTIVE" && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeactivate(u)}
                    >
                      Deactivate
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default UsersList