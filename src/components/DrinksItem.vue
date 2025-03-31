<template>
    <div class="recipe-item-wrapper">
        <router-link :to="{ name: 'DrinkDetail', params: { id: drink.idDrink } }" class="recipe-link">
            <div class="recipeItemContainer">
                <div class="image-container">
                    <img :src="drink.strDrinkThumb" class="recipe-image" alt="Cocktail image">
                </div>
                <div class="right-container">
                    <div class="drink-name">{{ drink.strDrink }}</div>
                    <div class="drink-category">{{ drink.strCategory }}</div>
                </div>
            </div>
        </router-link>
        <button @click="toggleFavorite" class="favorite-button" :class="{ 'is-favorite': isFavorite }">
            <svg class="favorite-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </button>
    </div>
</template>
<script>
export default {
    name: 'RecipeItem',
    props: {
        drink: {
            type: Object,
            required: true
        }
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
    transition: transform 0.3s ease;
}

.recipe-item-wrapper:hover {
    transform: translateY(-5px);
}

.recipe-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.recipeItemContainer {
    border: none;
    padding: 0;
    border-radius: var(--border-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    height: 100%;
}

.image-container {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.recipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.recipeItemContainer:hover .recipe-image {
    transform: scale(1.05);
}

.right-container {
    display: flex;
    flex-direction: column;
    padding: 16px;
    flex: 1;
}

.drink-name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--dark-text);
}

.drink-category {
    font-size: 12px;
    color: #777;
    background-color: #f5f5f5;
    padding: 4px 10px;
    border-radius: 30px;
    display: inline-block;
    align-self: flex-start;
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
    color: var(--primary-color);
}

.favorite-button.is-favorite .favorite-icon {
    color: var(--primary-color);
}

body.dark-mode .recipeItemContainer {
    box-shadow: var(--dark-shadow);
}
</style>