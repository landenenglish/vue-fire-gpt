<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBarBase />
  <RouterView />
</template>

<style lang="scss">
body {
  @apply dark:bg-gray-800 dark:text-white;
}
</style>
