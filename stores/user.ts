import { defineStore } from 'pinia'
import { ref, useFetch, unref } from '#imports'
import type { User } from '@/utils/types'

interface IDataUser {
  name: string
  document: string
  email: string
  phone: string
  fullName: string
  role: string | null
  userId: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<IDataUser | null>(null)
  const authenticated = ref(false)
  const pending = ref(false)

  async function getUser() {
    pending.value = true

    const { data: responseData, error } = await useFetch<User | undefined>(
      '/api/auth/user',
    )

    const responseDataValue = unref(responseData) as User

    if (unref(error)) {
      pending.value = false
      user.value = null
      authenticated.value = false
      return
    }

    if (responseDataValue) {
      user.value = {
        name: responseDataValue.name,
        document: responseDataValue.document,
        email: responseDataValue.email,
        phone: responseDataValue.phone,
        fullName: responseDataValue.fullName,
        role: responseDataValue.role,
        userId: responseDataValue.user_id?.toString() || '',
      }
      authenticated.value = true
    }

    pending.value = false
  }

  function reset() {
    user.value = null
    authenticated.value = false
  }

  return {
    authenticated,
    pending,
    user,
    getUser,
    reset,
  }
})
