import { useUserStore } from '../stores/user';

const useUser = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
})
