<template>
  <div v-if="useUser.logged" class=" flex flex-col justify-between ">
    <div>
      <div v-for="container, index in linksMobile " :key="index" class="mb-2 border-b pb-2  ">

        <div v-for="item, index in container" :key="index">
          <NuxtLink :to="item.to">
            <div
              :class="['flex justify-between rounded-xl  p-1', item.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
              <div class="flex items-center gap-2">
                <UAvatar v-if="item.avatar" v-bind="item.avatar" size="2xs" loading="lazy" />
                <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" />
                <p :class="['truncate capitalize  text-sm']">{{ item.label }}</p>
              </div>
              <UBadge v-if="item.badge" color="white" variant="solid">{{ item.badge }}</UBadge>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>

    <div class="mt-8 flex flex-col w-full items-center gap-4 ">
      <UButton block to="/auth/login">
        Inicia Seción
      </UButton>
      <UDivider label="O" />
      <UButton color="stone" variant="outline" block to="/auth/register">
        Registrate
      </UButton>
    </div>

  </div>
</template>

<script lang="ts" setup>

const useUser = useUserStore()

interface LinksMobile {
  label: string,
  avatar?: {
    src: string
  },
  badge?: number,
  icon?: string,
  to?: string
}
const linksMobile: LinksMobile[][] = [
  [{
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Sobre nosotros',
    icon: 'i-heroicons-heart',
    to: "/about"
  }, {
    label: "Lotes de café",
    to: "/lotes",
    icon: 'i-heroicons-chart-bar',
  }],
  [{
    label: "Preguntas Frecuentes",
    icon: "i-heroicons-question-mark-circle",
    to: "ayuda/faq",
  },
  {
    label: "blog",
    icon: "i-heroicons-newspaper",
    to: "/blog",
  },]
]

</script>

<style></style>