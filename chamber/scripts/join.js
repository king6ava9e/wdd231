document.addEventListener("DOMContentLoaded", function() {
  // ========== Timestamp Setting ==========
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toLocaleString(); // e.g., "7/27/2025, 9:04:23 AM"
  }

  // ========== Membership Cards Animation ==========
  const cards = document.querySelectorAll(".membership-card, .card"); // Added .card for your original structure
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150); // stagger animations
  });

  // ========== Modal Handling ==========
  // Single modal handling (membershipModal)
  const modal = document.getElementById("membershipModal");
  const openBtn = document.getElementById("openDialogBtn");
  const closeBtn = document.getElementById("closeDialog");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => modal.showModal());
    closeBtn.addEventListener("click", () => modal.close());
  }

  // Multiple modals handling (from membership-cards)
  const moreInfoLinks = document.querySelectorAll('.membership-cards a');
  const closeButtons = document.querySelectorAll('.close-modal');
  const modals = document.querySelectorAll('.modal');

  // Open modals
  moreInfoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.querySelector(this.getAttribute('href'));
      modal?.showModal();
    });
  });

  // Close modals via buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('dialog')?.close();
    });
  });

  // Close modals when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.close();
      }
    });
  });
});