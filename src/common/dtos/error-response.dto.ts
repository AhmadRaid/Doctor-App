export class ErrorResponse {
  constructor(
    public message: string,
    public error: string,
    public statusCode: number,
  ) {}
}
