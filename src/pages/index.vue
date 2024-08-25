<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'

const input = ref('')

const { data, invoke, isLoading } = useAxios(
  (prompt: string) => api.post<{ response: string }>('chatbot/ask', { prompt }),
  {
    resetOnInvoke: true,
  }
)

const askQuestion = () => {
  if (!input.value) return
  invoke(input.value)
  input.value = ''
}

const responseText = computed(() => data.value?.response ?? '')
</script>

<template>
  <div class="flex flex-col justify-between full-height p-4">
    <div class="w-full max-w-md mx-auto">
      <Skeleton v-if="isLoading" width="100%" height="150px"></Skeleton>
      <Markdown v-else :markdown="responseText" />
    </div>

    <div class="w-full max-w-md mx-auto mt-4">
      <div class="flex space-x-2">
        <InputText
          v-model="input"
          placeholder="Enter a prompt"
          class="w-full"
          @keydown.enter="askQuestion"
        />
        <Button :disabled="isLoading || !input" class="flex-shrink-0" @click="askQuestion">
          Send
        </Button>
      </div>
    </div>
  </div>
</template>
