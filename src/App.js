
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import React, { Component } from 'react';
import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { FaSearch,FaPlay,FaInfoCircle } from "react-icons/fa";
import apiClient from './api/apiClient';
import { useParams } from "react-router-dom";
import './App.css';
import apiClientSeries from './api/apiClientSeries';
import { render } from 'react-dom';



const Movie = ({movie}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

  return (
       <div className={"movie"}>
         
          <div className="movie-title">
              
              <img src={IMAGE_PATH + movie.poster_path} className={""} />
              
              <div className={"flex between movie-infos"}>
                  <h5 className={"movie-title"}>{movie.title}</h5>
                  
              </div>
          </div>
      </div>
  );
};

const Movie2 = ({movie}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

  return (
       
          <div className='image-container d-flex justify-content-start m-3' style={{maxWidth:"fit-content"}}>
              
              <img src={IMAGE_PATH + movie.poster_path} className={"immage2"} />
              
              
          </div>
     
  );
};


function Home() {
  return (
    <div>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>My Website</h1>
    </div>
  );
}



export function Gener() {
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const tagsElement = document.getElementById('tags');
  const API_URL = MOVIE_API + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
  const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  var selectedGenre = []
  
  
  setGenre1();
  function setGenre1() {
      tagsElement.innerHTML= '';
      genres.forEach(genre => {
          const t = document.createElement('div');
          t.classList.add('tag');
          t.id=genre.id;
          t.innerText = genre.name;
          t.addEventListener('click', () => {
              if(selectedGenre.length == 0){
                  selectedGenre.push(genre.id);
              }else{
                  if(selectedGenre.includes(genre.id)){
                      selectedGenre.forEach((id, idx) => {
                          if(id == genre.id){
                              selectedGenre.splice(idx, 1);
                          }
                      })
                  }else{
                      selectedGenre.push(genre.id);
                  }
              }
              
              console.log(selectedGenre)
              
              highlightSelection()
          })
          tagsElement.append(t);
      })
  }

var DISCOVER_API_selected = API_URL + '&with_genres='+encodeURI(selectedGenre.join(','))

  function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.style.backgroundColor="grey";
    })
  }
  

  

  useEffect(() => {
    fetchMovies()
  },  [])

  const fetchMovies = async (event) => {

    if (event) {
      event.preventDefault()
  }


    const {data} = await axios.get(`${DISCOVER_API_selected}`, {
      params: {
          api_key: API_KEY,
          query: searchKey
         
      }

  })
  
        setMovies(data.results)
        
        
  
}

const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
const navigate = useNavigate(); 
const renderMovies = () => (
  
  movies.map(movie => (
    
    <button className='buttonForNavigation' onClick={() => navigate(`/movieINformations/${movie.id}`)}>
      <Movie
          
          key={movie.id}
          movie={movie}
          poster = {movie.poster_path}
          
      />
      
      </button>
      
      
  ))
  

)


  return (
    
    <div className="App1">
     <div>
      <nav className="App">
        <Link to="/" className="hover-efect" style={{color:"white",textDecoration:"none",cursor: "pointer",fontWeight:"700"}} >Home</Link>
        <Link to="/gener"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Gener</Link>
        {/* <Link to="/country"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Country</Link> */}
        {/* <Link to="/movies"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Movies</Link> */}
        <Link to="/tvseries"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>TV Series</Link>
        <Link to="/topimdb"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Top IMDB</Link>
        <form className="form" onSubmit={fetchMovies}>
          <input className="search" type="text" id="search"
           onInput={(event) => setSearchKey(event.target.value)}/>
          <button className="submit-search" type="submit"><FaSearch /></button>
       </form>
       </nav>

       <div id="tags"></div>
       </div>
      
      <div className={"center-max-size container"}>
          {renderMovies()}
      </div>
      </div>
      

    
    

    
  );
  
}


export function TVSeries() {
   
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/tv"
  const DISCOVER_API = MOVIE_API + "discover/tv"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  
  

  useEffect(() => {
    fetchMovies()
  },  [])

  const fetchMovies = async (event) => {

    if (event) {
      event.preventDefault()
  }


  const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
    params: {
        api_key: API_KEY,
        query: searchKey
       
    }

})
  
        setMovies(data.results)
        
        
  
}

