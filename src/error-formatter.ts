export function formatError(
  code: string,
  message: string,
  details?: unknown
) {
  const error: {
    code: string
    message: string
    details?: unknown
  } = {
    code,
    message
  }

  if (details !== undefined) {
    error.details = details
  }

  return {
    success: false,
    error
  }
}
