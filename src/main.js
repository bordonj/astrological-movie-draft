import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Zodiac from './js/astrology-service';
import Movie from './js/movie-service';
// import axios from 'axios';

// import { Project } from 'js/project';
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
  data.data.d.forEach((movie) => {
    if (!movie.y) {
      const img = movie.i.imageUrl;
      console.log('img', img);
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
    } else {
      const img = movie.i.imageUrl;
      console.log('img', img);
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
  });
};

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
        $('#color').text(color);
        $('#compatibility').text(compatibility);
        $('#description').text(description);
        $('#number').text(luckyNum);
        $('#time').text(luckyTime);
        $('#mood').text(mood);
        return Movie.fetchData(mood);
      })
      .then(res => {
        if (res instanceof Error) {
          throw Error(`Movie API error: ${res.message}`);
        }
        console.log('movie api res', res);
        showMovies(res);
      })
      .catch(err => {
        console.log('in catch', err);
      });
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
