import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
import { computed } from 'vue'

const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(config)

export const auth = getAuth(firebaseApp)

export const { isAuthenticated, user } = useAuth(auth)

export const hasAuthStateChanged = ref(false)

onAuthStateChanged(auth, () => {
  hasAuthStateChanged.value = true
})

export const userFirstName = computed(() => {
  const match = user.value?.displayName?.match(/(?<=\s|^)\w+(?=\s|$)/)
  return match ? match[0] : ''
})

export const signOut = () => auth.signOut()
