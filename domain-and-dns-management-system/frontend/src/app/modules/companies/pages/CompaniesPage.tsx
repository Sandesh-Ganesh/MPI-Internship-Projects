import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CompanyList from "../components/CompanyList"

const CompaniesPage = () => {
  return (
    <>
      <PageTitle>Companies</PageTitle>
      <ToolbarWrapper />
      <Content>
        <CompanyList />
      </Content>
    </>
  )
}

export default CompaniesPage