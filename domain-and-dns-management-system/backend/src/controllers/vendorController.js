import Vendor from "../models/Vendor.js" 

// CREATE Vendor
export const createVendor = async (req, res) => {
  try {
    const { vendor_name, status } = req.body 

    const vendor = await Vendor.create({
      vendor_name,
      status
    }) 

    return res.status(201).json({
      message: "Vendor created successfully",
      "vendor name": vendor.vendor_name
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// GET ALL Vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll() 

    return res.status(200).json(vendors) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// GET SINGLE Vendor
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params 
    console.log(id)
    const vendor = await Vendor.findByPk(id) 

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      }) 
    }

    return res.status(200).json(vendor) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// UPDATE Vendor
export const updateVendor = async (req, res) => {
  try {

    const { id } = req.params 
    const { vendor_name, status } = req.body 

    const vendor = await Vendor.findByPk(id) 

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      }) 
    }
    await vendor.update({
      vendor_name,
      status
    }) 

    return res.status(200).json({
      message: "Vendor updated successfully",
      data: vendor
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 



// DELETE Vendor
export const deleteVendor = async (req, res) => {
  try {

    const { id } = req.params 

    const vendor = await Vendor.findByPk(id) 

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      }) 
    }

    await vendor.destroy() 

    return res.status(200).json({
      message: "Vendor deleted successfully"
    }) 

  } catch (error) {
    return res.status(500).json({
      message: error.message
    }) 
  }
} 