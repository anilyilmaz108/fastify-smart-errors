import { describe, it, expect } from 'vitest'
import { SmartError } from '../src/smart-error'

describe('SmartError', () => {
  it('should create SmartError with code and details', () => {
    const error = new SmartError('USER_NOT_FOUND', { id: 5 })

    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('USER_NOT_FOUND')
    expect(error.details).toEqual({ id: 5 })
  })
})
