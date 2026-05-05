import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { getControlPanels } from "../../controlPanels/api/controlPanelApi"
import { getVendors } from "../../vendors/api/vendorApi"
import { getCompanies } from "../../companies/api/companyApi"
import { getCostCentersByCompany } from "../../costCenters/api/costCenterApi"
export const DomainForm = ({
  initialValues,
  onSubmit,
  mode = "edit",
  loading = false
}: any) => {

  const [form, setForm] = useState(initialValues)

  const [companies, setCompanies] = useState<any[]>([])
  const [vendors, setVendors] = useState<any[]>([])
  const [costCenters, setCostCenters] = useState<any[]>([])
  const [panels, setPanels] = useState<any[]>([])

  const [loadingDropdowns, setLoadingDropdowns] = useState(true)

  const isView = mode === "view"
  const navigate = useNavigate()

  useEffect(() => {
    setForm(initialValues)
  }, [initialValues])

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const companiesData = await getCompanies()
        setCompanies(companiesData)

        const panelsData = await getControlPanels()
        const filteredPanels = panelsData.filter((p: any) => p.dns_flag)
        setPanels(filteredPanels)

        const vendorsData = await getVendors()
        setVendors(vendorsData)

      } catch (err) {
        console.error(err)
      } finally {
        setLoadingDropdowns(false)
      }
    }

    fetchDropdowns()
  }, [])

  useEffect(() => {
    if (form.company_id) {
      getCostCentersByCompany(form.company_id)
        .then((data) => {
          setCostCenters(data)
        })
        .catch((err) => console.error(err))
    } else {
      setCostCenters([])
    }
  }, [form.company_id])

  const handleChange = (e: any) => {
  const { name, value } = e.target

  if (name === "company_id") {
    setForm({
      ...form,
      company_id: value,
      cost_center_id: "" // reset
    })
  } else {
    setForm({
      ...form,
      [name]: value
    })
  }
}

  return (
    <div className="card p-5">

      {loadingDropdowns && (
        <div className="mb-5 text-muted">Loading dropdowns...</div>
      )}

      {/* DOMAIN + ZONE */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label required">Domain Name</label>
          <input
            name="domain_name"
            value={form.domain_name}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Zone ID</label>
          <input
            name="zone_id"
            value={form.zone_id}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>
      </div>

      {/* COMPANY + COST CENTER */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label required">Company</label>
          <select
            name="company_id"
            value={form.company_id}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="">Select Company</option>
            {companies.map((c: any) => (
              <option key={c.company_id} value={c.company_id}>
                {c.company_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label required">Cost Center</label>
          <select
            name="cost_center_id"
            value={form.cost_center_id}
            className="form-select"
            onChange={handleChange}
            disabled={isView || !form.company_id}
          >
            <option value="">Select Cost Center</option>
            {costCenters.map((cc: any) => (
              <option key={cc.cost_center_id} value={cc.cost_center_id}>
                {cc.cost_center_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VENDOR + USAGE */}
      <div className="row mb-5">
        <div className="col-md-6">
          <label className="form-label required">Vendor</label>
          <select
            name="vendor_id"
            value={form.vendor_id}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="">Select Vendor</option>
            {vendors.map((v: any) => (
              <option key={v.vendor_id} value={v.vendor_id}>
                {v.vendor_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label required">Control Panel</label>
          <select
            name="control_panel_id"
            value={form.control_panel_id}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="">Select Control Panel</option>
            {panels.map((p: any) => (
              <option key={p.control_panel_id} value={p.control_panel_id}>
                {p.panel_name}
              </option>
            ))}
          </select>
        </div>

        

        <div className="col-md-6">
          <label className="form-label required">Usage</label>
          <select
            name="usage_flag"
            value={form.usage_flag}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="INTERNAL">INTERNAL</option>
            <option value="EXTERNAL">EXTERNAL</option>
          </select>
        </div>
      </div>

      {/* DATES */}
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

      {/* USERS + STATUS */}
      <div className="row mb-5">
        <div className="col-md-4">
          <label className="form-label">Requested By</label>
          <input
            name="requested_by"
            value={form.requested_by}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Approved By</label>
          <input
            name="approved_by"
            value={form.approved_by}
            className="form-control"
            onChange={handleChange}
            disabled={isView}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={form.status}
            className="form-select"
            onChange={handleChange}
            disabled={isView}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      {/* REMARKS */}
      <div className="mb-5">
        <label className="form-label">Remarks</label>
        <textarea
          name="remarks"
          value={form.remarks}
          className="form-control"
          onChange={handleChange}
          disabled={isView}
        />
      </div>

      {/* BUTTONS */}
      <div className="d-flex justify-content-end gap-3">

        {/* 🔙 BACK */}
        <button
          className="btn btn-light"
          onClick={() => navigate("/domains")}
        >
          Back
        </button>

        {/* 👁 VIEW MODE */}
        {isView && (
          <button
            className="btn btn-light-primary"
            onClick={() => navigate(`/domains/${form.domain_id}/edit`)}
          >
            Edit
          </button>
        )}

        {/* ✏️ CREATE / EDIT MODE */}
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
    </div>
  )
}