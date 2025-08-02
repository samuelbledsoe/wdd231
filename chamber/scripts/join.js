// Set timestamp field on load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();

  // Modal functionality
  document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modal = document.getElementById(link.dataset.modal);
      if (modal) modal.style.display = "block";
    });
  });

  document.querySelectorAll("[data-close]").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});
