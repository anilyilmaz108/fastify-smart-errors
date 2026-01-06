import { FastifyPluginAsync } from 'fastify'
import { SmartErrorsOptions } from './types.js'
import { SmartError } from './smart-error.js'
import { formatError } from './error-formatter.js'
import { resolveLanguage } from './language.js'

export const smartErrors: FastifyPluginAsync<SmartErrorsOptions> =
  async (fastify, options) => {

    const {
      errors,
      defaultLang = 'en',
      env = 'production'
    } = options

    fastify.setErrorHandler((error, request, reply) => {

      if (error instanceof SmartError) {
        const def = errors[error.code]

        if (!def) {
          reply.status(500).send(formatError(
            'UNKNOWN_ERROR',
            'Unknown error'
          ))
          return
        }

        const lang = resolveLanguage(request, defaultLang)
        const message =
          def.messages[lang] ?? def.messages[defaultLang]

        reply.status(def.statusCode).send(
          formatError(
            error.code,
            message,
            error.details
          )
        )
        return
      }

      // Validation errors (Fastify / Ajv)
      if ((error as any).validation) {
        reply.status(400).send(formatError(
          'VALIDATION_ERROR',
          'Validation failed',
          env === 'development' ? (error as any).validation : undefined
        ))
        return
      }

      // Unknown error
      reply.status(500).send(formatError(
        'INTERNAL_SERVER_ERROR',
        'Internal server error',
        env === 'development' ? error : undefined
      ))
    })
  }
