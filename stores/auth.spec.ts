import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

// Mocking Nuxt functions
vi.mock('#imports', () => ({
  ref: (v: unknown) => ({ value: v }),
  useFetch: vi.fn(() => ({
    data: { value: { success: true } },
    pending: { value: false },
  })),
}))

// Mocking User Store
vi.mock('./user', () => ({
  useUserStore: () => ({
    getUser: vi.fn(),
  }),
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('performs login correctly', async () => {
    const store = useAuthStore()
    const result = await store.login({
      username: 'test',
      password: 'password',
    })
    expect(result?.success).toBe(true)
  })

  it('performs register correctly', async () => {
    const store = useAuthStore()
    const result = await store.register({
      name: 'Test',
      username: 'test',
      password: 'password',
      mail: 'test@example.com',
      document: '123',
      phone: '123',
    })
    expect(result?.success).toBe(true)
  })
})
