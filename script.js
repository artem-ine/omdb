const movieForm = document.getElementById("movieForm");
const movieInfo = document.getElementById("movieInfo");
const movieCards = document.getElementsByClassName("card");

movieForm.addEventListener("submit", function (event) {
  // remove reload
  event.preventDefault();

  const movieKeyword = document.getElementById("movieKeyword").value;

  fetch(
    `http://www.omdbapi.com/?apikey=e0a3411e&s=${encodeURIComponent(
      movieKeyword
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        // clear search
        document.getElementById("movieInfo").innerHTML = "";

        data.Search.forEach((movie, index) => {
          fetch(
            `http://www.omdbapi.com/?apikey=e0a3411e&i=${encodeURIComponent(
              movie.imdbID
            )}`
          )
            .then((response) => response.json())
            .then((detailedData) => {
              // unique modal creation
              const modalId = `exampleModal-${index}`;

              const movieInfo = `
                  <div class="card mb-3" id="movieCard">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title} Poster">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                          <!-- Button trigger modal -->
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                            Read More
                          </button>

                          <!-- Modal -->
                          <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="exampleModalLabel">${movie.Title}</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  ${detailedData.Plot}
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              document.getElementById("movieInfo").innerHTML += movieInfo;
            })
            .catch((error) => {
              console.error("Error fetching detailed data:", error);
            });
        });
      } else {
        document.getElementById(
          "movieInfo"
        ).innerHTML = `<p>No movies found for the keyword: ${movieKeyword}</p>`;
      }
    })
    .catch((error) => {
      document.getElementById(
        "movieInfo"
      ).innerHTML = `<p>Something went wrong. Please try again later.</p>`;
      console.error(error);
    });
});
