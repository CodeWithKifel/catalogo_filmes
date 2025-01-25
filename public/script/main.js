async function fetchMovies() {
    try {
        const response = await fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json');
        const movies = await response.json();
        console.log(movies);
        displayMovies(movies);
    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

function getAgeRatingClass(age) {
    if (age <= 14) return 'green';
    if (age < 18) return 'yellow';
    return 'red';
}

function getStars(rating) {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
}

function createMovieCard(movie, allMovies) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const image = document.createElement('img');
    image.src = movie.figura;
    image.alt = movie.titulo;

    const content = document.createElement('div');
    content.classList.add('movie-card-content');

    const title = document.createElement('h2');
    title.textContent = movie.titulo;

    const summary = document.createElement('p');
    summary.textContent = movie.resumo;

    const cast = document.createElement('p');
    cast.innerHTML = `<strong>Elenco:</strong> ${movie.elenco.join(', ')}`;

    const genres = document.createElement('p');
    genres.innerHTML = `<strong>Gêneros:</strong> ${movie.generos.join(', ')}`;

    const rating = document.createElement('span');
    rating.classList.add('age-rating', getAgeRatingClass(movie.classificacao));
    rating.textContent = `${movie.classificacao} anos`;

    const stars = document.createElement('div');
    stars.classList.add('stars');
    stars.textContent = getStars(
        movie.opinioes.reduce((sum, op) => sum + op.rating, 0) / movie.opinioes.length
    );

    // Títulos semelhantes
    const similarTitles = document.createElement('div');
    similarTitles.classList.add('similar-titles');
    movie.titulosSemelhantes.forEach(similarId => {
        const similarMovie = allMovies.find(m => m.id === similarId);
        const similarImage = document.createElement('img');
        similarImage.src = similarMovie.figura;
        similarImage.alt = similarMovie.titulo;
        similarTitles.appendChild(similarImage);
    });

    content.appendChild(title);
    content.appendChild(summary);
    content.appendChild(cast);
    content.appendChild(genres);
    content.appendChild(stars);

    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(rating);
    card.appendChild(similarTitles);
    return card;
}

function displayMovies(movies) {
    const catalog = document.querySelector('#catalog');
    movies.forEach(movie => {
        const card = createMovieCard(movie, movies);
        catalog.appendChild(card);
    });
}

fetchMovies();
