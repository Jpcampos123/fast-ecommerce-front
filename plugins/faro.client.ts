import { initializeFaro } from '@grafana/faro-web-sdk'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const faro = initializeFaro({
    url: 'https://alloy.singularjourney.host/collect',
    app: { name: 'gattorosa-front-ecommerce', version: '1.0.0' },
  })

  nuxtApp.provide('faro', faro)
})
