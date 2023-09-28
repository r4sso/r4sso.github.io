document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search");
  const searchResult = document.querySelector(".search-result");
  const searchInput = searchForm.elements.q;

  // Function to perform the search and display results
  function performSearch(query) {
      query = query.trim(); // Trim the search query

      // Fetch the JSON file containing the search index
      fetch("/index.json")
          .then((response) => response.json())
          .then((data) => {
              // Perform the search on the data
              const results = data.filter((item) => {
                  const content = item.content.toLowerCase().trim(); // Trim the content
                  const title = item.title.toLowerCase().trim(); // Trim the title
                  return content.includes(query) || title.includes(query); // Include title search
              });

              // Display search results
              let html = "";
              if (query !== "" && results.length > 0) {
                  results.forEach((result) => {
                      // Highlight the matched words in the content and title
                      const content = result.content.toLowerCase();
                      const title = result.title.toLowerCase();

                      // Create a function to highlight matches
                      const highlightMatches = (text) => {
                          return text.replace(
                              new RegExp(query, "gi"),
                              (match) => `<span class="text-yellow-500">${match}</span>`
                          );
                      };

                      // Limit the displayed content to a certain number of words
                      const maxWords = 130; // Change this to your desired word limit
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

                      // Highlight the matched word
                      const highlightedContent = highlightMatches(truncatedContent);
                      const highlightedTitle = highlightMatches(title);

                      html += `<a href="${result.href}">
                             <div class="mt-4 post-card dark:post-card-dark px-3 py-6 rounded-md">
                             <h2 class="text-xl font-semibold">${highlightedTitle}</h2>
                             <p class="text-gray-600 dark:text-gray-400 text-sm">${highlightedContent}</p>
                             </div>
                           </a>`; //    <h3 class="text-end font-medium">${result.categories}</h3>
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
