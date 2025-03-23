const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const query = movieInput.value.trim();

  resultDiv.innerHTML = '';

  if (query === '') {
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error';
    errorMsg.textContent = 'Please enter a movie title!';
    resultDiv.appendChild(errorMsg);
    return;
  }

  const apiKey = 'faa78ef5'
  fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        const notFound = document.createElement('p');
        notFound.className = 'error';
        notFound.textContent = 'Movie not found!';
        resultDiv.appendChild(notFound);
      } else {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/250x350?text=No+Image';
        img.alt = 'Poster';

        const title = document.createElement('h3');
        title.textContent = data.Title;

        const year = document.createElement('p');
        year.textContent = `Year: ${data.Year}`;

        card.append(img, title, year);
        resultDiv.appendChild(card);
      }
      console.log(data);

    })
    .catch(error => {
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error';
      errorMsg.textContent = 'Something went wrong. Try again.';
      resultDiv.appendChild(errorMsg);
      console.error(error);
    });
});
