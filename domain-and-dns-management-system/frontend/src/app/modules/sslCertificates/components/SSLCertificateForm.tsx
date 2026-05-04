import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { getDomains } from "../api/sslCertificatesApi"
import { getVendors } from "../../vendors/api/vendorApi"
import {getControlPanels} from "../../controlPanels/api/controlPanelApi"

export const SSLCertificateForm = ({
  initialValues,
  onSubmit,
  mode="edit",
  loading=false
  }: any) => {
  const [form, setForm] = useState(initialValues)
  const [domains, setDomains] = useState<any[]>([])
  const [vendors, setVendors] = useState<any[]>([])
  const [controlPanels, setControlPanels] = useState<any[]>([])
  const [loadingDropdowns, setLoadingDropdowns] = useState(true)
  const isView = mode === "view"
  const navigate = useNavigate()
  useEffect(() => {
    setForm(initialValues)
  }, [initialValues])

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [domainData, vendorData, panelData] = await Promise.all([
          getDomains(),
          getVendors(),
          getControlPanels(),
        ])

        setDomains(domainData)
        setVendors(vendorData)
        setControlPanels(panelData.filter((panel: any) => panel.ssl_flag))
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingDropdowns(false)
      }
    }

    fetchDropdowns()
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: ["vendor_id", "control_panel_id", "domain_id", "approved_by"].includes(name)
        ? value === "" ? null : Number(value)
        : value
    })
  }
  console.log("loading:", loading)
  return (
    <div className="card p-5">
      {loadingDropdowns && <div className="mb-5 text-muted">Loading dropdowns...</div>}

      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label required">SSL Name</label>
          <input
            name="ssl_name"
            value={form.ssl_name}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label required">Domain</label>
          <select
            name="domain_id"
            value={form.domain_id}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="">Select Domain</option>
            {domains.map((domain: any) => (
              <option key={domain.domain_id} value={domain.domain_id}>
                {domain.domain_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <label className="form-label required">Certificate Type</label>
          <select name="cert_type" value={form.cert_type} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="DV">DV</option>
            <option value="OV">OV</option>
            <option value="EV">EV</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label required">Validation Type</label>
          <select name="validation_type" value={form.validation_type} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="DNS">DNS</option>
            <option value="EMAIL">EMAIL</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label required">Encryption Type</label>
          <select name="encryption_type" value={form.encryption_type} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="RSA">RSA</option>
            <option value="ECC">ECC</option>
          </select>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label required">Registered Date</label>
          <input
            type="date"
            name="registered_date"
            value={form.registered_date}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label required">Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label">Vendor</label>
          <select name="vendor_id" value={form.vendor_id} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="">Select Vendor</option>
            {vendors.map((vendor: any) => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.vendor_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">SSL Control Panel</label>
          <select name="control_panel_id" value={form.control_panel_id} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="">Select Control Panel</option>
            {controlPanels.map((panel: any) => (
              <option key={panel.control_panel_id} value={panel.control_panel_id}>
                {panel.panel_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <label className="form-label">Requested By</label>
          <input name="requested_by" value={form.requested_by} className="form-control" onChange={handleChange} disabled={isView} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Approved By</label>
          <input name="approved_by" value={form.approved_by} className="form-control" onChange={handleChange} disabled={isView} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select name="status" value={form.status} className="form-select" onChange={handleChange} disabled={isView}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label">Remarks</label>
        <textarea name="remarks" value={form.remarks} className="form-control" onChange={handleChange} disabled={isView} />
      </div>
      {isView && (
        <button
          className="btn btn-light-primary"
          onClick={() => navigate(`/ssl-certificates/${form.ssl_id}/edit`)}
        >
          Edit
        </button>
      )}
      {!isView && (
        <button
          className="btn btn-primary"
          onClick={() => onSubmit(form)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      )}
    </div>
  )
}
