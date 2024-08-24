<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark({
  valueDark: 'app-dark',
})

const toggleDark = useToggle(isDark)

const icon = computed(() => (isDark.value ? 'pi-moon' : 'pi-sun'))
</script>

<template>
  <button type="button" class="topbar-item" @click="toggleDark()">
    <i :class="['pi', icon]" />
  </button>
</template>
