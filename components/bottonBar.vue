<template>
    <div class="fixed z-[999999999] w-full bottom-0">
        <div class="px-7 bg-white shadow-lg rounded-t-2xl">
            <div class="flex">
                <div v-for="item, index in items" :key="index" class="flex-1 group">
                    <NuxtLink :to="item.link"
                        class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <UIcon class="h-8 w-8" :name="item.icon" dynamic />
                            <span class="block text-xs pb-2">{{ item.label }}</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </NuxtLink>
                </div>
                <div class="flex-1 group">
                    <a href="#"
                        class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <UIcon class="h-8 w-8" name="i-ic-baseline-house" dynamic />

                            <span class="block text-xs pb-2">Explore</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>
                <div class="flex-1 group">
                    <a href="#"
                        class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                        <span class="block px-1 pt-1 pb-1">
                            <UIcon class="h-8 w-8" name="i-ic-baseline-house" dynamic />

                            <span class="block text-xs pb-2">Search</span>
                            <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                        </span>
                    </a>
                </div>

                <div v-if="useUser.logged">
                    <div class="flex-1 group">
                        <a href="#"
                            class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                            <span class="flex flex-col px-1 pt-1 pb-1 justify-center">
                                <Avatar size="h-8 w-8 m-auto" />
                                <span class="block text-xs pb-2">Settings</span>
                                <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                            </span>
                        </a>
                    </div>
                </div>

                <div v-else>
                    <div class="flex-1 group">
                        <a href="#"
                            class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                            <span class="block px-1 pt-1 pb-1">
                                <UIcon class="h-8 w-8" name="i-material-symbols-account-circle" dynamic />

                                <span class="block text-xs pb-2">Settings</span>
                                <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                            </span>
                        </a>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();

const items = {
    home: {
        label: 'Home',
        icon: 'i-ic-baseline-house',
        link: '/'
    }
}

</script>

<style></style>
