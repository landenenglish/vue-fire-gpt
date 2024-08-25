<script setup lang="ts">
import { signInWithGoogle } from '@/firebase'
import Button from 'primevue/button'
</script>

<template>
  <div class="flex items-center justify-center h-screen space-x-4">
    <Button @click="signInWithGoogle()">Sign in with Google</Button>
  </div>
</template>
