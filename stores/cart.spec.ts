import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { unref, ref } from 'vue'
import { useCartStore } from './cart'
import type { CartItem } from '@/utils/types'
import { useFetch } from '#imports'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with default values', () => {
    const store = useCartStore()
    expect(unref(store.cart)).toBeDefined()
    expect(unref(store.cart).uuid).toBe('')
  })

  it('calculates freight correctly', () => {
    const store = useCartStore()
    store.calculateFreight('12345', 'PAC')
    expect(unref(store.cart).zipcode).toBe('12345')
  })

  it('adds item to cart (mocking successful response)', async () => {
    const store = useCartStore()
    const mockCart = {
      uuid: 'uuid-123',
      cart_items: [{ product_id: 1, name: 'Product 1' }],
    }
    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockCart),
      error: ref(null),
    }))

    await store.addToCart({ product_id: 1 } as unknown as CartItem)
  })

  it('sets affiliate correctly', () => {
    const store = useCartStore()
    store.setAffiliate('aff-1')
    expect(unref(store.affiliate)).toBe('aff-1')
  })

  it('clears coupon', () => {
    const store = useCartStore()
    store.addCoupon('TEST')
    expect(unref(store.coupon)).toBe('TEST')
    store.clearDiscount()
    expect(unref(store.cart).discount).toBe('0')
  })

  it('adds Pix payment method', async () => {
    const store = useCartStore()
    const mockRes = {
      success: true,
      data: {
        pix_qr_code: 'qr-code',
        pix_payment_id: 123,
      },
    }
    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockRes),
      error: ref(null),
    }))

    await store.addPixPaymentMethod()
    expect(unref(store.payment).pix_qr_code).toBe('qr-code')
  })

  it('gets Pix payment status', async () => {
    const store = useCartStore()
    const mockRes = {
      success: true,
      data: {
        status: 'APPROVED',
      },
    }
    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockRes),
      error: ref(null),
    }))

    const status = await store.getPixPaymentStatus('id-123')
    expect(status?.status).toBe('APPROVED')
  })

  it('estimates order', async () => {
    const store = useCartStore()
    const mockRes = {
      total: '100',
      subtotal: '90',
      cart_items: [],
      discount: '0',
      zipcode: '',
      freight_product_code: '',
    }
    // @ts-expect-error: mockImplementationOnce exists on useFetch in tests
    useFetch.mockImplementationOnce(() => ({
      data: ref(mockRes),
      error: ref(null),
    }))

    const result = await store.estimate()
    expect(result.total).toBe('100')
  })
})
