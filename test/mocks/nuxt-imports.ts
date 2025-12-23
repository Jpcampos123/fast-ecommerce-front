import { vi } from 'vitest'
import { ref, computed, unref, reactive, isRef } from 'vue'
import { storeToRefs } from 'pinia'

export { ref, computed, unref, reactive, isRef, storeToRefs }

export const useCookie = vi.fn(
  (_name: string, options?: { default?: () => unknown }) => {
    const defaultValue = options?.default ? options.default() : ''
    return ref(unref(defaultValue))
  },
)

export const useFetch = vi.fn((_url: string, _options?: unknown) => {
  return {
    data: ref(null),
    pending: ref(false),
    error: ref(null),
  }
})

export const useNuxtApp = vi.fn(() => ({
  $config: {
    public: {
      serverUrl: 'https://api.example.com',
      apiKey: 'test-key',
    },
  },
}))

export const useState = vi.fn((key, cb) => ref(cb ? cb() : null))
export const useRoute = vi.fn(() => ({ query: {}, params: {} }))
export const useLocaleFromCookie = vi.fn(() => 'pt-BR')
export const useRuntimeConfig = vi.fn(() => ({
  public: {
    serverUrl: 'https://api.example.com',
  },
}))

export const useI18n = vi.fn(() => ({
  t: (key: string) => key,
  locale: ref('pt-BR'),
}))

export const onMounted = vi.fn((cb) => cb())
export const onUnmounted = vi.fn()
export const onBeforeMount = vi.fn()
export const onBeforeUnmount = vi.fn()

export const useCartStore = vi.fn(() => ({
  cart: ref({
    uuid: '',
    cart_items: [],
    subtotal: '0',
    total: '0',
    zipcode: '',
    discount: '0',
    freight_product_code: '',
  }),
  coupon: ref(''),
  affiliate: ref(''),
  shippingAddress: ref({}),
  getPixPaymentStatus: vi.fn(),
}))
export const useUserStore = vi.fn(() => ({}))
export const useAuthStore = vi.fn(() => ({}))
