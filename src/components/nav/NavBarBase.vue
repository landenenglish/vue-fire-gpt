<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import ToggleDark from '../theme/ToggleDark.vue'

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
</script>

<template>
  <div class="card">
    <Menubar :model="generateMenuConfig(items)" class="items-center">
      <template #end>
        <ul class="flex items-center space-x-4">
          <li>
            <ToggleDark />
          </li>
        </ul>
      </template>
    </Menubar>
  </div>
</template>
