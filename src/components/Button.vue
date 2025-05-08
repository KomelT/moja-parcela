<script setup lang="ts">
export type ButtonProps = {
  text: string
  onClick: () => void
  class?: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <button type="button" @click="props.onClick"
    :class="['rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500', props.class]">{{
      props.text }}</button>
</template>

<style scoped>
button {
  background-color: oklch(58.5% 0.233 277.117) !important;
}
</style>