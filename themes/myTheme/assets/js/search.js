document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search");
    const searchResult = document.querySelector(".search-result");
    const searchInput = searchForm.elements.q;

    function performSearch(query) {
        query = query.trim();
        fetch("/index.json")
            .then((response) => response.json())
            .then((data) => {
                const results = data.filter((item) => {
                    const content = item.content.toLowerCase().trim();
                    const title = item.title.toLowerCase().trim();
                    return content.includes(query) || title.includes(query);
                });
                let html = "";
                if (query !== "" && results.length > 0) {
                    results.forEach((result) => {
                        const content = result.content.toLowerCase();
                        const title = result.title.toLowerCase();
                        const highlightMatches = (text) => {
                            return text.replace(
                                new RegExp(query, "gi"),
                                (match) => `<span class="text-yellow-500">${match}</span>`
                            );
                        };
                        const maxWords = 130;
                        const contentWords = content.split(" ");
                        const index = content.indexOf(query);
                        let startIndex = Math.max(0, index - Math.floor(maxWords / 2));
                        let endIndex = Math.min(content.length, index + Math.floor(maxWords / 2));
                        if (startIndex === 0) {
                            endIndex = Math.min(endIndex + (Math.floor(maxWords / 2) - index), content.length);
                        } else if (endIndex === content.length) {
                            startIndex = Math.max(0, startIndex - (Math.floor(maxWords / 2) - (content.length - index - 1)));
                        }
                        const truncatedContent = content.substring(startIndex, endIndex);
                        const highlightedContent = highlightMatches(truncatedContent);
                        const highlightedTitle = highlightMatches(title);
                        html += `<a href="${result.href}"><div class="mt-4 post-card dark:post-card-dark px-3 py-6 rounded-md shadow-2xl shadow-slate-700/10"><h2 class="text-xl font-semibold">${highlightedTitle}</h2><p class="text-gray-600 dark:text-gray-400 text-sm">${highlightedContent}</p></div></a>`;
                    });
                } else if (query !== "") {
                    html = "<p class='mt-4 text-center'>No results found.</p>";
                }
                searchResult.innerHTML = html;
            })
            .catch((error) => {
                console.error("Error fetching search index:", error);
            });
    }

    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase();
        performSearch(query);
    });

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        performSearch(query);
    });
});
