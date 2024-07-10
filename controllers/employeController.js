const Employee = require("../model/Employee");

const getAllEmployee = async (req, res) => {
  const employee = await Employee.find();
  if (!employee) return res.status(204).json({ message: "No employee found" });
  res.status(200).json(employee);
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: `firstname and lastname are required` });
  }
  try {
    let result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${req.body.id} not found` });
  }
  if (req?.body?.firstname) employee.firstname = req.body.firstname;
  if (req?.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  console.log(result);
  res.status(200).json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ${employee.id} not found` });
  }
  const result = await Employee.deleteOne({ _id: req.body.id });
  res.status(200).json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  const employee = await Employee.findOne({
    _id: req.params.id,
  }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ${employee.id} not found` });
  }
  res.status(200).json(employee);
};

module.exports = {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
