import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import VendorList from "../components/VendorList"

const VendorsPage = () => {
  return (
    <>
      <PageTitle>Vendors</PageTitle>
      <ToolbarWrapper />
      <Content>
        <VendorList />
      </Content>
    </>
  )
}

export default VendorsPage