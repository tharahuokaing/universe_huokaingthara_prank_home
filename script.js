document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const searchInput = document.getElementById("prankSearch");
    const pillButtons = document.querySelectorAll(".pill-btn");
    const prankCards = document.querySelectorAll(".prank-card");
    const inspectButtons = document.querySelectorAll(".inspect-btn");
    const prankModal = document.getElementById("prankModal");
    const closePrankModal = document.getElementById("closePrankModal");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'
    let activeFilter = "all";

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Combined Filter & Search
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        prankCards.forEach(card => {
            const cat = card.getAttribute("data-cat");
            const text = card.textContent.toLowerCase();
            const matchCat = activeFilter === "all" || cat === activeFilter;
            const matchQuery = !query || text.includes(query);

            if (matchCat && matchQuery) {
                card.classList.remove("hidden-card");
            } else {
                card.classList.add("hidden-card");
            }
        });
    }

    pillButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            pillButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // 4. Prank Episode Modal
    inspectButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("modalPrankTitle").textContent = btn.getAttribute("data-title");
            document.getElementById("modalPrankCategory").textContent = btn.getAttribute("data-category");
            document.getElementById("modalPrankFormat").textContent = btn.getAttribute("data-format");
            document.getElementById("modalPrankNotes").textContent = btn.getAttribute("data-notes");
            prankModal.classList.remove("hidden");
        });
    });

    if (closePrankModal) {
        closePrankModal.addEventListener("click", () => {
            prankModal.classList.add("hidden");
        });
    }

    if (prankModal) {
        prankModal.addEventListener("click", (e) => {
            if (e.target === prankModal) {
                prankModal.classList.add("hidden");
            }
        });
    }
});
