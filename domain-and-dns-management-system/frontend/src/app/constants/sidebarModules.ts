import {ROLES} from './permissions'

export const sidebarModules = [
  {
    type: 'item',
    title: 'Dashboard',
    to: '/dashboard',
    icon: 'element-11',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },

  {
    type: 'group',
    title: 'Masters',
    icon: 'abstract-26',
    roles: [ROLES.ADMIN],

    children: [
      {
        title: 'Companies',
        to: '/companies',
      },
      {
        title: 'Vendors',
        to: '/vendors',
      },
      {
        title: 'Control Panels',
        to: '/control-panels',
      },
      {
        title: 'Cost Centers',
        to: '/cost-centers',
      },
    ],
  },

  {
    type: 'group',
    title: 'Transactions',
    icon: 'element-12',
    roles: [ROLES.ADMIN, ROLES.MANAGER],

    children: [
      {
        title: 'Domains',
        to: '/domains',
      },
      {
        title: 'DNS Records',
        to: '/dns-records',
      },
      {
        title: 'SSL Certificates',
        to: '/ssl-certificates',
      },
    ],
  },

  {
    type: 'group',
    title: 'Logs',
    icon: 'document',
    roles: [ROLES.ADMIN, ROLES.MANAGER],

    children: [
      {
        title: 'Activity Logs',
        to: '/activity-logs',
      },
      {
        title: 'DNS Sync Logs',
        to: '/dns-sync-logs',
      },
      {
        title: 'DNS Change Logs',
        to: '/dns-change-logs',
      },
    ],
  },

  {
    type: 'group',
    title: 'Admin',
    icon: 'profile-circle',
    roles: [ROLES.ADMIN],

    children: [
      {
        title: 'Users',
        to: '/users',
      },
    ],
  },

  // USER MODULES
  {
    type: 'item',
    title: 'Domains',
    to: '/domains',
    icon: 'element-11',
    roles: [ROLES.USER],
  },

  {
    type: 'item',
    title: 'DNS Records',
    to: '/dns-records',
    icon: 'code',
    roles: [ROLES.USER],
  },
]