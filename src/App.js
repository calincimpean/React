
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import React, { Component } from 'react';
import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import apiClient from './api/apiClient';
import { useParams } from "react-router-dom";
import './App.css';


const Movie = ({movie}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

  return (
       <div className={"movie"}>
         
          <div className="movie-title">
              
              <img src={IMAGE_PATH + movie.poster_path} />
              
              <div className={"flex between movie-infos"}>
                  <h5 className={"movie-title"}>{movie.title}</h5>
                  
              </div>
          </div>
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

export function Country() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>About Us</h1>
    </div>
  );
}

export function Gener() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>Contact Us</h1>
    </div>
  );
}

export function Movies() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>Contact Us</h1>
    </div>
  );
}
export function TVSeries() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>Contact Us</h1>
    </div>
  );
}
export function Top() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <h1>Contact Us</h1>
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
        <Link to="/country"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Country</Link>
        <Link to="/movies"style={{color:"white",textDecoration:"none",fontWeight:"700"}}>Movies</Link>
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
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
  let { movieId } = useParams();

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

  return (
    <>
    {loading && (
      <div>Loading...</div>
    )}
    {!loading && movie && (
      <>
            <div className={"container1"} style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.general.backdrop_path})`}}>
      <div className="movie-title1">
              
              <img src={IMAGE_PATH + movie.general.poster_path} />
              
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
     <button className='PlayButton'>►</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
     
     
</div>
</div>
      </>
    )}
    </>
  );
}








