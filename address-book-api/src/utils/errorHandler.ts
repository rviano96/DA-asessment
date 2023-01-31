import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import { ALREADY_EXIST_EXCEPTION, BUSINESS_EXCEPTION, CONTACT_NOT_FOUND_EXCEPTION } from "./constants";
import CustomError from "./customError";

export const customErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
        const errorBody = err.details.get('body');
        if (errorBody) {
            const { details: [errorDetails] } = errorBody!;
            return res.status(400).send({
                statusCode: 400,
                message: err.message,
                reason: errorDetails.message
            });
        }
        const errorParams = err.details.get('params')
        if (errorParams) {
            return res.status(400).send({
                statusCode: 400,
                message: err.message,
                reason: errorParams.message
            });
        }

        return res.status(400).send({
            statusCode: 400,
            message: err.message,
        });
    }
    if (err instanceof CustomError) {
        switch (err.name) {
            case ALREADY_EXIST_EXCEPTION:
            case CONTACT_NOT_FOUND_EXCEPTION:
                return res.status(400).send({
                    statusCode: 400,
                    message: err.message,
                });
            default:
                return res.status(500).send({
                    statusCode: 500,
                    message: 'Oops! try again!',
                });
        }
    }
    return next(err);
}