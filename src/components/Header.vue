<template>
    <header :class="{ 'dark': isDarkMode }">
        <div class="title">COCKTAIL SEARCH</div>
        <div class="button-container">
            <router-link class="nav-link" :class="{ 'dark': isDarkMode }" to="/">
                Search
            </router-link>

            <router-link class="nav-link" :class="{ 'dark': isDarkMode }" to="/favorites">
                Favorites
            </router-link>

            <div class="theme-toggle">
                <button @click="toggleDarkMode" class="toggle-button" :class="{ 'dark': isDarkMode }">
                    <span class="toggle-icon">
                        <svg v-if="!isDarkMode" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
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
    background-color: white;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 90%;
    border-radius: var(--border-radius);
    margin: 20px auto 0;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
}

.button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.icon {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.title {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);
    letter-spacing: 1px;
}

.theme-toggle {
    margin-left: 8px;
}

.nav-link {
    background-color: transparent;
    color: var(--dark-text);
    border: none;
    padding: 8px 16px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
}

.nav-link:hover {
    background-color: var(--light-bg);
}

.nav-link.dark {
    color: var(--light-text);
}

.nav-link.dark:hover {
    background-color: var(--dark-hover);
}

/* Active link styles */
.router-link-active.nav-link {
    background-color: var(--primary-light);
    color: white;
}

.router-link-active.nav-link.dark {
    background-color: var(--primary-dark);
}

.toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.toggle-button:hover {
    background-color: var(--light-bg);
}

.toggle-button.dark:hover {
    background-color: var(--dark-hover);
}

.toggle-icon {
    font-size: 16px;
    color: #ffc107;
}

.toggle-button.dark .toggle-icon {
    color: #ffd54f;
}

@media (min-width: 768px) {
    header {
        width: 85%;
        max-width: 1200px;
    }
}

@media (max-width: 600px) {
    .title {
        font-size: 16px;
    }

    .nav-link {
        padding: 6px 12px;
        font-size: 13px;
    }
}
</style>