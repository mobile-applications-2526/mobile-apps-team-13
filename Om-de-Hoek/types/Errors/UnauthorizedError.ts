import {CustomError} from "@/types/Errors/CustomError";

export class UnauthorizedError extends CustomError {
    _DEFAULT_STATUS_CODE: number = 401;

    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }

    get message(): string {
        return this._message;
    }

    get statusCode(): number {
        return this._statusCode ?? this._DEFAULT_STATUS_CODE;
    }

    toString(): () => string {
        return () => `UnauthorizedError: ${this._message} (Status Code: ${this._statusCode})`;
    }
}