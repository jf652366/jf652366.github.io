<template>
  <div class="search-box">
    <input v-model="q" placeholder="搜索文章..." @input="onInput" />
    <ul v-if="results.length">
      <li v-for="r in results" :key="r.url">
        <a :href="r.url">{{ r.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Fuse from 'fuse.js'

const q = ref('')
const results = ref([])
let fuse

async function loadIndex() {
  try {
    const res = await fetch('/search-index.json')
    const index = await res.json()
    fuse = new Fuse(index, { keys: ['title', 'body', 'tags'], threshold: 0.4 })
  } catch (e) {
    console.warn('failed to load search index', e)
  }
}

loadIndex()

function onInput() {
  if (!q.value || !fuse) {
    results.value = []
    return
  }
  results.value = fuse.search(q.value).slice(0, 10).map(r => r.item)
}
</script>

<style scoped>
.search-box { position: relative }
.search-box input { width: 200px; padding: 6px }
.search-box ul { position: absolute; left: 0; top: 36px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,.1); list-style: none; padding: 8px; margin:0; width:260px }
.search-box li { padding: 4px 6px }
.search-box a { color: inherit; text-decoration: none }
</style>