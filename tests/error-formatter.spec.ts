import { describe, it, expect } from 'vitest'
import { formatError } from '../src/error-formatter'

describe('formatError', () => {
  it('should format error without details', () => {
    const result = formatError(
      'TEST_ERROR',
      'Something went wrong'
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: 'TEST_ERROR',
        message: 'Something went wrong'
      }
    })
  })

  it('should format error with details', () => {
    const result = formatError(
      'TEST_ERROR',
      'Something went wrong',
      { id: 1 }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: 'TEST_ERROR',
        message: 'Something went wrong',
        details: { id: 1 }
      }
    })
  })
})
