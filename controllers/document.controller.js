const documentService = require("../services/document.service");

const createDocument = async (req, res) => {
  try {
    const result = await documentService.createDocument(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocumentsByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await documentService.getDocumentById(req.params.id, req.user.id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    await documentService.deleteDocument(req.params.id, req.user.id);
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  deleteDocument
};
