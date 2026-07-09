const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const vendorRepository = require("../repositories/vendor.repository");

const createVendor = async (userId, vendorData) => {
  await verifyWeddingOwnership(userId, vendorData.wedding_id);
  return vendorRepository.createVendor(vendorData);
};

const getVendorsByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return vendorRepository.findVendorsByWedding(weddingId);
};

const getVendorById = async (vendorId, userId) => {
  const vendor = await vendorRepository.findVendorById(vendorId);
  await verifyWeddingOwnership(userId, vendor.wedding_id);
  return vendor;
};

const updateVendor = async (vendorId, updates, userId) => {
  const existingVendor = await getVendorById(vendorId, userId);

  const allowedUpdates = {
    name: updates.name,
    service: updates.service,
    phone: updates.phone,
    email: updates.email
  };

  const cleanUpdates = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([_, v]) => v !== undefined)
  );

  return vendorRepository.updateVendor(vendorId, {
    ...existingVendor,
    ...cleanUpdates
  });
};

const deleteVendor = async (vendorId, userId) => {
  await getVendorById(vendorId, userId);
  return vendorRepository.deleteVendor(vendorId);
};

module.exports = {
  createVendor,
  getVendorsByWedding,
  getVendorById,
  updateVendor,
  deleteVendor
};
