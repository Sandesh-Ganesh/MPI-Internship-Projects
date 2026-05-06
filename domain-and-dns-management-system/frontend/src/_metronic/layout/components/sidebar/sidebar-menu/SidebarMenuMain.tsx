import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

import {useAuth} from '../../../../../app/modules/auth'

import {sidebarModules} from '../../../../../app/constants/sidebarModules'
import {canAccess} from '../../../../../app/constants/permissions'

const SidebarMenuMain = () => {
  const {currentUser} = useAuth()

  return (
    <>
      {sidebarModules.map((module, index) => {
        if (!canAccess(currentUser?.role, module.roles)) {
          return null
        }

        // SINGLE ITEM
        if (module.type === 'item' && module.to) {
          return (
            <SidebarMenuItem
              key={index}
              to={module.to}
              title={module.title}
              icon={module.icon || 'element-11'}
            />
          )
        }

        // GROUP
        return (
          <SidebarMenuItemWithSub
            key={index}
            to='#'
            title={module.title}
            icon={module.icon}
          >
            {module.children?.map((child, childIndex) => (
              <SidebarMenuItem
                key={childIndex}
                to={child.to}
                title={child.title}
                hasBullet
              />
            ))}
          </SidebarMenuItemWithSub>
        )
      })}
    </>
  )
}

export {SidebarMenuMain}