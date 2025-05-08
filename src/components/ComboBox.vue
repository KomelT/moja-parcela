<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

export type ComboBoxProps = {
  options: { id: number; name: string }[]
  selected: { id: number; name: string } | null
  title?: string
  class?: string
};

const props = defineProps<ComboBoxProps>()

const emit = defineEmits(['update:selected'])

const query = ref('')
const selectedOption = ref(null)
const filteredOptions = computed(() =>
  query.value.length < 2
    ? []
    : props.options.filter((option) => {
      return option.name.toLowerCase().includes(query.value.toLowerCase())
    }).sort((a, b) => a.name.localeCompare(b.name))
)
const comboboxUpdate = (option: { id: string; name: string }) => {
  emit('update:selected', option)
}
</script>

<template>
  <Combobox as="div" v-model="selectedOption" @update:modelValue="comboboxUpdate" :class="props.class">
    <ComboboxLabel v-if="props.title" class="block text-sm/6 font-medium text-gray-900">{{ props.title }}
    </ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
        class="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        @change="query = $event.target.value" @blur="query = ''" :display-value="(option) => option?.name" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredOptions.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="option in filteredOptions" :key="option.id" :value="option" as="template"
          v-slot="{ active, selected }">
          <li
            :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option.name }} {{ option.id }}
            </span>

            <span v-if="selected"
              :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="size-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>