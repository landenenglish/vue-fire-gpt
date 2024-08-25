<script setup lang="ts">
import { signOut } from '@/firebase'
import { useConfirm } from 'primevue/useconfirm'

const { require } = useConfirm()

const confirm = () => {
  require({
    header: 'Sign out',
    message: 'Are you sure you want to sign out?',
    accept: signOut,
  })
}
</script>

<template>
  <button type="button" class="topbar-item" @click="confirm()">
    <i :class="['fas', 'fa-sign-out-alt']" />
  </button>
</template>
