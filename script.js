// script.js
document
  .getElementById("movieForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get the user's input from the form
    const movieTitle = document.getElementById("movieTitle").value;

    // Replace '[your-apikey]' with your actual API key from the Open Movie Database API
    const apiKey = "e0a3411e";

    // Make the API call
    fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        movieTitle
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if the API returned a valid response
        if (data.Response === "True") {
          // Clear previous movie info before displaying new search results
          document.getElementById("movieInfo").innerHTML = "";

          // Display each movie result in the movieInfo div
          data.Search.forEach((movie) => {
            const movieInfo = `
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title} Poster">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                    <!-- You can display additional information here if needed -->
                  </div>
                </div>
              </div>
            </div>
          `;
            document.getElementById("movieInfo").innerHTML += movieInfo;
          });
        } else {
          // Display an error message if no movies were found
          document.getElementById(
            "movieInfo"
          ).innerHTML = `<p>No movies found for the keyword: ${movieKeyword}</p>`;
        }
      })
      .catch((error) => {
        // Display an error message if there was an issue with the API call
        document.getElementById(
          "movieInfo"
        ).innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        console.error(error);
      });
  });
