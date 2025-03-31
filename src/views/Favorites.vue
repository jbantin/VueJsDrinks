<template>
    <div class="favorites-container">
        <h1>My Favorite Drinks</h1>

        <div v-if="favorites.length === 0" class="no-favorites">
            You haven't added any favorites yet.
        </div>

        <div v-else class="favorites-list">
            <RecipeItem v-for="drink in sortedFavorites" :key="drink.idDrink" :drink="drink"
                @favorite-changed="updateFavorites" />
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
            favorites: []
        }
    },
    computed: {
        sortedFavorites() {
            // Create a new sorted array without modifying the original
            return [...this.favorites].sort((a, b) => {
                return a.strDrink.localeCompare(b.strDrink);
            });
        }
    },
    methods: {
        loadFavorites() {
            this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        },
        updateFavorites(event) {
            // If a drink was removed from favorites, refresh the list
            if (!event.isFavorite) {
                this.loadFavorites();
            }
        }
    },
    mounted() {
        this.loadFavorites();
    }
}
</script>

<style scoped>
.favorites-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.favorites-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.no-favorites {
    text-align: center;
    padding: 40px;
    background-color: #f9f6f4;
    border-radius: 8px;
    margin-top: 20px;
    color: #777;
}
</style>