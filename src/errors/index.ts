export class ServiceError extends Error {
  constructor(
    public errorCode?: string,
    message: string = 'Something went wrong'
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error') {
    super(message);
    this.name = 'NetworkError';
  }
}
