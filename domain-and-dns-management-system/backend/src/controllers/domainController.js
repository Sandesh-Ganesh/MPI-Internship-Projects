import Domain from "../models/Domain.js"
import ActivityLog from "../models/ActivityLog.js"
import Company from "../models/Company.js"
import Vendor from "../models/Vendor.js"
import ControlPanel from "../models/ControlPanel.js"
export const createDomain = async (req,res)=>{
  try{

    const {
      domain_name,
      company_id,
      zone_id,
      api_token,
      cost_center_id,
      vendor_id,
      control_panel_id,
      dns_control_panel_id,
      requested_by,
      approved_by,
      usage_flag,
      registered_date,
      expiry_date,
      remarks,
      status
    } = req.body

    const existingDomain = await Domain.findOne({
      where:{ domain_name }
    })

    if(existingDomain){
      return res.status(400).json({
        message:"Domain already exists"
      })
    }

    const domain = await Domain.create({
      domain_name,
      company_id,
      zone_id,
      api_token,
      cost_center_id,
      vendor_id,
      control_panel_id,
      dns_control_panel_id,
      requested_by,
      approved_by,
      usage_flag,
      registered_date,
      expiry_date,
      remarks,
      status
    })
    
    //Log in Actity Log Table
    await ActivityLog.create({
      log_type: "DOMAIN",
      entity_id: domain.domain_id,
      user_id: req.user.userId,
      action: "CREATE",
      new_value: domain
    })

    return res.status(201).json({
      message:"Domain created successfully",
      data:domain
    })

  }catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}

export const getAllDomains = async (req,res)=>{
  try{

    const domains = await Domain.findAll({
      include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"]
        },
      ],
      order: [["expiry_date"]] 
    })

    return res.status(200).json(domains)

  }catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}

export const getDomainById = async (req,res)=>{
  try{

    const { id } = req.params

    const domain = await Domain.findByPk(id,{
       include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"]
        },
        {
          model: ControlPanel,
          attributes: ["control_panel_id", "panel_name"]
        }
      ]
    })

    if(!domain){
      return res.status(404).json({
        message:"Domain not found"
      })
    }

    return res.status(200).json(domain)

  }catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}

export const updateDomain = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const allowedUpdates = [
      "company_id",
      "vendor_id",
      "cost_center_id",
      "control_panel_id",
      "dns_control_panel_id",
      "approved_by",
      "remarks",
      "expiry_date",
      "usage_flag",
      "status"
    ]

    const filteredUpdates = {}

    for (let key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key]
      }
    }

    const domain = await Domain.findByPk(id)

    if (!domain) {
      return res.status(404).json({
        message: "Domain not found"
      })
    }

    const oldData = domain.toJSON()

    // 🔥 CHECK FOR CHANGES (same as SSL)
    let hasChanges = false

    for (let key of Object.keys(filteredUpdates)) {
      if (oldData[key] !== filteredUpdates[key]) {
        hasChanges = true
        break
      }
    }

    // ❌ NO CHANGE
    if (!hasChanges) {
      return res.status(200).json({
        message: "No changes detected",
        data: domain
      })
    }

    // ✅ UPDATE
    await domain.update(filteredUpdates)

    // 📝 LOG ONLY IF CHANGED
    await ActivityLog.create({
      log_type: "DOMAIN",
      entity_id: domain.domain_id,
      user_id: req.user?.userID,
      action: "UPDATE",
      old_value: oldData,
      new_value: domain.toJSON()
    })

    return res.status(200).json({
      message: "Domain updated successfully",
      data: domain
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const deleteDomain = async (req,res)=>{
  try{

    const { id } = req.params

    const domain = await Domain.findByPk(id)

    if(!domain){
      return res.status(404).json({
        message:"Domain not found"
      })
    }

    const oldData = domain.toJSON()

    await domain.update({
      status:"INACTIVE"
    })

    await ActivityLog.create({
      log_type: "DOMAIN",
      entity_id: domain.domain_id,
      user_id: req.user.userId,
      action: "DELETE",
      old_value: oldData,
      new_value: domain
    })

    return res.status(200).json({
      message:"Domain deactivated successfully"
    })

  }catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}

export const getDomainsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const domains = await Domain.findAll({
      where: {
        company_id: companyId
      },
      include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"]
        }
      ]
    });
    return res.status(200).json(domains);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
