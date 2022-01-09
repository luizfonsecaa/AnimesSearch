<template>
  <div class="h-screen w-screen bg-gray-100 flex justify-center items-center">
    <div class="h-screen container mx-auto flex justify-center items-center flex-col">
      <h1 class="logo mb-9 two-colors text-4xl md:text-7xl">Anime frends</h1>
      <div class="w-full px-2 md:w-1/2 md:p-0">
        <SearchInput />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from '../components/SeachInput.vue'
export default {
  name: 'LayoutPage',
  components: {
    SearchInput,
  },
}
</script>

<style></style>
