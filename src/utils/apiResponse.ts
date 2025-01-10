import { Response } from "express";

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export class ApiResponseHandler {
  // Success response
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    status: number = 200
  ): Response {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  // Error response
  static error(
    res: Response,
    message: string,
    error?: unknown,
    status: number = 500
  ): Response {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return res.status(status).json({
      success: false,
      message,
      error: errorMessage,
    });
  }

  // Bad Request response
  static badRequest(res: Response, message: string, error?: string): Response {
    return this.error(res, message, error, 400);
  }

  // Unauthorized response
  static unauthorized(
    res: Response,
    message: string = "Unauthorized"
  ): Response {
    return this.error(res, message, undefined, 401);
  }

  // Forbidden response
  static forbidden(res: Response, message: string = "Forbidden"): Response {
    return this.error(res, message, undefined, 403);
  }

  // Not Found response
  static notFound(res: Response, message: string = "Not Found"): Response {
    return this.error(res, message, undefined, 404);
  }
}
