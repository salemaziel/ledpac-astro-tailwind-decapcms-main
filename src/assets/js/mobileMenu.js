// Mobile menu functionality
const openButton = document.getElementById('menu-open-button');
const closeButton = document.getElementById('menu-close-button');
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('mobile-menu-overlay');

if (openButton && closeButton && menu && overlay) {
  // Find all focusable elements within the menu
  const focusableElementsSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let focusableElements = Array.from(menu.querySelectorAll(focusableElementsSelector));
  let firstFocusableElement;
  let lastFocusableElement;

  let lastFocusedElementBeforeMenuOpen = null; // To store focus return point

  function updateFocusableElements() {
      focusableElements = Array.from(menu.querySelectorAll(focusableElementsSelector));
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];
  }

  function openMenu() {
    lastFocusedElementBeforeMenuOpen = document.activeElement; // Store current focus
    menu.classList.remove('invisible', '-translate-x-full');
    menu.setAttribute('aria-hidden', 'false');
    overlay.classList.remove('invisible', 'opacity-0');
    overlay.setAttribute('aria-hidden', 'false');
    openButton.setAttribute('aria-expanded', 'true');

    updateFocusableElements(); // Ensure list is up-to-date
    // Wait for transition before focusing
    setTimeout(() => {
      if (firstFocusableElement) {
          firstFocusableElement.focus();
      }
      menu.addEventListener('keydown', handleFocusTrap);
    }, 300); // Match transition duration
  }

  function closeMenu() {
    menu.classList.add('invisible', '-translate-x-full');
    menu.setAttribute('aria-hidden', 'true');
    overlay.classList.add('invisible', 'opacity-0');
    overlay.setAttribute('aria-hidden', 'true');
    openButton.setAttribute('aria-expanded', 'false');
    menu.removeEventListener('keydown', handleFocusTrap);

    // Return focus to the element that opened the menu
    if (lastFocusedElementBeforeMenuOpen) {
      lastFocusedElementBeforeMenuOpen.focus();
    }
  }

  function handleFocusTrap(event) {
    if (event.key === 'Tab') {
      updateFocusableElements(); // Recalculate in case DOM changed
      if (!focusableElements.length) return; // No focusable elements

      const isShiftPressed = event.shiftKey;

      if (isShiftPressed) {
        // If Shift + Tab on the first element, wrap to the last
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // If Tab on the last element, wrap to the first
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  // --- Event Listeners ---
  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && openButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  // Close menu if a link inside it is clicked
  menu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' && event.target.href) {
          // Check if it's a same-page link
          const url = new URL(event.target.href, window.location.origin);
          if (url.pathname === window.location.pathname && url.hash) {
               closeMenu(); // Close immediately for same-page hash links
          }
      }
  });

} else {
  console.error('Essential navigation elements not found. Menu functionality may be broken.');
}
