import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'

vi.mock('#imports', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>()
  return {
    ...actual,
    useImage: vi.fn((path) => path),
    useI18n: vi.fn(() => ({
      t: (key: string) => key,
    })),
  }
})

describe('ProductCard Component', () => {
  const product = {
    name: 'Test Product',
    price: 100,
    image_path: 'test.jpg',
    quantity: 10,
    uri: 'test-product',
  }

  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: product as unknown as Record<string, unknown>,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
          'n-card': {
            template:
              '<div class="n-card"><slot /><slot name="header" /><slot name="footer" /></div>',
          },
          'n-button': {
            template: '<button><slot /></button>',
          },
          'n-text': {
            template: '<span><slot /></span>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('100,00')
  })

  it('emits addToCart event when button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: product as unknown as Record<string, unknown>,
      },
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' },
          'n-card': { template: '<div><slot /></div>' },
          'n-button': {
            template:
              '<button @click="$emit(\'click\', $event)"><slot /></button>',
          },
          'n-text': { template: '<span><slot /></span>' },
        },
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('addToCart')).toBeTruthy()
    expect(wrapper.emitted('addToCart')?.[0]).toEqual([product])
  })

  it('shows out of stock message when quantity is 0', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: { ...product, quantity: 0 } as unknown as Record<
          string,
          unknown
        >,
      },
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' },
          'n-card': { template: '<div><slot /></div>' },
          'n-button': { template: '<button><slot /></button>' },
          'n-text': { template: '<span><slot /></span>' },
        },
      },
    })

    expect(wrapper.text()).toContain('productItem.outOfStock')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
