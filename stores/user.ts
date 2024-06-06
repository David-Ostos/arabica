import type { User } from "~/interfaces/Users"

export const useUserStore = defineStore('user', () => {

  const dataUser = ref({} as User)

  return {
    dataUser
  }

})