<script setup lang="ts">
import { signOut } from '@/firebase'
</script>

<template>
  <button type="button" class="topbar-item" @click="signOut()">
    <i :class="['fas', 'fa-sign-out-alt']" />
  </button>
</template>

<style lang="scss">
//
</style>
