import { describe, it, expect } from 'vitest'
import { useLocale } from './useLocale'

describe('useLocale Composable', () => {
  it('detects initial locale from cookie', () => {
    const { locale } = useLocale()
    expect(locale.value).toBe('br')
  })

  it('updates locale correctly', () => {
    const { locale, setLocale } = useLocale()
    setLocale('us')
    expect(locale.value).toBe('us')
  })
})
