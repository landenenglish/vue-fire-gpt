<script setup lang="ts">
import 'firebaseui/dist/firebaseui.css'
import { onMounted } from 'vue'
import { auth } from '@/firebase'
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'

const uiConfig = {
  signInSuccessUrl: '/',
  signInFlow: 'popup',
  signInOptions: [EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD, GoogleAuthProvider.PROVIDER_ID],
}

const authUI = new firebaseui.auth.AuthUI(auth)

onMounted(() => authUI.start('#firebaseui-auth-container', uiConfig))
onUnmounted(() => authUI.delete())
</script>

<template>
  <div class="sign-in-page mt-5">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
