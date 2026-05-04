import ControlPanel from "../models/ControlPanel.js"
import Vendor from "../models/Vendor.js"

// CREATE Control Panel
export const createControlPanel = async (req, res) => {
  try {

    const { panel_name, hosting_flag, dns_flag, ssl_flag, vendor_id, status } = req.body

    const existingPanel = await ControlPanel.findOne({
      where:{
        panel_name,
        vendor_id,
        status:"ACTIVE"
      }
    })

    if(existingPanel){
      return res.status(400).json({
        message:"Control Panel already exists for this vendor"
      })
    }

    const panel = await ControlPanel.create({
      panel_name,
      hosting_flag,
      dns_flag,
      ssl_flag,
      vendor_id,
      status
    })

    return res.status(201).json({
      message:"Control Panel created successfully",
      data:panel
    })

  } catch (error) {

    return res.status(500).json({
      message:error.message
    })

  }
}



// GET ALL Control Panels
export const getAllControlPanels = async (req,res)=>{
  try{
    const panels = await ControlPanel.findAll({
      where:{ status:"ACTIVE" },
      include: [
      {
        model: Vendor,
        attributes: ["vendor_id", "vendor_name"]
      }
    ]
    })

    return res.status(200).json(panels)

  }catch(error){

    return res.status(500).json({
      message:error.message
    })

  }
}



// GET Control Panel By ID
export const getControlPanelById = async (req,res)=>{
  try{

    const { id } = req.params

    const panel = await ControlPanel.findByPk(id)

    if(!panel){
      return res.status(404).json({
        message:"Control Panel not found"
      })
    }

    return res.status(200).json(panel)

  }catch(error){

    return res.status(500).json({
      message:error.message
    })

  }
}



// UPDATE Control Panel
export const updateControlPanel = async (req,res)=>{
  try{

    const { id } = req.params
    const { panel_name, hosting_flag, dns_flag, ssl_flag, vendor_id, status } = req.body

    const panel = await ControlPanel.findByPk(id)

    if(!panel){
      return res.status(404).json({
        message:"Control Panel not found"
      })
    }

    await panel.update({
      panel_name,
      hosting_flag,
      dns_flag,
      ssl_flag,
      vendor_id,
      status
    })

    return res.status(200).json({
      message:"Control Panel updated successfully",
      data:panel
    })

  }catch(error){

    return res.status(500).json({
      message:error.message
    })

  }
}



// SOFT DELETE Control Panel
export const deleteControlPanel = async (req,res)=>{
  try{

    const { id } = req.params

    const panel = await ControlPanel.findByPk(id)

    if(!panel){
      return res.status(404).json({
        message:"Control Panel not found"
      })
    }

    await panel.update({
      status:"INACTIVE"
    })

    return res.status(200).json({
      message:"Control Panel deactivated successfully"
    })

  }catch(error){

    return res.status(500).json({
      message:error.message
    })

  }
}