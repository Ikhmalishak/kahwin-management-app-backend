const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const documentRepository = require("../repositories/document.repository");

const createDocument = async (userId, documentData) => {
  await verifyWeddingOwnership(userId, documentData.wedding_id);
  return documentRepository.createDocument(documentData);
};

const getDocumentsByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return documentRepository.findDocumentsByWedding(weddingId);
};

const getDocumentById = async (documentId, userId) => {
  const document = await documentRepository.findDocumentById(documentId);
  await verifyWeddingOwnership(userId, document.wedding_id);
  return document;
};

const deleteDocument = async (documentId, userId) => {
  await getDocumentById(documentId, userId);
  return documentRepository.deleteDocument(documentId);
};

module.exports = {
  createDocument,
  getDocumentsByWedding,
  getDocumentById,
  deleteDocument
};
