import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'
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

const app = initializeApp(config)
const auth = getAuth(app)

export const { isAuthenticated, user } = useAuth(auth)

export const userFirstName = computed(() => {
  const match = user.value?.displayName?.match(/(?<=\s|^)\w+(?=\s|$)/)
  return match ? match[0] : ''
})

export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())
export const signInWithGithub = () => signInWithPopup(auth, new GithubAuthProvider())
export const signInWithUsernameAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => auth.signOut()
