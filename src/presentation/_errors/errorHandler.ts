import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../domain/_errors/domain.error";
import { ApplicationError } from "../../application/_errors/application.error";
import { ValidationError } from "yup";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = error.message;

  if (error instanceof ApplicationError || error instanceof DomainError) {
    status = error.status;
    message = error.message;
  }

  if (error instanceof ValidationError) {
    status = 400;
    message = error.message;
  }

  res.status(status).json({ error: { message } });
};