const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
const navigate = useNavigate(); 
const renderMovies = () => (
  
  movies.map(tv => (
    
    <button className='buttonForNavigation' onClick={() => navigate(`/tvINformations/${tv.id}`)}>
      <Movie2
          
          key={tv.id}
          movie={tv}
          poster = {tv.poster_path}
          
      />
      
      </button>
      
      
  ))
  

)

  return (
    
    
    <div className="App12">
     <div>
      <nav className="App2">
        <Link to="/" className="hover-efect" style={{color:"white",textDecoration:"none",cursor: "pointer",fontWeight:"700"}} >Home</Link>
        <Link to="/gener"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Gener</Link>
        {/* <Link to="/country"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Country</Link> */}
        {/* <Link to="/movies"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Movies</Link> */}
        <Link to="/tvseries"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>TV Series</Link>
        <Link to="/topimdb"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Top IMDB</Link>
        <form className="form" onSubmit={fetchMovies}>
          <input className="search" type="text" id="search"
           onInput={(event) => setSearchKey(event.target.value)}/>
          <button className="submit-search" type="submit"><FaSearch /></button>
       </form>
       </nav>
       </div>
      
      <div className=' movie-app'>
      <div className='row'>
          {renderMovies()}
          <div className='nothing'></div>
      </div>
      
      </div>
      
      </div>
    
  );
}
export function Top() {
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "movie/top_rated"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  
  

  useEffect(() => {
    fetchMovies()
  },  [])

  const fetchMovies = async (event) => {

    if (event) {
      event.preventDefault()
  }


    const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
          api_key: API_KEY,
          query: searchKey
         
      }

  })
  
        setMovies(data.results)
        
        
  
}

const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
const navigate = useNavigate(); 
const renderMovies = () => (
  
  movies.map(movie => (
    
    <button className='buttonForNavigation' onClick={() => navigate(`/movieINformations/${movie.id}`)}>
      <Movie
          
          key={movie.id}
          movie={movie}
          poster = {movie.poster_path}
          
      />
      
      </button>
      
      
  ))
  

)

  return (
    
    
    <div className="App1">
     <div>
      <nav className="AppB">
        <Link to="/" className="hover-efect" style={{color:"white",textDecoration:"none",cursor: "pointer",fontWeight:"700"}} >Home</Link>
        <Link to="/gener"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Gener</Link>
        {/* <Link to="/country"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Country</Link> */}
        {/* <Link to="/movies"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Movies</Link> */}
        <Link to="/tvseries"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>TV Series</Link>
        <Link to="/topimdb"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Top IMDB</Link>
        <form className="form" onSubmit={fetchMovies}>
          <input className="search" type="text" id="search"
           onInput={(event) => setSearchKey(event.target.value)}/>
          <button className="submit-search" type="submit"><FaSearch /></button>
       </form>
       </nav>
       </div>
      
      <div className={"center-max-size container"}>
          {renderMovies()}
      </div>
      </div>
    
    
  );
  
}


export function App() {
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  
  

  useEffect(() => {
    fetchMovies()
  },  [])

  const fetchMovies = async (event) => {

    if (event) {
      event.preventDefault()
  }


    const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
          api_key: API_KEY,
          query: searchKey
         
      }

  })
  
        setMovies(data.results)
        
        
  
}

