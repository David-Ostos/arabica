export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetchProfile } = useProfile()

  if (to.params.id) {
    await fetchProfile(to.params.id as string)
  }
})