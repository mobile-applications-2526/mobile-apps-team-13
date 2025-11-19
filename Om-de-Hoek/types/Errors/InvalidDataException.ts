import {CustomError} from "@/types/Errors/CustomError";

const DEFAULT_STATUS_CODE = 400

export class InvalidDataException extends CustomError{
    _field: string;

    constructor(
        message: string = "Invalid Data Provided",
        statusCode = DEFAULT_STATUS_CODE,
        field: string = ""
    ) {
        super(message, statusCode);
        this._field = field;
    }

    get message(): string {
        return this._message;
    }

    get statusCode(): number {
        return this._statusCode ?? DEFAULT_STATUS_CODE;
    }

    get field(): string {
        return this._field;
    }

    toString(): () => string {
        return () => `Invalid data: \"${this.message}\" in het veld ${this.field} (Status Code: ${this.statusCode})`;
    }
}