const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
const navigate = useNavigate(); 
const renderMovies = () => (
  
  movies.map(movie => (
    
    <button className='buttonForNavigation' onClick={() => navigate(`/movieINformations/${movie.id}`)}>
      <Movie
          
          key={movie.id}
          movie={movie}
          poster = {movie.poster_path}
          
      />
      
      </button>
      
      
  ))
  

)

  return (
    
    
    <div className="App1">
     <div>
      <nav className="App">
        <Link to="/" className="hover-efect" style={{color:"white",textDecoration:"none",cursor: "pointer",fontWeight:"700"}} >Home</Link>
        <Link to="/gener"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Gener</Link>
        {/* <Link to="/country"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Country</Link> */}
        {/* <Link to="/movies"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Movies</Link> */}
        <Link to="/tvseries"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>TV Series</Link>
        <Link to="/topimdb"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Top IMDB</Link>
        <form className="form" onSubmit={fetchMovies}>
          <input className="search" type="text" id="search"
           onInput={(event) => setSearchKey(event.target.value)}/>
          <button className="submit-search" type="submit"><FaSearch /></button>
       </form>
       </nav>
       </div>
      
      <div className={"center-max-size container"}>
          {renderMovies()}
      </div>
      </div>
      

    
    

    
  );
  
}
export function MovieDetails() {
  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
  let { movieId } = useParams();
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    setLoading(true);
    apiClient.getMovieData(movieId)
    .then(res => {
      setMovie(res);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
  }, [movieId]);

  const fetchMovies = async (event) => {

    if (event) {
      event.preventDefault()
  }


    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/similar`, {
      params: {
          api_key: API_KEY,
          query: searchKey
         
      }

  })
  
        setMovies(data.results)
        console.log(data);
        
        
        
}
const navigate = useNavigate(); 
const renderMovies = () => (
  
  movies.map(movie => (
    
    <button className='buttonForNavigation' onClick={() => navigate(`/movieINformations/${movie.id}`)}>
      <Movie
          
          key={movie.id}
          movie={movie}
          poster = {movie.poster_path}
          
      />
      
      </button>
      
      
  ))
  

)

  return (
    <>
    {loading && (
      <div>Loading...</div>
    )}
    {!loading && movie && (
      <>
            <div className={"container1"} style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.general.backdrop_path})`,backgroundSize:"cover",backgroundPosition:"top center;"}}>
      <div className="movie-title1">
              
              <img src={IMAGE_PATH + movie.general.poster_path}  />
              
              <div className={"titleAndIMdb"}>
                  <br></br>
                  <div >{movie.general.title}</div>
                  <br></br>
                  <span>IMDB: </span><span>{movie.general.vote_average}</span>
                  <br></br>
                  <br></br>
                  <span>Release: </span><span>{movie.general.release_date}</span>
                  <br></br>
                  
              </div>
          </div>
      <div>   
     <div className='movieSummary'>{movie.general.overview}</div>
     <br></br>
     <br></br>
     {/* <a href="https://www.youtube.com/watch?v=Go8nTmfrQd8&ab_channel=MarvelEntertainment" class="round-button"><i class="fa fa-play fa-2x"></i></a> */}
     <div className="buttons" >
          <button className="play">
            <FaPlay />
            <span>Play</span>
          </button>
          <button className="more">
            <FaInfoCircle />
            <span>Info</span>
          </button>
        </div>
     <div className='movieSummary'>{movie.general.credits}</div>
     <div >
          {renderMovies()}
      </div>
     
     
     
</div>
</div>
      </>
    )}
    </>
  );
}
export function TvDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
  let { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    apiClientSeries.getMovieData(movieId)
    .then(res => {
      setMovie(res);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
  }, [movieId]);

  return (
    <>
    {loading && (
      <div>Loading...</div>
    )}
    {!loading && movie && (
      <>
            <div className={"container1"} style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.general.backdrop_path})`,backgroundSize:"cover",backgroundPosition:"top center;"}}>
      <div className="movie-title1">
              
              <img src={IMAGE_PATH + movie.general.poster_path}  />
              
              <div className={"titleAndIMdb"}>
                  <br></br>
                  <div >{movie.general.title}</div>
                  <br></br>
                  <span>IMDB: </span><span>{movie.general.vote_average}</span>
                  <br></br>
                  <br></br>
                  <span>First Air Date: </span><span>{movie.general.first_air_date}</span>
                  <br></br>
                  
              </div>
          </div>
      <div>   
     <div className='movieSummary'>{movie.general.overview}</div>
     <br></br>
     <br></br>
     <a href="https://www.youtube.com/watch?v=Go8nTmfrQd8&ab_channel=MarvelEntertainment" class="round-button"><i class="fa fa-play fa-2x"></i></a>
     <div className='movieSummary'>{movie.general.credits}</div>
     
     
     
</div>
</div>
      </>
    )}
    </>
  );
}








