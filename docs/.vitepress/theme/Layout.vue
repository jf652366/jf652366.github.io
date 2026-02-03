<template>
  <VPLayout>
    <div class="site-header">
      <div class="brand">
        <a href="/">jf652366</a>
      </div>
      <SearchBox />
    </div>
    <div class="site-content">
      <slot />
    </div>
    <footer class="site-footer">
      <p>© 2026 jf652366 · Generated with VitePress</p>
      <p><a href="/常用网站">常用网站</a> · <a href="/guestbook">留言</a></p>
    </footer>
  </VPLayout>
</template>

<script setup>
import VPLayout from 'vitepress/dist/client/theme-default/Layout.vue'
import SearchBox from './SearchBox.vue'
</script>

<style>
.site-header{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:1px solid #eee}
.brand a{font-weight:700}
.site-content{padding:24px}
.site-footer{padding:20px;border-top:1px solid #eee;text-align:center;color:#666}
</style>