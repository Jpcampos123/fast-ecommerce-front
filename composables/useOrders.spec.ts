import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useOrders } from './useOrders'
import { useFetch } from '#imports'

describe('useOrders Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and transforms orders correctly', async () => {
    const mockOrders = [
      {
        order_id: 1,
        order_date: '2023-01-01',
        order_status: 'PAID',
        cancelled_at: null,
        cancelled_reason: null,
        tracking_number: 'TRK123',
        freight: '10',
        products: [],
      },
    ]

    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockOrders),
      error: ref(null),
    }))

    const { execute, data } = useOrders('user_1')
    await execute()

    expect(data.value?.length).toBe(1)
    expect(data.value?.[0].orderId).toBe('1')
    expect(data.value?.[0].orderStatus).toBe('PAID')
  })

  it('handles fetch error correctly', async () => {
    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => {
      throw new Error('Fetch failed')
    })

    const { execute, error } = useOrders('user_1')
    await execute()

    expect(error.value).toBe('Fetch failed')
  })
})
