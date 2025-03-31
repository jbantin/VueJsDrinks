<template>
  <div id="app">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="page-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
:root {
  --primary-color: #ff6b6b;
  --primary-light: #ffaaa5;
  --primary-dark: #d14d4d;
  --accent-color: #4ecdc4;
  --light-bg: #eeeeee;
  --dark-bg: #18191a;
  --dark-card: #242526;
  --dark-hover: #323436;
  --light-text: #f0f0f0;
  --dark-text: #333;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --dark-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  --border-radius: 12px;
}

body {
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--light-bg);
  color: var(--dark-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode {
  background-color: var(--dark-bg);
  color: var(--light-text);
}

body.dark-mode .search-input {
  background-color: var(--dark-card);
  color: var(--light-text);
  border-color: #444;
}

body.dark-mode .recipeItemContainer {
  background-color: var(--dark-card);
  border-color: #444;
}

body.dark-mode .drink-name {
  color: var(--light-text);
}

body.dark-mode .drink-category {
  background-color: #3a3b3c;
  color: #ddd;
}

body.dark-mode .no-results,
body.dark-mode .start-message {
  background-color: var(--dark-card);
  color: #bbb;
}

body.dark-mode header {
  background-color: var(--dark-card);
}

body.dark-mode .title {
  color: var(--light-text);
}

body.dark-mode .back-button {
  color: #bbb;
}

body.dark-mode .badge {
  background-color: #3a3b3c;
}

body.dark-mode .drink-detail {
  background-color: var(--dark-card);
}

body.dark-mode .drink-header {
  background-color: #323436;
}

/* Page transitions */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>