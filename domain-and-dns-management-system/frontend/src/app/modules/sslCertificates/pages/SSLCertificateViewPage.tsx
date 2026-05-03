import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {SSLCertificateForm} from "../components/SSLCertificateForm"
import {getSSLCertificateById} from "../api/sslCertificatesApi"

export const SSLCertificateViewPage = () => {
  const {id} = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      const res = await getSSLCertificateById(id!)
      setData(res)
    }
    fetch()
  }, [id])

  if (!data) return <div>Loading...</div>

  return (
    <SSLCertificateForm
      initialValues={data}
      mode="view"   // 🔥 VIEW MODE
    />
  )
}