import CostCenter from "../models/CostCenter.js" 

// CREATE Cost Center
export const createCostCenter = async (req, res) => {
  try {
    const { cost_center_name, status } = req.body 

    const costCenter = await CostCenter.create({
      cost_center_name,
      status
    }) 

    return res.status(201).json({
      message: "Cost Center created successfully",
      "Cost Center name": costCenter.cost_Center_name
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// GET ALL Cost Centers
export const getAllCostCenters = async (req, res) => {
  try {
    const costCenters = await CostCenter.findAll() 

    return res.status(200).json(costCenters) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// GET SINGLE Cost Center
export const getCostCenterById = async (req, res) => {
  try {
    const { id } = req.params 
    // console.log(id)
    const costCenter = await CostCenter.findByPk(id) 

    if (!costCenter) {
      return res.status(404).json({
        message: "Cost Center not found"
      }) 
    }

    return res.status(200).json(costCenter) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// UPDATE Cost Center
export const updateCostCenter = async (req, res) => {
  try {

    const { id } = req.params 
    const { cost_center_name, status } = req.body 

    const costCenter = await CostCenter.findByPk(id) 

    if (!costCenter) {
      return res.status(404).json({
        message: "Cost Center not found"
      }) 
    }
    await costCenter.update({
      cost_center_name,
      status
    }) 

    return res.status(200).json({
      message: "Cost Center updated successfully",
      data: costCenter
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// DELETE Cost Center
export const deleteCostCenter = async (req, res) => {
  try {

    const { id } = req.params 

    const costCenter = await CostCenter.findByPk(id) 

    if (!costCenter) {
      return res.status(404).json({
        message: "Cost Center not found"
      }) 
    }

    await costCenter.destroy() 

    return res.status(200).json({
      message: "Cost Center deleted successfully"
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 