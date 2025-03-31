<template>
    <header>
        <div class="title">COCKTAIL SEARCH</div>
        <div class="button-container">

            <router-link class="link" :class="{ 'dark': isDarkMode }" to="/">
                <button :class="{ 'dark': isDarkMode }">Search</button>
            </router-link>

            <router-link class="link" :class="{ 'dark': isDarkMode }" to="/favorites">
                <button :class="{ 'dark': isDarkMode }">Favorites</button>
            </router-link>
            <div class="theme-toggle">
                <button @click="toggleDarkMode" class="toggle-button" :class="{ 'dark': isDarkMode }">
                    <span class="toggle-icon">
                        <img v-if="!isDarkMode" src="@/assets/sun.svg" alt="Light mode" class="icon">
                        <img v-else src="@/assets/moon.svg" alt="Dark mode" class="icon">
                    </span>

                </button>
            </div>
        </div>

    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            isDarkMode: false
        }
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode', this.isDarkMode);
            localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
            this.$emit('theme-changed', this.isDarkMode);
        }
    },
    mounted() {
        // Check if user had dark mode enabled previously
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'enabled') {
            this.isDarkMode = true;
            document.body.classList.add('dark-mode');
        }
    }
}
</script>

<style scoped>
header {
    background-color: #dfd8d1;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 90%;
    border-radius: 8px;
    margin: 20px auto 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.icon {
    width: 18px;
    height: 18px;
    display: block;
}

.title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
}

.theme-toggle {
    margin-left: auto;
}

.link {
    background-color: #f0f0f0;
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-decoration: none;
}

.link button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    color: #333;
    font-weight: 500;
}

.link.dark {
    background-color: #444;
}

.link.dark button {
    color: white;
}

/* Active link styles */
.router-link-active.link {
    background-color: #dfd8d1;
}

.router-link-active.link.dark {
    background-color: #666;
}

.link:hover {
    background-color: #e0e0e0;
}

.link.dark:hover {
    background-color: #555;
}

.toggle-button {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border: none;
    border-radius: 20px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-button:hover {
    background-color: #e0e0e0;
}

.toggle-button.dark {
    background-color: #999;
    color: white;
}

.toggle-button.dark:hover {
    background-color: #aaa;
}

.toggle-icon {
    /* margin-right: 6px; */
    font-size: 16px;
}

.toggle-text {
    font-weight: 500;
    font-size: 14px;
}

@media (min-width: 768px) {
    header {
        width: 80%;
        max-width: 1000px;
    }
}
</style>