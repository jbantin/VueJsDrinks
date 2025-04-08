<template>
    <div class="page-container">
       
        <div class="drink-detail" v-if="drink">
            <div class="drink-header">
                <div class="image-container">
                    <img :src="drink.strDrinkThumb" alt="Cocktail Picture" class="drink-image">
                    <button @click="toggleFavorite" class="favorite-button" :class="{ 'is-favorite': isFavorite }">
                        <svg class="favorite-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </div>
                <div class="drink-title">
                    <h1>{{ drink.strDrink }}</h1>
                    <div class="drink-meta">
                        <span class="badge">{{ drink.strCategory }}</span>
                        <span class="badge">{{ drink.strAlcoholic }}</span>
                        <span class="badge">{{ drink.strGlass }}</span>
                    </div>
                </div>
            </div>

            <div class="drink-content">
                <div class="ingredients-section">
                    <h2>Ingredients</h2>
                    <ul class="ingredients-list">
                        <li v-for="(ingredient, index) in ingredients" :key="index">
                            <strong>{{ ingredient.name }}</strong>: {{ ingredient.measure || 'to taste' }}
                        </li>
                    </ul>
                </div>

                <div class="instructions-section">
                    <h2>Instructions</h2>
                    <p>{{ drink.strInstructions }}</p>
                </div>
            </div>
        </div>

        <div v-else class="loading">
            <p>Loading drink details...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DrinkDetail",
    data() {
        return {
            drink: null,
            isFavorite: false
        }
    },
    computed: {
        ingredients() {
            if (!this.drink) return [];

            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredientName = this.drink[`strIngredient${i}`];
                const measure = this.drink[`strMeasure${i}`];

                if (ingredientName) {
                    ingredients.push({
                        name: ingredientName,
                        measure: measure
                    });
                }
            }
            return ingredients;
        }
    },
    mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchDrinkById(id);
        }
    },
    methods: {
        async fetchDrinkById(id) {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                if (data.drinks && data.drinks.length > 0) {
                    this.drink = data.drinks[0];
                    // Check if this drink is already in favorites
                    this.checkIfFavorite();
                }
            } catch (error) {
                console.error('Error fetching drink details:', error);
            }
        },
        checkIfFavorite() {
            if (!this.drink) return;
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            this.isFavorite = favorites.some(fav => fav.idDrink === this.drink.idDrink);
        },
        toggleFavorite() {
            if (!this.drink) return;
            
            this.isFavorite = !this.isFavorite;

            // Get existing favorites from localStorage
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (this.isFavorite) {
                // Add to favorites if not already there
                if (!favorites.some(fav => fav.idDrink === this.drink.idDrink)) {
                    favorites.push(this.drink);
                }
            } else {
                // Remove from favorites
                const index = favorites.findIndex(fav => fav.idDrink === this.drink.idDrink);
                if (index !== -1) {
                    favorites.splice(index, 1);
                }
            }

            // Save updated favorites back to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }
}
</script>

<style scoped>
.page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.back-button {
    display: inline-block;
    margin-bottom: 20px;
    color: #555;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.back-button:hover {
    color: #000;
}

.drink-detail {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.drink-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f8f8;
    text-align: center;
}

@media (min-width: 768px) {
    .drink-header {
        flex-direction: row;
        text-align: left;
        gap: 30px;
    }
}

.drink-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
}

.drink-title {
    flex: 1;
}

.drink-title h1 {
    margin-top: 0;
    margin-bottom: 10px;
}

.drink-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.badge {
    background-color: #dfd8d1;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
}

.drink-content {
    padding: 20px;
}

.ingredients-section,
.instructions-section {
    margin-bottom: 30px;
}

.ingredients-list {
    list-style-type: none;
    padding: 0;
}

.ingredients-list li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #777;
}
.image-container {
    position: relative;
    width: 200px;
    height: 200px;
}

.drink-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
}

.favorite-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-icon {
    width: 20px;
    height: 20px;
    color: #ccc;
    transition: all 0.3s ease;
}

.favorite-button:hover .favorite-icon {
    color: var(--primary-color, #e53935);
}

.favorite-button.is-favorite .favorite-icon {
    color: var(--primary-color, #e53935);
}
</style>