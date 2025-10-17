/**
 * Navigation JavaScript Module
 * Handles hierarchical navigation, collapsible menus, and active state management
 */

class NavigationManager {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.navMenu = document.querySelector('.nav-menu');
    this.mobileNavToggle = document.getElementById('mobile-nav-toggle');
    this.mobileNavMenu = document.getElementById('mobile-nav-menu');
    this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    this.mobileNavClose = document.getElementById('mobile-nav-close');
    
    this.init();
  }
  
  init() {
    this.setupHierarchicalNavigation();
    this.setupMobileNavigation();
    this.setupKeyboardNavigation();
    this.setupActiveStates();
    
    // Auto-expand active menu items on page load
    this.expandActiveMenuItems();
  }
  
  /**
   * Setup hierarchical navigation with collapsible sections
   */
  setupHierarchicalNavigation() {
    // Handle desktop navigation toggles
    const navItems = document.querySelectorAll('.nav-item.has-children');
    
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const toggle = item.querySelector('.nav-toggle');
      const submenu = item.querySelector('.nav-submenu');
      
      if (toggle && submenu) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleSubmenu(item, submenu, link);
        });
        
        // Allow clicking on the main link to navigate while preventing toggle
        link.addEventListener('click', (e) => {
          if (e.target === toggle || toggle.contains(e.target)) {
            e.preventDefault();
          }
        });
      }
    });
  }
  
  /**
   * Toggle submenu visibility
   */
  toggleSubmenu(item, submenu, link) {
    const isExpanded = submenu.classList.contains('expanded');
    const ariaExpanded = !isExpanded;
    
    // Close all other submenus at the same level
    const siblings = item.parentElement.children;
    Array.from(siblings).forEach(sibling => {
      if (sibling !== item && sibling.classList.contains('has-children')) {
        const siblingSubmenu = sibling.querySelector('.nav-submenu');
        const siblingLink = sibling.querySelector('.nav-link');
        if (siblingSubmenu) {
          siblingSubmenu.classList.remove('expanded');
          siblingLink.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
    // Toggle current submenu
    submenu.classList.toggle('expanded');
    link.setAttribute('aria-expanded', ariaExpanded);
    
    // Add/remove active tree class for styling
    if (ariaExpanded) {
      item.classList.add('in-active-tree');
    } else {
      item.classList.remove('in-active-tree');
    }
  }
  
  /**
   * Setup mobile navigation
   */
  setupMobileNavigation() {
    if (!this.mobileNavToggle || !this.mobileNavMenu) return;
    
    // Mobile menu toggle
    this.mobileNavToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close mobile menu
    if (this.mobileNavClose) {
      this.mobileNavClose.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Close on overlay click
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Handle mobile accordion toggles
    const mobileAccordionToggles = document.querySelectorAll('.mobile-nav-accordion-toggle');
    mobileAccordionToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = toggle.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        
        if (submenu) {
          const isExpanded = submenu.classList.contains('expanded');
          submenu.classList.toggle('expanded');
          toggle.setAttribute('aria-expanded', !isExpanded);
        }
      });
    });
    
    // Close mobile menu on navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-sublink');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Small delay to allow navigation to start
        setTimeout(() => {
          this.closeMobileMenu();
        }, 150);
      });
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileNavMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }
  
  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu() {
    const isOpen = this.mobileNavMenu.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.mobileNavMenu.classList.add('active');
    this.mobileNavOverlay.classList.add('active');
    this.mobileNavToggle.setAttribute('aria-expanded', 'true');
    this.mobileNavMenu.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstFocusableElement = this.mobileNavMenu.querySelector('a, button');
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }
  
  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.mobileNavMenu.classList.remove('active');
    this.mobileNavOverlay.classList.remove('active');
    this.mobileNavToggle.setAttribute('aria-expanded', 'false');
    this.mobileNavMenu.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    this.mobileNavToggle.focus();
  }
  
  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Handle keyboard navigation for desktop menu
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublink');
    
    navLinks.forEach(link => {
      link.addEventListener('keydown', (e) => {
        const item = link.closest('.nav-item, .nav-subitem');
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextItem(item);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPreviousItem(item);
            break;
          case 'ArrowRight':
            if (item.classList.contains('has-children')) {
              e.preventDefault();
              const submenu = item.querySelector('.nav-submenu');
              if (submenu && !submenu.classList.contains('expanded')) {
                this.toggleSubmenu(item, submenu, link);
              }
            }
            break;
          case 'ArrowLeft':
            if (item.classList.contains('nav-subitem')) {
              e.preventDefault();
              const parentItem = item.closest('.nav-item');
              const parentLink = parentItem.querySelector('.nav-link');
              if (parentLink) {
                parentLink.focus();
              }
            }
            break;
          case 'Enter':
          case ' ':
            if (item.classList.contains('has-children') && e.target.classList.contains('nav-toggle')) {
              e.preventDefault();
              const submenu = item.querySelector('.nav-submenu');
              this.toggleSubmenu(item, submenu, link);
            }
            break;
        }
      });
    });
  }
  
  /**
   * Focus next navigation item
   */
  focusNextItem(currentItem) {
    const allItems = Array.from(document.querySelectorAll('.nav-item, .nav-subitem'));
    const currentIndex = allItems.indexOf(currentItem);
    const nextItem = allItems[currentIndex + 1];
    
    if (nextItem) {
      const nextLink = nextItem.querySelector('.nav-link, .nav-sublink');
      if (nextLink) {
        nextLink.focus();
      }
    }
  }
  
  /**
   * Focus previous navigation item
   */
  focusPreviousItem(currentItem) {
    const allItems = Array.from(document.querySelectorAll('.nav-item, .nav-subitem'));
    const currentIndex = allItems.indexOf(currentItem);
    const previousItem = allItems[currentIndex - 1];
    
    if (previousItem) {
      const previousLink = previousItem.querySelector('.nav-link, .nav-sublink');
      if (previousLink) {
        previousLink.focus();
      }
    }
  }
  
  /**
   * Setup active states based on current page
   */
  setupActiveStates() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublink, .mobile-nav-link, .mobile-nav-sublink');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Exact match
      if (href === currentPath) {
        link.classList.add('active');
        
        // Mark parent items as in active tree
        let parent = link.closest('.nav-item, .nav-subitem, .mobile-nav-item');
        while (parent) {
          parent.classList.add('in-active-tree');
          parent = parent.parentElement.closest('.nav-item, .nav-subitem, .mobile-nav-item');
        }
      }
      // Partial match for parent sections
      else if (currentPath.startsWith(href) && href !== '/') {
        const item = link.closest('.nav-item, .mobile-nav-item');
        if (item) {
          item.classList.add('in-active-tree');
        }
      }
    });
  }
  
  /**
   * Auto-expand menu items that are in the active tree
   */
  expandActiveMenuItems() {
    // Desktop navigation
    const activeTreeItems = document.querySelectorAll('.nav-item.in-active-tree.has-children');
    activeTreeItems.forEach(item => {
      const submenu = item.querySelector('.nav-submenu');
      const link = item.querySelector('.nav-link');
      
      if (submenu && link) {
        submenu.classList.add('expanded');
        link.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Mobile navigation
    const mobileActiveTreeItems = document.querySelectorAll('.mobile-nav-item.in-active-tree.has-children');
    mobileActiveTreeItems.forEach(item => {
      const submenu = item.querySelector('.mobile-nav-submenu');
      const toggle = item.querySelector('.mobile-nav-accordion-toggle');
      
      if (submenu && toggle) {
        submenu.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile menu if window becomes larger
    if (window.innerWidth > 768 && this.mobileNavMenu.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 80; // Adjust based on fixed header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

// Copy to clipboard functionality
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showNotification('Link copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy: ', err);
    showNotification('Failed to copy link');
  } finally {
    document.body.removeChild(textArea);
  }
}

// Simple notification system
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-${type === 'success' ? 'success' : 'error'});
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-size: 14px;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const navigationManager = new NavigationManager();
  setupSmoothScrolling();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    navigationManager.handleResize();
  });
});

// Export for use in other modules
window.NavigationManager = NavigationManager;
window.copyToClipboard = copyToClipboard;