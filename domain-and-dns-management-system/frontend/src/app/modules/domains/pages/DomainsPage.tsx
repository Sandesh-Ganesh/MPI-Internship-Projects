import {useEffect, useState} from "react"
import {getDomains} from "../api/domainsApi"
import {DomainsTable} from "../components/DomainsTable"
import {PageTitle} from "../../../../_metronic/layout/core"
import {Content} from "../../../../_metronic/layout/components/content"
import {ToolbarWrapper} from "../../../../_metronic/layout/components/toolbar"
const breadcrumbs = [
  {
    title: "Home",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
]

export const DomainsPage = () => {
  const [domains, setDomains] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDomains()
  }, [])

  const fetchDomains = async () => {
    try {
      const data = await getDomains()
      setDomains(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const breadcrumbs = [
  {
    title: "Dashboard",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
]

  return (
  <>
    <PageTitle breadcrumbs={breadcrumbs} >Domains</PageTitle>
    <ToolbarWrapper />
    <Content>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DomainsTable domains={domains} />
      )}
    </Content>
  </>
)
}