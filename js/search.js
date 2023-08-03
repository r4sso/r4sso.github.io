document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");
    const searchResult = document.querySelector(".search-result");
    const searchInput = searchForm.elements.q;
  
    // Function to perform the search and display results
    function performSearch(query) {
      // Fetch the JSON file containing the search index
      fetch("/index.json")
        .then((response) => response.json())
        .then((data) => {
          // Perform the search on the data
          const results = data.filter((item) =>
            item.content.toLowerCase().includes(query)
          );
  
          // Display search results
          let html = "";
          if (query !== "" && results.length > 0) {
            results.forEach((result) => {
              // Highlight the matched words in the content
              const content = result.content.toLowerCase();
              const index = content.indexOf(query);
              const maxLength = 150; // Set the maximum length for the displayed content
  
              let startIndex = Math.max(0, index - Math.floor(maxLength / 2));
              let endIndex = Math.min(content.length, index + Math.floor(maxLength / 2));
  
              if (startIndex === 0) {
                endIndex = Math.min(endIndex + (Math.floor(maxLength / 2) - index), content.length);
              } else if (endIndex === content.length) {
                startIndex = Math.max(0, startIndex - (Math.floor(maxLength / 2) - (content.length - index - 1)));
              }
  
              const truncatedContent = content.substring(startIndex, endIndex);
  
              // Highlight the matched word
              const highlightedContent =
                truncatedContent.replace(
                  new RegExp(query, "gi"),
                  (match) => `<span class="text-yellow-500">${match}</span>`
                );
  
              html += `<div class="mt-4 post-card dark:post-card-dark p-3 rounded-md">
                         <a href="${result.href}">
                         <h2 class="text-xl font-semibold">${result.title}</h2>
                         <p class="text-gray-600 dark:text-gray-400 text-sm">${highlightedContent}</p>
                         <h3 class="text-end font-medium">${result.categories}</h3>
                         </a>
                       </div>`;
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
  
    // Event listener for input changes
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      performSearch(query);
    });
  
    // Event listener for form submission
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const query = searchInput.value.toLowerCase();
      performSearch(query);
    });
  });
  