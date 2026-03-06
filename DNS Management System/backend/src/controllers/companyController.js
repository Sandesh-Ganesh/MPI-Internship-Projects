import Company from "../models/Company.js";


// CREATE COMPANY
export const createCompany = async (req, res) => {
  try {
    const { company_name, company_code, status } = req.body;

    const company = await Company.create({
      company_name,
      company_code,
      status
    });

    return res.status(201).json({
      message: "Company created successfully",
      data: company
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



// GET ALL COMPANIES
export const getAllCompanies = async (req, res) => {
  try {

    const companies = await Company.findAll();

    return res.status(200).json(companies);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



// GET SINGLE COMPANY
export const getCompanyById = async (req, res) => {
  try {

    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    return res.status(200).json(company);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



// UPDATE COMPANY
export const updateCompany = async (req, res) => {
  try {

    const { id } = req.params;
    const { company_name, company_code, status } = req.body;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    await company.update({
      company_name,
      company_code,
      status
    });

    return res.status(200).json({
      message: "Company updated successfully",
      data: company
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



// DELETE COMPANY
export const deleteCompany = async (req, res) => {
  try {

    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    await company.destroy();

    return res.status(200).json({
      message: "Company deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};