<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isAuthenticated } from '@/firebase'
</script>

<template>
  <Navbar />
  <RouterView v-if="isAuthenticated" />
  <SignInPage v-else />
</template>
