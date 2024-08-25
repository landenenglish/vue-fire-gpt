<script setup lang="ts">
import { signIn } from '@/firebase'
import Button from 'primevue/button'
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Button @click="signIn">Sign in with Google</Button>
  </div>
</template>

<style lang="scss">
//
</style>
