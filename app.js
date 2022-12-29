
const movieCards = document.querySelector(".movie-cards")
const searchBar = document.querySelector(".search_bar")

searchBar.addEventListener('keydown',async(e)=>{
  if(e.keyCode === 13){
    let ask = searchBar.value
    fetch(`http://www.omdbapi.com/?apikey=73f63fad&s=${ask}`)
    .then(res => res.json())
    .then(data => {
      let movies =[]
      for(let i = 0; i<4; i++){
        movies.push(data.Search[i].imdbID)
      }
      const wholeDescription = movies.map(async(item,index) => {
        const res1 = await fetch(`http://www.omdbapi.com/?apikey=73f63fad&i=${item}`)
        if(res1.ok){
          const data1 = await res1.json()
          return Promise.resolve(data1)
          
          
        }
      })
      Promise.all(wholeDescription).then(values => 
        values.forEach((item,index) => {
          movieCards.innerHTML+=`
        <div class="card">
          <img src="${item.Poster}" alt="" />
          <div class="card_desc">
          <h5>${item.Title}</h5>
        
          <div class="container_button">
            <p>${item.Runtime} | ${item.Genre}</p>
            <button>watchlist</button>
        
          </div>
          <p class="description">${item.Plot}</p>
        
        </div>
    `
        }))



})
  }
})

