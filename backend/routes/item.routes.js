import express from 'express';
import { getItems, createItem } from '../controllers/item.controller.js';

const router = express.Router();

router.route('/')
    .get(getItems)
    .post(createItem);

export default router;
