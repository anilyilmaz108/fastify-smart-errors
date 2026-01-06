import { describe, it, expect } from 'vitest'
import Fastify from 'fastify'
import { smartErrors } from '../src/plugin'
import { SmartError } from '../src/smart-error'

describe('fastify-smart-errors plugin', () => {

  it('should handle SmartError correctly', async () => {
    const fastify = Fastify()

    fastify.register(smartErrors, {
      defaultLang: 'en',
      errors: {
        USER_NOT_FOUND: {
          statusCode: 404,
          messages: {
            en: 'User not found',
            tr: 'Kullanıcı bulunamadı'
          }
        }
      }
    })

    fastify.get('/user', async () => {
      throw new SmartError('USER_NOT_FOUND', { id: 1 })
    })

    await fastify.ready()

    const res = await fastify.inject({
      method: 'GET',
      url: '/user'
    })

    expect(res.statusCode).toBe(404)
    expect(res.json()).toEqual({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        details: { id: 1 }
      }
    })
  })

  it('should respect accept-language header', async () => {
    const fastify = Fastify()

    fastify.register(smartErrors, {
      defaultLang: 'en',
      errors: {
        USER_NOT_FOUND: {
          statusCode: 404,
          messages: {
            en: 'User not found',
            tr: 'Kullanıcı bulunamadı'
          }
        }
      }
    })

    fastify.get('/user', async () => {
      throw new SmartError('USER_NOT_FOUND')
    })

    await fastify.ready()

    const res = await fastify.inject({
      method: 'GET',
      url: '/user',
      headers: {
        'accept-language': 'tr'
      }
    })

    expect(res.json().error.message).toBe('Kullanıcı bulunamadı')
  })
})
