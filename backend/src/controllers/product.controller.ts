import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { sendResponse } from '../utils/ApiResponse.js';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    sendResponse(res, 200, 'Products retrieved successfully', products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id).populate('user', 'name email');
    if (!product) {
      return next(new ApiError(404, 'Product not found'));
    }
    sendResponse(res, 200, 'Product retrieved successfully', product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    sendResponse(res, 201, 'Product created successfully', product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ApiError(404, 'Product not found'));
    }

    // Make sure user is product owner or admin
    if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ApiError(401, 'Not authorized to update this product'));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    sendResponse(res, 200, 'Product updated successfully', product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ApiError(404, 'Product not found'));
    }

    // Make sure user is product owner or admin
    if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ApiError(401, 'Not authorized to delete this product'));
    }

    await product.deleteOne();

    sendResponse(res, 200, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};
