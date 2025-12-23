import { describe, it, expect, vi } from 'vitest'
import { LOCALES } from './enums'
import {
  currencyFormat,
  detectCurrencyByLocale,
  dateFormat,
  getMonthYearFromTimestamp,
  capitalizeFirstLetter,
} from './helpers'

// Mock do Nuxt imports
vi.mock('#imports', () => ({
  useLocaleFromCookie: () => 'pt-BR',
  ref: (v: unknown) => ({ value: v }),
  useRoute: () => ({ query: { p: '1' } }),
}))

describe('Helpers Utility', () => {
  describe('currencyFormat', () => {
    it('formats BRL correctly', () => {
      const result = currencyFormat(100, 'pt-BR')
      expect(result).toMatch(/R\$\s?100,00/)
    })

    it('formats USD correctly', () => {
      const result = currencyFormat(100, 'en-US')
      expect(result).toMatch(/\$100\.00/)
    })

    it('handles zero or null values', () => {
      expect(currencyFormat(0, 'pt-BR')).toMatch(/R\$\s?0,00/)
    })
  })

  describe('detectCurrencyByLocale', () => {
    it('returns BRL for pt-BR', () => {
      expect(detectCurrencyByLocale('pt-BR')).toBe('BRL')
    })
    it('returns USD for en-US', () => {
      expect(detectCurrencyByLocale('en-US')).toBe('USD')
    })
    it('defaults to BRL', () => {
      expect(detectCurrencyByLocale('unknown')).toBe('BRL')
    })
  })

  describe('dateFormat', () => {
    it('formats date correctly in pt-BR', () => {
      const date = '2023-12-25T00:00:00'
      expect(dateFormat(date, LOCALES.PT_BR)).toBe('25/12/2023')
    })
  })

  describe('getMonthYearFromTimestamp', () => {
    it('extracts month and year correctly', () => {
      const timestamp = '2023-12-25T00:00:00'
      const { month, year } = getMonthYearFromTimestamp(timestamp)
      expect(month).toBe('12')
      expect(year).toBe('2023')
    })
  })

  describe('capitalizeFirstLetter', () => {
    it('capitalizes the first letter and lowers the rest', () => {
      expect(capitalizeFirstLetter('TESTE')).toBe('Teste')
      expect(capitalizeFirstLetter('teste')).toBe('Teste')
    })
  })
})
