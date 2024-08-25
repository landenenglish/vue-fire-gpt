<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isAuthenticated } from '@/firebase'
import ConfirmDialog from 'primevue/confirmdialog'
import { hasAuthStateChanged } from '@/firebase'

onMounted(setAppHeight)
</script>

<template>
  <Navbar />

  <ConfirmDialog id="confirm" />

  <RouterView v-if="isAuthenticated" />

  <SignInPage v-else-if="hasAuthStateChanged" />
</template>
