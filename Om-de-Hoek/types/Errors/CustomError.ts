export abstract class CustomError extends Error {
    _message: string;
    _statusCode?: number | undefined;

    constructor(message: string, statusCode: number | undefined = undefined) {
        super(message);
        this._message = message;
        this._statusCode = statusCode;
    }

    get message(): string {
        return this._message;
    }

    get statusCode(): number | undefined {
        return this._statusCode;
    }

    toString(): () => string {
        return () => `CustomError: ${this._message}` + (this._statusCode ? ` (Status Code: ${this._statusCode})` : '');
    }
}