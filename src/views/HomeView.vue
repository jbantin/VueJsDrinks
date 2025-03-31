<template>
  <div class="home-container">
    <div class="search-container">
      <input type="text" placeholder="Nach Cocktails suchen..." v-model="localSearchQuery" @input="handleSearch"
        class="search-input">
    </div>

    <div class="drinksContainer" v-if="drinks && drinks.length > 0">
      <RecipeItem class="drinkContainer" :drink="drink" v-for="drink in drinks" :key="drink.idDrink" />
    </div>

    <div class="no-results" v-else-if="localSearchQuery.length > 0">
      Keine Getränke gefunden
    </div>

    <div class="start-message" v-else>
      Geben Sie einen Suchbegriff ein, um Cocktails zu finden
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
      this.getDrinks(this.localSearchQuery);
    },
    async getDrinks(query = '') {
      if (!query) {
        this.drinks = [];
        return;
      }

      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.drinks = data.drinks || [];
      } catch (error) {
        console.error('Fehler beim Abrufen der Drinks:', error);
        this.drinks = [];
      }
    }
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
  margin: 0 auto 30px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #dfd8d1;
  border-radius: 8px;
  background-color: #fcfcfc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #bda899;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.drinksContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.drinkContainer {
  min-width: 300px;
  max-width: 400px;
  margin: 10px;
  flex: 1;
  transition: transform 0.2s ease;
}

.drinkContainer:hover {
  transform: translateY(-5px);
}

.no-results,
.start-message {
  text-align: center;
  padding: 40px;
  color: #777;
  font-size: 18px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .home-container {
    width: 95%;
  }

  .search-container {
    width: 95%;
  }

  .drinkContainer {
    min-width: 100%;
  }
}
</style>