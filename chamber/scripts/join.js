document.addEventListener("DOMContentLoaded", function() {
  // ========== Timestamp Setting ==========
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toLocaleString();
  }

  // ========== Membership Cards Animation ==========
  const cards = document.querySelectorAll(".membership-card, .card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150);
  });

  // ========== Modal Handling ==========
  // Handle membership cards modals
  const membershipCards = document.querySelector('.membership-cards');
  
  if (membershipCards) {
    membershipCards.addEventListener('click', function(e) {
      // Check if clicked element is a "More Info" link
      const link = e.target.closest('a[href^="#modal-"]');
      if (link) {
        e.preventDefault();
        const modalId = link.getAttribute('href');
        const modal = document.querySelector(modalId);
        if (modal) {
          modal.showModal();
        }
      }
    });
  }

  // Close modals functionality
  document.addEventListener('click', function(e) {
    // Close when clicking close buttons
    if (e.target.classList.contains('close-modal')) {
      const modal = e.target.closest('dialog');
      if (modal) {
        modal.close();
      }
    }
    // Close when clicking outside modal content
    else if (e.target.classList.contains('modal')) {
      e.target.close();
    }
  });

  // Handle single modal if exists (membershipModal)
  const singleModal = document.getElementById("membershipModal");
  const openBtn = document.getElementById("openDialogBtn");
  const closeBtn = document.getElementById("closeDialog");

  if (singleModal && openBtn) {
    openBtn.addEventListener("click", () => singleModal.showModal());
  }
  if (singleModal && closeBtn) {
    closeBtn.addEventListener("click", () => singleModal.close());
  }
});