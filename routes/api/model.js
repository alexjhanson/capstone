const express = require('express');
const modelController = require('../../controllers/model');
const router = express.Router();

router.get('/test_model', modelController.test_model);
router.get('/make_prediction/:id', modelController.make_prediction);
router.get('/get_all_cxls', modelController.get_all_cxls);
router.get('/get_all_cxls_by_month', modelController.get_cxls_by_month);
router.get('/get_all_cxls_by_feature', modelController.get_cxls_by_feature);

module.exports = router;