import {ROLES} from './permissions'

export const dashboardModules = [
  {
    title: 'Domains',
    description:
      'Manage registered domains, ownership details, expiry dates, and status.',
    path: '/domains',
    icon: 'ki-outline ki-element-11',
    tone: 'primary',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },

  {
    title: 'DNS Records',
    description:
      'Review synced DNS records, filter by domain/type, and start DNS sync.',
    path: '/dns-records',
    icon: 'ki-outline ki-code',
    tone: 'info',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },

  {
    title: 'SSL Certificates',
    description:
      'Track SSL certificates, validity dates, vendors, and renewal status.',
    path: '/ssl-certificates',
    icon: 'ki-outline ki-shield-tick',
    tone: 'success',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },

  {
    title: 'Vendors',
    description:
      'Manage domain registrars and infrastructure vendors.',
    path: '/vendors',
    icon: 'ki-outline ki-shop',
    tone: 'warning',
    roles: [ROLES.ADMIN],
  },

  {
    title: 'Companies',
    description:
      'Manage business entities and ownership mapping.',
    path: '/companies',
    icon: 'ki-outline ki-abstract-26',
    tone: 'danger',
    roles: [ROLES.ADMIN],
  },

  {
    title: 'Activity Logs',
    description:
      'Track DNS sync activity and platform operations.',
    path: '/activity-logs',
    icon: 'ki-outline ki-time',
    tone: 'dark',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
]