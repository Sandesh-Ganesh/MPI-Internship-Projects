import {useState, useEffect} from "react"
import {
  getCompanies,
  getVendors,
  getCostCenters
} from "../api/domainsDropdownApi"

export const DomainForm = ({initialValues, onSubmit}: any) => {
  const [form, setForm] = useState(initialValues)
  const [companies, setCompanies] = useState<any[]>([])
  const [vendors, setVendors] = useState<any[]>([])
  const [costCenters, setCostCenters] = useState<any[]>([])

  useEffect(() => {
    setForm(initialValues)
  }, [initialValues])

  useEffect(() => {
  const fetchDropdowns = async () => {
    try {
      const [c, v, cc] = await Promise.all([
        getCompanies(),
        getVendors(),
        getCostCenters()
      ])

      setCompanies(c)
      setVendors(v)
      setCostCenters(cc)
    } catch (err) {
      console.error(err)
    }
  }
  fetchDropdowns()
  }, [])


  const handleChange = (e: any) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    onSubmit(form)
  }

  return (
    <div className="card p-5">

      {/* DOMAIN + ZONE */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>Domain Name</label>
          <input name="domain_name" value={form.domain_name} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label>Zone ID</label>
          <input name="zone_id" value={form.zone_id} className="form-control" onChange={handleChange} />
        </div>
      </div>

      {/* API + USAGE */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>API Token</label>
          <input name="api_token" value={form.api_token} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label>Usage</label>
          <select name="usage_flag" value={form.usage_flag} className="form-select" onChange={handleChange}>
            <option value="INTERNAL">INTERNAL</option>
            <option value="EXTERNAL">EXTERNAL</option>
          </select>
        </div>
      </div>

      {/* BUSINESS */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>Company </label>
          <select
                name="company_id"
                value={form.company_id}
                className="form-select"
                onChange={handleChange}
                >
                <option value="">Select Company</option>
                {companies.map((c) => (
                    <option key={c.company_id} value={c.company_id}>
                    {c.company_name}
                    </option>
                ))}
            </select>
        </div>

        <div className="col-md-6">
          <label>Cost Center</label>
          <select
            name="cost_center_id"
            value={form.cost_center_id}
            className="form-select"
            onChange={handleChange}
            >
            <option value="">Select Cost Center</option>
            {costCenters.map((cc) => (
                <option key={cc.cost_center_id} value={cc.cost_center_id}>
                {cc.cost_center_name}
                </option>
            ))}
        </select>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <label>Vendor</label>
          <select
            name="vendor_id"
            value={form.vendor_id}
            className="form-select"
            onChange={handleChange}
            >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
                <option key={v.vendor_id} value={v.vendor_id}>
                {v.vendor_name}
                </option>
            ))}
        </select>
        </div>

        <div className="col-md-6">
          <label>Control Panel ID</label>
          <input name="control_panel_id" value={form.control_panel_id} className="form-control" onChange={handleChange} />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <label>DNS Control Panel ID</label>
          <input name="dns_control_panel_id" value={form.dns_control_panel_id} className="form-control" onChange={handleChange} />
        </div>
      </div>

      {/* USERS */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>Requested By</label>
          <input name="requested_by" value={form.requested_by} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label>Approved By</label>
          <input name="approved_by" value={form.approved_by} className="form-control" onChange={handleChange} />
        </div>
      </div>

      {/* DATES */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>Registered Date</label>
          <input type="date" name="registered_date" value={form.registered_date} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label>Expiry Date</label>
          <input type="date" name="expiry_date" value={form.expiry_date} className="form-control" onChange={handleChange} />
        </div>
      </div>

      {/* STATUS */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label>Status</label>
          <select name="status" value={form.status} className="form-select" onChange={handleChange}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      {/* REMARKS */}
      <div className="mb-5">
        <label>Remarks</label>
        <textarea name="remarks" value={form.remarks} className="form-control" onChange={handleChange} />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </div>
  )
}