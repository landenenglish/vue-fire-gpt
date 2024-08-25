<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import Menubar from 'primevue/menubar'
import { isAuthenticated, userFirstName } from '@/firebase'

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
    <Menubar :model="isAuthenticated ? generateMenuConfig(items) : []" class="items-center menubar">
      <template #end>
        <ul class="flex items-center space-x-4 mr-2">
          <li v-if="userFirstName">
            {{ userFirstName }}
          </li>
          <li>
            <ToggleDark />
          </li>
          <li v-if="isAuthenticated">
            <SignOutIcon />
          </li>
        </ul>
      </template>
    </Menubar>
  </div>
</template>

<style lang="scss">
.menubar {
  border-radius: 0 0 0.3rem 0.3rem;
}
</style>
