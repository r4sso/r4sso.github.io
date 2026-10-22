document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");
    const searchResult = document.querySelector(".search-result");
    const searchInput = searchForm.elements.q;

    let index = null;      // the search index, fetched once
    let queryId = 0;       // ignores answers for older queries
    let debounce = null;

    function escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function loadIndex() {
        if (!index) {
            index = fetch(searchResult.dataset.indexUrl)
                .then((response) => response.json())
                .catch((error) => {
                    console.error("Error fetching search index:", error);
                    index = null;
                    return [];
                });
        }
        return index;
    }

    function highlight(text, query) {
        const pattern = new RegExp(escapeRegex(query), "gi");
        return text.replace(pattern, (match) => `<mark>${match}</mark>`);
    }

    function excerpt(content, query, maxChars) {
        const index = content.indexOf(query);
        const half = Math.floor(maxChars / 2);
        let start = Math.max(0, index - half);
        let end = Math.min(content.length, index + half);

        if (start === 0) {
            end = Math.min(end + (half - index), content.length);
        } else if (end === content.length) {
            start = Math.max(0, start - (half - (content.length - index - 1)));
        }

        return content.substring(start, end);
    }

    function performSearch(rawQuery) {
        const query = rawQuery.trim().toLowerCase();

        if (!query) {
            searchResult.innerHTML = "";
            return;
        }

        const id = ++queryId;

        loadIndex().then((data) => {
            if (id !== queryId) return;   // a newer search already ran

            const results = data.filter((item) => {
                const content = item.content.toLowerCase();
                const title = item.title.toLowerCase();
                return content.includes(query) || title.includes(query);
            });

            if (results.length === 0) {
                searchResult.innerHTML = "<p class='search-empty'>No results found.</p>";
                return;
            }

            let html = "";
            results.forEach((result) => {
                const content = result.content.toLowerCase();
                const title = result.title.toLowerCase();
                const snippet = highlight(excerpt(content, query, 260), query);
                const heading = highlight(title, query);

                html += `<a href="${result.href}"><article class="post-card"><h2>${heading}</h2><p class="summary">${snippet}</p></article></a>`;
            });

            searchResult.innerHTML = html;
        });
    }

    searchInput.addEventListener("input", function () {
        const query = this.value;

        clearTimeout(debounce);
        debounce = setTimeout(() => performSearch(query), 150);
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearTimeout(debounce);
        performSearch(searchInput.value);
    });
});
