export type Language = 'tr' | 'en' | string

export interface ErrorDefinition {
  statusCode: number
  messages: Record<Language, string>
}

export type ErrorRegistry = Record<string, ErrorDefinition>

export interface SmartErrorsOptions {
  errors: ErrorRegistry
  defaultLang?: Language
  env?: 'development' | 'production'
}
