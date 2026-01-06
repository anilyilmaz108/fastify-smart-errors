import { FastifyRequest } from 'fastify'
import { Language } from './types.js'

export function resolveLanguage(
  request: FastifyRequest,
  defaultLang: Language
): Language {
  const header = request.headers['accept-language']
  if (!header) return defaultLang

  return header.split(',')[0]
}
