<script setup lang="ts">
export type TextProps = {
  title?: string
  text: string
  placeholder?: string
  class?: string
}

const props = defineProps<TextProps>()

const emit = defineEmits(['update:text'])
</script>

<template>
  <div :class="props.class">
    <label v-if="props.title" for="input" class="block text-sm/6 font-medium text-gray-900">{{ props.title }}</label>
    <div class="mt-2">
      <input type="input" name="input" id="input" v-model="props.text" @input="emit('update:text', $event.target.value)"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        :placeholder="props.placeholder" />
    </div>
  </div>
</template>
