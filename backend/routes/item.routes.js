const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemController');

router.route('/')
  .get(ctrl.getItems)
  .post(ctrl.createItem);

router.route('/:id')
  .get(ctrl.getItem)
  .put(ctrl.updateItem)
  .delete(ctrl.deleteItem);

module.exports = router;
