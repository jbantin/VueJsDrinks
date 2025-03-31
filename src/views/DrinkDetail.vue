<template>
    <div class="page-container">
        <router-link :to="{ name: 'home' }" class="back-button">
            &larr; Back to Search
        </router-link>

        <div class="drink-detail" v-if="drink">
            <div class="drink-header">
                <img :src="drink.strDrinkThumb" alt="Cocktail Picture" class="drink-image">
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
            drink: null
        }
    },
    computed: {
        ingredients() {
            if (!this.drink) return [];

            const ingredients = [];
            // TheCocktailDB stores ingredients in numbered properties (strIngredient1, strIngredient2, etc.)
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
                }
            } catch (error) {
                console.error('Error fetching drink details:', error);
            }
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
</style>