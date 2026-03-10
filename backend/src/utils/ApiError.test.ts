import { describe, it, expect } from 'vitest';
import { ApiError } from './ApiError.js';

describe('ApiError', () => {
  it('should create an error with status code and message', () => {
    const error = new ApiError(404, 'Not Found');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
  });

  it('should default isOperational to true', () => {
    const error = new ApiError(400, 'Bad Request');
    expect(error.isOperational).toBe(true);
  });
});
