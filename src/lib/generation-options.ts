export type GenerationOptions = {
  jobUrl: string
  language: 'pt-br' | 'en'
  platformContent: 'linkedin' | 'github' | 'mixed'
}

export const defaultGenerationOptions: GenerationOptions = {
  jobUrl: '',
  language: 'en',
  platformContent: 'mixed',
}
