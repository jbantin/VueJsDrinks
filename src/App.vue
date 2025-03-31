<template>
  <Header @theme-changed="handleThemeChange" />
  <router-view />
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: { Header },
  methods: {
    handleThemeChange(isDarkMode) {
      // You can do additional app-wide theme handling here if needed
      console.log('Theme changed to:', isDarkMode ? 'dark' : 'light');
    }
  }
}
</script>
<style>
/* Global dark mode styles */
body {
  transition: background-color 0.3s ease, color 0.2s ease;
}

body.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark-mode .search-input {
  background-color: #2a2a2a;
  color: #e0e0e0;
  border-color: #444;
}

body.dark-mode .recipeItemContainer {
  background-color: #1e1e1e;
  border-color: #333;
}

body.dark-mode .drink-name {
  color: #e0e0e0;
}

body.dark-mode .drink-category {
  background-color: #333;
  color: #bbb;
}

body.dark-mode .no-results,
body.dark-mode .start-message {
  background-color: #1e1e1e;
  color: #bbb;
}

body.dark-mode header {
  background-color: #333;
}

body.dark-mode .title {
  color: #e0e0e0;
}

body.dark-mode .back-button {
  color: #bbb;
}

body.dark-mode .badge {
  background-color: #444;
}

body.dark-mode .drink-detail {
  background-color: #1e1e1e;
}

body.dark-mode .drink-header {
  background-color: #252525;
}
</style>