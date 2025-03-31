<template>
    <div class="recipe-item-wrapper">
        <router-link :to="{ name: 'DrinkDetail', params: { id: drink.idDrink } }" class="recipe-link">
            <div class="recipeItemContainer">
                <img :src="drink.strDrinkThumb" class="recipe-image">
                <div class="right-container">
                    <div class="drink-name">{{ drink.strDrink }}</div>
                    <div class="drink-category">{{ drink.strCategory }}</div>
                </div>
            </div>
        </router-link>
        <button @click="toggleFavorite" class="favorite-button" :class="{ 'is-favorite': isFavorite }">
            <span v-if="isFavorite">★</span>
            <span v-else>☆</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'RecipeItem',
    props: {
        drink: Object
    },
    data() {
        return {
            isFavorite: false
        }
    },
    methods: {
        toggleFavorite() {
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

            // Emit event so parent components can react if needed
            this.$emit('favorite-changed', {
                drink: this.drink,
                isFavorite: this.isFavorite
            });
        }
    },
    mounted() {
        // Check if this drink is already in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.isFavorite = favorites.some(fav => fav.idDrink === this.drink.idDrink);
    }
}
</script>

<style scoped>
.recipe-item-wrapper {
    position: relative;
}

.recipe-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.recipeItemContainer {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px;
    border-radius: 8px;
    display: flex;
    gap: 16px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.recipeItemContainer:hover {
    background-color: #f9f6f4;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-image {
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 6px;
}

.right-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding-right: 30px;
    /* Make room for the favorite button */
}

.drink-name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
}

.drink-category {
    font-size: 14px;
    color: #777;
    background-color: #f0ece8;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
}

.favorite-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
    padding: 5px;
    z-index: 2;
}

.favorite-button:hover {
    color: #f8c537;
}

.favorite-button.is-favorite {
    color: #f8c537;
}

/* Make sure the button is visible against drink images */
.favorite-button {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>