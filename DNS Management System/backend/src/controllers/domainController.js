import Domain from "../models/Domain.js"

export const createDomain = async (req,res)=>{
  try{

    const {
      domain_name,
      company_id,
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

    const domains = await Domain.findAll()

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

    const domain = await Domain.findByPk(id)

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

export const updateDomain = async (req,res)=>{
  try{

    const { id } = req.params

    const domain = await Domain.findByPk(id)

    if(!domain){
      return res.status(404).json({
        message:"Domain not found"
      })
    }

    await domain.update(req.body)

    return res.status(200).json({
      message:"Domain updated successfully",
      data:domain
    })

  }catch(error){
    return res.status(500).json({
      message:error.message
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

    await domain.update({
      status:"INACTIVE"
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