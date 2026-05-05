import CostCenter from "../models/CostCenter.js" 
import Company from "../models/Company.js"

// CREATE Cost Center
export const createCostCenter = async (req, res) => {
  try {

    const { company_id, cost_center_name, status } = req.body

    const existingCostCenter = await CostCenter.findOne({
      where:{
        company_id,
        cost_center_name,
        status:"ACTIVE"
      }
    })
    console.log(existingCostCenter)

    if(existingCostCenter){
      return res.status(400).json({
        message:"Cost center already exists for this company"
      })
    }

    const costCenter = await CostCenter.create({
      company_id,
      cost_center_name,
      status
    })

    return res.status(201).json({
      message:"Cost center created successfully",
      data:costCenter
    })

  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}
// GET ALL Cost Centers
export const getAllCostCenters = async (req, res) => {
  try {
    const costCenters = await CostCenter.findAll({
      where: { status: "ACTIVE" },
      include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        }
      ]
    })
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
    const costCenter = await CostCenter.findByPk(id,{
      where: { status: "ACTIVE" },
      include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        }
      ]
    }) 

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
    const { company_id, cost_center_name, status } = req.body

    const costCenter = await CostCenter.findByPk(id)

    if (!costCenter) {
      return res.status(404).json({
        message: "Cost Center not found"
      })
    }

    await costCenter.update({
      company_id,
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

    await costCenter.update(
      {status:"INACTIVE"}
    )

    return res.status(200).json({
      message: "Cost Center has been made inactive"
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 

export const getCostCentersByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params
    const costCenters = await CostCenter.findAll({
      where: { company_id: companyId, status: "ACTIVE" },
      include: [
        {
          model: Company,
          attributes: ["company_id", "company_name"]
        }
      ]
    })
    return res.status(200).json(costCenters)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
