export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
}

export const canAccess = (
  role: string | undefined,
  allowedRoles: string[]
) => {
  if (!role) return false

  return allowedRoles.includes(role)
}