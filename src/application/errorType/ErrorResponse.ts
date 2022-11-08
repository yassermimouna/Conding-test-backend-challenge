import { IErrorResponse } from "../dto/IErrorResponse";

export class ErrorResponse {
  private code: 422 | 500;
  private message: string;

  constructor(code: 422 | 500, message: string) {
    this.code = code;
    this.message = message;
  }
  public getBody(): IErrorResponse {
    return { code: this.code, message: this.message };
  }

  public getCode(): 422 | 500 {
    return this.code;
  }
}
