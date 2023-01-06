export class AppError {
  public readonly acknowledge: boolean;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.acknowledge = false;
    this.message = message;
    this.statusCode = statusCode;
  }
}
