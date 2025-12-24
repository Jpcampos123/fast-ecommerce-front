import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { unref, ref } from 'vue'
import { useUserStore } from './user'
import type { User } from '@/utils/types'
import { useFetch } from '#imports'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with default values', () => {
    const store = useUserStore()
    expect(unref(store.user)).toBeNull()
    expect(unref(store.authenticated)).toBe(false)
  })

  it('resets user data correctly', () => {
    const store = useUserStore()
    store.authenticated = true
    store.user = { name: 'Test' } as unknown as User
    store.reset()
    expect(unref(store.user)).toBeNull()
    expect(unref(store.authenticated)).toBe(false)
  })

  it('sets user data after getUser success', async () => {
    const mockUser = {
      name: 'John Doe',
      document: '123',
      email: 'john@example.com',
      phone: '123',
      fullName: 'John Doe Full',
      role: 'user',
      user_id: '1',
    }

    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockUser),
      error: ref(null),
    }))

    const store = useUserStore()
    await store.getUser()

    expect(unref(store.authenticated)).toBe(true)
    expect(unref(store.user)?.name).toBe('John Doe')
  })
})
