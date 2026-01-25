import { transliterate } from 'transliteration'

export const generateSlug = (text: string): string => {
  return transliterate(text.toLocaleLowerCase())
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
