document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.getAttribute("data-code");

      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  });
});
