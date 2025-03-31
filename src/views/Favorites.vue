<template>
    <div class="favorites-container">
        <div class="favorites-header">
            <h1>My Favorite Drinks</h1>
            <div class="sort-controls" v-if="favorites.length > 0">
                <select v-model="sortOption" class="sort-select">
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="category">Category</option>
                </select>
            </div>
        </div>

        <div v-if="favorites.length === 0" class="no-favorites">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                </path>
            </svg>
            <p>You haven't added any favorites yet</p>
            <router-link to="/" class="back-link">Find some cocktails</router-link>
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
            favorites: [],
            sortOption: 'nameAsc'
        }
    },
    computed: {
        sortedFavorites() {
            return [...this.favorites].sort((a, b) => {
                if (this.sortOption === 'nameAsc') {
                    return a.strDrink.localeCompare(b.strDrink);
                } else if (this.sortOption === 'nameDesc') {
                    return b.strDrink.localeCompare(a.strDrink);
                } else if (this.sortOption === 'category') {
                    // First sort by category, then by name
                    const categoryCompare = a.strCategory.localeCompare(b.strCategory);
                    return categoryCompare !== 0 ? categoryCompare : a.strDrink.localeCompare(b.strDrink);
                }
                return 0;
            });
        }
    },
    methods: {
        loadFavorites() {
            this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        },
        updateFavorites(event) {
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.favorites-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.favorites-header h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0;
}

.sort-controls {
    display: flex;
    align-items: center;
}

.sort-select {
    padding: 8px 16px;
    border-radius: 30px;
    border: 1px solid #e0e0e0;
    background-color: white;
    color: var(--dark-text);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow);
}

body.dark-mode .sort-select {
    background-color: var(--dark-card);
    color: var(--light-text);
    border-color: #444;
}

.favorites-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}

.no-favorites {
    text-align: center;
    padding: 60px 20px;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #777;
}

.empty-icon {
    width: 64px;
    height: 64px;
    stroke: var(--primary-light);
    margin-bottom: 16px;
}

.back-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.back-link:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

body.dark-mode .no-favorites {
    background-color: var(--dark-card);
    box-shadow: var(--dark-shadow);
}

@media (max-width: 768px) {
    .favorites-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .favorites-list {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
}
</style>