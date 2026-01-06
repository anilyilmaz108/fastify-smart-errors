export class SmartError extends Error {
  code: string
  details?: unknown

  constructor(code: string, details?: unknown) {
    super(code)
    this.code = code
    this.details = details
  }
}
