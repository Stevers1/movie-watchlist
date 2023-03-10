const movieCards = document.querySelector(".movie-cards");
const searchBar = document.querySelector(".search_bar");
const watchBtn = document.querySelector(".watchlist")
const arrayMovies = JSON.parse(localStorage.getItem("movies")) || [];

  

searchBar.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    movieCards.innerHTML = "";
    let ask = searchBar.value;
    fetch(`https://www.omdbapi.com/?apikey=73f63fad&s=${ask}`)
      .then((res) => res.json())
      .then((data) => {
        let movies = [];
        for (let i = 0; i < 4; i++) {
          movies.push(data.Search[i].imdbID);
        }
        const wholeDescription = movies.map(async (item) => {
          const res1 = await fetch(
            `https://www.omdbapi.com/?apikey=73f63fad&i=${item}`
          );
          if (res1.ok) {
            const data1 = await res1.json();
            return Promise.resolve(data1);
          }
        });
        Promise.all(wholeDescription).then((values) =>
          {values.forEach((item, index) => {
            movieCards.innerHTML += `
              <div class="card" id="card${index}">
                <img src="${item.Poster}" alt="" />
                <div class="card_desc">
                <h5>${item.Title}</h5>
        
                <div class="container_button">
                  <p>${item.Runtime} | ${item.Genre}</p>
                  <button class="save ${index}">watchlist</button>
        
                </div>
                <p class="description">${item.Plot}</p>
        
              </div>`;
              console.log(index)
          })
          console.log(movieCards);
          const btnsWatchlist = document.querySelectorAll(`.save`)
          
          btnsWatchlist.forEach(element => {
            element.addEventListener("click", (e) => {
              let parent=e.target.parentNode
              let grandparent =parent.parentNode
              let gGparent = grandparent.parentNode
              console.log(gGparent.innerHTML)
              arrayMovies.push(gGparent.innerHTML)
              localStorage.setItem("movies",JSON.stringify(arrayMovies))
              console.log(localStorage.getItem("movies"));

            })
          })
        }
        );
        
        
      })    
    }
  });
  
  watchBtn.addEventListener("click", () => {
  movieCards.innerHTML = "";
  console.log(localStorage.getItem("movies"));
  let value = localStorage.getItem("movies")
  let movieItems = JSON.parse(value)
  console.log(movieItems);
  movieItems.forEach((movieElemnt) => {
    movieCards.innerHTML+= `<div class="card">${movieElemnt}<div/>`
  })
});