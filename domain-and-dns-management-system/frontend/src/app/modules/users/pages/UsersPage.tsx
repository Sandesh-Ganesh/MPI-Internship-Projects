import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import UsersList from "../components/UsersList"

const UsersPage = () => {
  return (
    <>
      <PageTitle>Users</PageTitle>
      <ToolbarWrapper />
      <Content>
        <UsersList />
      </Content>
    </>
  )
}

export default UsersPage