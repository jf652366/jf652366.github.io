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
import FlexSearch from 'flexsearch'

const q = ref('')
const results = ref([])
let index

async function loadIndex() {
  try {
    const res = await fetch('/search-index.json')
    const docs = await res.json()
    // build a simple document index
    index = new FlexSearch.Document({
      document: {
        id: 'url',
        index: ['title', 'body', 'tags'],
        store: ['title', 'url']
      }
    })
    for (const d of docs) index.add(d)
  } catch (e) {
    console.warn('failed to load search index', e)
  }
}

loadIndex()

function onInput() {
  if (!q.value || !index) {
    results.value = []
    return
  }
  const res = index.search(q.value, { enrich: true, limit: 10 })
  // merge results from different fields
  const seen = new Map()
  for (const r of res) {
    for (const item of r.result) {
      if (!seen.has(item)) seen.set(item, index.store[item])
    }
  }
  results.value = Array.from(seen.values()).slice(0, 10)
}
</script>

<style scoped>
.search-box { position: relative }
.search-box input { width: 200px; padding: 6px }
.search-box ul { position: absolute; left: 0; top: 36px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,.1); list-style: none; padding: 8px; margin:0; width:260px }
.search-box li { padding: 4px 6px }
.search-box a { color: inherit; text-decoration: none }
</style>