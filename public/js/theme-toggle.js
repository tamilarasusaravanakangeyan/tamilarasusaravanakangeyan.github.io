/**
 * Theme Toggle JavaScript Module
 * Handles dark/light mode switching with system preference detection
 */

class ThemeManager {
  constructor() {
    this.storageKey = 'theme';
    this.themes = {
      LIGHT: 'light',
      DARK: 'dark',
      SYSTEM: 'system'
    };
    
    this.desktopToggle = document.getElementById('theme-toggle');
    this.mobileToggle = document.getElementById('mobile-theme-toggle');
    
    this.init();
  }
  
  init() {
    // Initialize theme on page load
    this.initializeTheme();
    
    // Setup event listeners
    this.setupToggleListeners();
    
    // Listen for system theme changes
    this.setupSystemThemeListener();
  }
  
  /**
   * Initialize theme based on stored preference or system preference
   */
  initializeTheme() {
    const storedTheme = localStorage.getItem(this.storageKey);
    const systemTheme = this.getSystemTheme();
    
    let currentTheme;
    
    if (storedTheme && Object.values(this.themes).includes(storedTheme)) {
      currentTheme = storedTheme === this.themes.SYSTEM ? systemTheme : storedTheme;
    } else {
      currentTheme = systemTheme;
      localStorage.setItem(this.storageKey, this.themes.SYSTEM);
    }
    
    this.applyTheme(currentTheme);
    this.updateToggleStates(currentTheme);
  }
  
  /**
   * Get system theme preference
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.themes.DARK;
    }
    return this.themes.LIGHT;
  }
  
  /**
   * Setup toggle button event listeners
   */
  setupToggleListeners() {
    if (this.desktopToggle) {
      this.desktopToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
      
      // Add keyboard support
      this.desktopToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
    
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
      
      // Add keyboard support
      this.mobileToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }
  
  /**
   * Setup system theme change listener
   */
  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        const storedTheme = localStorage.getItem(this.storageKey);
        
        // Only update if user hasn't set a manual preference
        if (storedTheme === this.themes.SYSTEM || !storedTheme) {
          const newTheme = e.matches ? this.themes.DARK : this.themes.LIGHT;
          this.applyTheme(newTheme);
          this.updateToggleStates(newTheme);
        }
      });
    }
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === this.themes.LIGHT ? this.themes.DARK : this.themes.LIGHT;
    
    this.applyTheme(newTheme);
    this.updateToggleStates(newTheme);
    
    // Store user preference (not system)
    localStorage.setItem(this.storageKey, newTheme);
    
    // Announce theme change for screen readers
    this.announceThemeChange(newTheme);
    
    // Dispatch custom event
    this.dispatchThemeChangeEvent(newTheme);
  }
  
  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Add transition class temporarily for smooth theme switching
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  }
  
  /**
   * Update toggle button states and labels
   */
  updateToggleStates(theme) {
    const isLight = theme === this.themes.LIGHT;
    const label = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    const text = isLight ? 'Dark Mode' : 'Light Mode';
    
    // Update desktop toggle
    if (this.desktopToggle) {
      this.desktopToggle.setAttribute('aria-label', label);
      const toggleText = this.desktopToggle.querySelector('.theme-toggle-text');
      if (toggleText) {
        toggleText.textContent = text;
      }
    }
    
    // Update mobile toggle
    if (this.mobileToggle) {
      this.mobileToggle.setAttribute('aria-label', label);
    }
    
    // Update button titles for tooltips
    const toggleButtons = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
    toggleButtons.forEach(button => {
      button.title = label;
    });
  }
  
  /**
   * Update meta theme-color for mobile browsers
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    // Set appropriate color based on theme
    const color = theme === this.themes.DARK ? '#111827' : '#ffffff';
    metaThemeColor.content = color;
  }
  
  /**
   * Announce theme change for screen readers
   */
  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after screen reader has time to announce it
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  /**
   * Dispatch custom theme change event
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: {
        theme: theme,
        previousTheme: theme === this.themes.LIGHT ? this.themes.DARK : this.themes.LIGHT
      }
    });
    
    document.dispatchEvent(event);
  }
  
  /**
   * Get current theme
   */
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || this.themes.LIGHT;
  }
  
  /**
   * Set theme programmatically
   */
  setTheme(theme) {
    if (Object.values(this.themes).includes(theme)) {
      if (theme === this.themes.SYSTEM) {
        const systemTheme = this.getSystemTheme();
        this.applyTheme(systemTheme);
        this.updateToggleStates(systemTheme);
      } else {
        this.applyTheme(theme);
        this.updateToggleStates(theme);
      }
      
      localStorage.setItem(this.storageKey, theme);
      this.dispatchThemeChangeEvent(theme);
    }
  }
  
  /**
   * Reset to system theme
   */
  resetToSystemTheme() {
    this.setTheme(this.themes.SYSTEM);
  }
}

// Auto-hide/show elements based on theme
class ThemeAwareComponents {
  constructor() {
    this.init();
  }
  
  init() {
    // Listen for theme changes
    document.addEventListener('themechange', (e) => {
      this.updateThemeAwareElements(e.detail.theme);
    });
    
    // Initial update
    const currentTheme = document.documentElement.getAttribute('data-theme');
    this.updateThemeAwareElements(currentTheme);
  }
  
  updateThemeAwareElements(theme) {
    // Update theme-specific icons
    const lightIcons = document.querySelectorAll('.theme-icon-light');
    const darkIcons = document.querySelectorAll('.theme-icon-dark');
    
    if (theme === 'dark') {
      lightIcons.forEach(icon => icon.style.display = 'none');
      darkIcons.forEach(icon => icon.style.display = 'block');
    } else {
      lightIcons.forEach(icon => icon.style.display = 'block');
      darkIcons.forEach(icon => icon.style.display = 'none');
    }
    
    // Update syntax highlighting if needed
    this.updateSyntaxHighlighting(theme);
  }
  
  updateSyntaxHighlighting(theme) {
    // This can be extended to switch syntax highlighting themes
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    codeBlocks.forEach(block => {
      // Add theme-specific class for styling
      block.classList.remove('theme-light', 'theme-dark');
      block.classList.add(`theme-${theme}`);
    });
  }
}

// Prefers-reduced-motion support
function setupReducedMotionSupport() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function updateMotionPreference() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }
  
  // Initial check
  updateMotionPreference();
  
  // Listen for changes
  prefersReducedMotion.addEventListener('change', updateMotionPreference);
}

// Initialize theme management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new ThemeManager();
  const themeAwareComponents = new ThemeAwareComponents();
  
  setupReducedMotionSupport();
  
  // Export theme manager to global scope for external access
  window.themeManager = themeManager;
});

// CSS for smooth theme transitions
const themeTransitionCSS = `
  .theme-transitioning *,
  .theme-transitioning *:before,
  .theme-transitioning *:after {
    transition: background-color 0.3s ease-in-out, 
                color 0.3s ease-in-out, 
                border-color 0.3s ease-in-out !important;
    transition-delay: 0s !important;
  }
  
  .reduced-motion *,
  .reduced-motion *:before,
  .reduced-motion *:after {
    transition: none !important;
    animation: none !important;
  }
`;

// Inject theme transition CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionCSS;
document.head.appendChild(styleSheet);