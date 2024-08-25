<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { marked } from 'marked'

interface Props {
  markdown: string
}

const props = defineProps<Props>()

const markdown = computed(() => marked.parse(props.markdown ?? ''))
</script>

<template>
  <div v-html="markdown" />
</template>
