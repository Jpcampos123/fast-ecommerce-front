import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePaymentStatus } from './usePaymentStatus'

const mockCartStore = {
  getPixPaymentStatus: vi.fn(),
}

vi.mock('#imports', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>()
  return {
    ...actual,
    useCartStore: () => mockCartStore,
  }
})

describe('usePaymentStatus Composable', () => {
  const mockConfig = {
    onSuccess: vi.fn(),
    onError: vi.fn(),
    onTimeout: vi.fn(),
    watch: () => '123',
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('starts checking and calls onSuccess when payment is approved', async () => {
    mockCartStore.getPixPaymentStatus.mockResolvedValue({ status: 'APPROVED' })

    const { start } = usePaymentStatus(mockConfig)
    start('payment_123')

    // Run interval once
    await vi.advanceTimersByTimeAsync(1000)

    expect(mockConfig.onSuccess).toHaveBeenCalled()
  })

  it('calls onError when payment is rejected', async () => {
    mockCartStore.getPixPaymentStatus.mockResolvedValue({ status: 'REJECTED' })

    const { start } = usePaymentStatus(mockConfig)
    start('payment_123')

    await vi.advanceTimersByTimeAsync(1000)

    expect(mockConfig.onError).toHaveBeenCalled()
  })

  it('calls onTimeout after timeout period', async () => {
    mockCartStore.getPixPaymentStatus.mockResolvedValue({ status: 'PENDING' })

    const { start } = usePaymentStatus(mockConfig)
    start('payment_123')

    await vi.advanceTimersByTimeAsync(300001)

    expect(mockConfig.onTimeout).toHaveBeenCalled()
  })
})
