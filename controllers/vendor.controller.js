const vendorService = require("../services/vendor.service");

const createVendor = async (req, res) => {
  try {
    const result = await vendorService.createVendor(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await vendorService.getVendorsByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id, req.user.id);
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await vendorService.updateVendor(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedVendor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteVendor = async (req, res) => {
  try {
    await vendorService.deleteVendor(req.params.id, req.user.id);
    res.json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
};
