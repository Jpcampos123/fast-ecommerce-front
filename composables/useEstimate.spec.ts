import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useEstimate } from './useEstimate'
import { useFetch } from '#imports'

describe('useEstimate Composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('executes estimate successfully', async () => {
    const mockRes = {
      cart_items: [{ product_id: 1 }],
      total: '100',
    }

    // @ts-expect-error: mockImplementation exists on useFetch in tests
    useFetch.mockImplementation(() => ({
      data: ref(mockRes),
      error: ref(null),
    }))

    const { execute, data } = useEstimate()
    await execute([])

    expect(data.value?.total).toBe('100')
  })

  it('handles refresh correctly', async () => {
    const mockRes = {
      cart_items: [{ product_id: 1 }],
      total: '200',
    }

    // @ts-expect-error: mockImplementation exists on useFetch in tests
    useFetch.mockImplementation(() => ({
      data: ref(mockRes),
      error: ref(null),
    }))

    const { refresh, data } = useEstimate()
    await refresh([])

    expect(data.value?.total).toBe('200')
  })
})
