<template>
  <div class="home-container">
    <div class="search-container">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search for a cocktail..." v-model="localSearchQuery" @input="handleSearch"
          class="search-input">
      </div>
    </div>

    <div class="drinksContainer" v-if="drinks && drinks.length > 0">
      <RecipeItem class="drinkContainer" :drink="drink" v-for="drink in drinks" :key="drink.idDrink" />
    </div>

    <div class="no-results" v-else-if="localSearchQuery.length > 0">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2"></path>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
      <p>No cocktails found for "{{ localSearchQuery }}"</p>
    </div>

    <div class="start-message" v-else>
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
        </path>
      </svg>
      <p>Type something to search for cocktails</p>
    </div>
  </div>
</template>
<script>
import RecipeItem from '@/components/DrinksItem.vue';

export default {
  components: {
    RecipeItem
  },
  data() {
    return {
      drinks: [],
      localSearchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      // Handle search after a short delay to prevent too many API calls
      if (this.searchTimeout) clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.getDrinks(this.localSearchQuery);
      }, 300);
    },
    async getDrinks(query = '') {
      if (!query || query.length < 2) {
        // Require at least 2 characters for search
        this.drinks = [];
        return;
      }

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        this.drinks = data.drinks || [];
      } catch (error) {
        console.error('Error fetching drinks:', error);
        this.drinks = [];
      }
    }
  },
  created() {
    // Property to store timeout ID
    this.searchTimeout = null;
  }
}
</script>
<style scoped>
.home-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.search-container {
  width: 90%;
  max-width: 600px;
  margin: 20px auto 40px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #999;
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  font-size: 16px;
  border: none;
  border-radius: var(--border-radius);
  background-color: white;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
}

.drinksContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.drinkContainer {
  width: 100%;
}

.no-results,
.start-message {
  text-align: center;
  padding: 60px 20px;
  color: #777;
  font-size: 18px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  width: 48px;
  height: 48px;
  stroke: var(--primary-light);
  margin-bottom: 16px;
}

@media (max-width: 768px) {

  .home-container,
  .search-container {
    width: 95%;
  }

  .drinksContainer {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>