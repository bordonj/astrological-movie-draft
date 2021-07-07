import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Zodiac from './js/astrology-service';
import Movie from './js/movie-service';




let createImg = (sign) => {
  let imgElement = document.createElement('img');
  imgElement.src=`https://www.astrology-zodiac-signs.com/images/${sign}.jpg`;
  // imgElement.src=`/assets/images/${sign}.jpeg`;
  imgElement.id=`sign${sign}`;
  imgElement.style='float: right; border-radius: 300px; width: 150px';
  return imgElement;
};

// data.d.i, i is the key in the movie object for image
// data.d is the array for each movie
// data.d.l is the title
let showMovies = (data) => {
  $('.movieResults').val('');
  console.log('in showMovies, data', data);
  for (let movie of data.data.d) {
    console.log('movie', movie);
    if (!movie.i) {
      const {l, s, rank} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <img src="https://avatars.githubusercontent.com/u/16786985?v=4" alt="${l}">
      <div class="movie-info">
        <h6>${l}</h6>
        <span class="green">${rank}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>People: <span id='people'>${s}</span></p>
        <p>Type: <span id='type'>N/a<span></p>
      </div>
      `;
      $('.movieResults').append(movieEl);
    } else if (!movie.y) {
      if (!movie.rank) {
        const {l, s} = movie;
        const img = movie.i.imageUrl;
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${img}" alt="${l}">
        <div class="movie-info">
          <h6>${l}</h6>
          <span class="green">N/a</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>People: <span id='people'>${s}</span></p>
          <p>Type: <span id='type'>Actor<span></p>
        </div>
        `;
        $('.movieResults').append(movieEl);
      } else {
        const img = movie.i.imageUrl;
        const {l, s, rank} = movie;
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${img}" alt="${l}">
        <div class="movie-info">
          <h6>${l}</h6>
          <span class="green">${rank}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>People: <span id='people'>${s}</span></p>
          <p>Type: <span id='type'>Actor<span></p>
        </div>
        `;
        $('.movieResults').append(movieEl);
      }

    } else {
      const img = movie.i.imageUrl;
      const {l, y, s, q} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <img src="${img}" alt="${l}">
      <div class="movie-info">
        <h6>${l}</h6>
        <span class="green">${y}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>People: <span id='people'>${s}</span></p>
        <p>Type: <span id='type'>${q}<span></p>
      </div>
      `;
      $('.movieResults').append(movieEl);
    }
  }

};

async function getColorCompatMood(color, compatibility, mood) {
  const apiColor = await Movie.fetchData(color);
  const apiCompat = await Movie.fetchData(compatibility);
  const apiMood = await Movie.fetchData(mood);
  let results = await Promise.all([apiColor,apiCompat, apiMood]);
  console.log('results', results);

  for (let promise of results) {
    console.log('getColorCompatMood', promise);
    showMovies(promise);
  }
}

$(document).ready(function() {
  $('.start').on('click', () => {
    $('.jumbotron').hide();
    $('.form').fadeIn();
    $('.start').hide();
  });
  $('.form').on('submit', (e) => {
    e.preventDefault();
    let zodiacSelect = $('#zodiacSelect').val();
    console.log('zodiac input', zodiacSelect);
    Zodiac.fetchData(zodiacSelect)
      .then(res => {
        if (res instanceof Error) {
          throw Error (`Zodiac API error: ${res.message}`);
        }
        const color = res.color;
        const compatibility = res.compatibility;
        const description = res.description;
        const luckyNum = res.lucky_number;
        const luckyTime = res.lucky_time;
        const mood = res.mood;
        const dateRange = res.date_range;
        $('#zodiacInput').text(zodiacSelect.toUpperCase());
        $('#color').text(color);
        $('#compatibility').text(compatibility);
        $('.quotation').text(description);
        $('#number').text(luckyNum);
        $('#time').text(luckyTime);
        $('#mood').text(mood);
        $('#date').text(dateRange);
        let movieParams = getColorCompatMood(color, compatibility, mood);
        console.log('movie params', movieParams);
        // return Movie.fetchData(mood);
      });
    // .then(res => {
    //   if (res instanceof Error) {
    //     throw Error(`Movie API error: ${res.message}`);
    //   }
    //   console.log('movie api res', res);
    //   showMovies(res);
    // })
    // .catch(err => {
    //   console.log('in catch', err);
    // });
    $('.form').hide();
    let img = createImg(zodiacSelect.toLowerCase());
    $('.zodiacResults').prepend(img);
    $('.results').fadeIn();
  });
});




































//WIP code below is functionality for the service js files
// console.log('aztro key', process.env.API_KEY);
// var axios = require("axios").default;

// var options = {
//   method: 'POST',
//   url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
//   params: {sign: 'cancer', day: 'today'},
//   headers: {
//     'x-rapidapi-key': `${process.env.API_KEY}`,
//     'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
//   console.log('zodiac', response.data);
// }).catch(function(error) {
//   console.error(error);
// });


// //powerful query
// var optionsIMDb = {
//   method: 'GET',
//   url: 'https://imdb8.p.rapidapi.com/auto-complete',
//   params: {q: `happy`},
//   headers: {
//     'x-rapidapi-key': `${process.env.API_KEY}`,
//     'x-rapidapi-host': 'imdb8.p.rapidapi.com'
//   }
// };
// try {
//   axios.request(optionsIMDb).then(res => {
//     console.log('optionsIMDb', res.data);
//   });

// } catch (err) {
//   console.error(err);

// }
