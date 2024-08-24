<script setup lang="ts">
import { onClickOutside, useDark, useToggle } from '@vueuse/core'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const items: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'About',
    icon: 'fas fa-info-circle',
    route: '/about',
  },
] as const

const router = useRouter()

const generateMenuConfig = (items: MenuItem[], parentRoute = ''): MenuItem[] =>
  items.map(({ route = '', label, icon, items: childItems }) => ({
    label,
    icon,
    command: route && !childItems ? () => router.push(parentRoute + route) : undefined,
    ...(childItems && {
      items: generateMenuConfig(childItems, parentRoute + route),
    }),
  }))

const showAppTheme = ref(false)

const isDark = useDark({
  valueDark: 'app-dark',
})
const toggleDark = useToggle(isDark)

const isDarkIcon = computed(() => (isDark.value ? 'pi-moon' : 'pi-sun'))

const appTheme = ref(null)

onClickOutside(appTheme, () => {
  showAppTheme.value = false
})
</script>

<template>
  <div class="card">
    <Menubar :model="generateMenuConfig(items)" class="items-center">
      <template #end>
        <!-- TODO: Put this on the sever / cookies instead of local storage -->

        <ul class="flex items-center space-x-4">
          <li>
            <button type="button" class="topbar-item" @click="toggleDark()">
              <i :class="['pi', isDarkIcon]" />
            </button>
          </li>
        </ul>
      </template>
    </Menubar>
  </div>
</template>
