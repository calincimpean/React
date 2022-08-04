
import axios from 'axios'
import React, { Component } from 'react';
import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
        console.log(data.results);
        
  
}

const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
 const renderMovies = () => (
  
  movies.map(movie => (
    
    <Link to="/movieINformations" className='links-individual-pphoto' > 
      <Movie
          
          key={movie.id}
          movie={movie}
          poster = {movie.poster_path}
          
      />
      {/* {IMAGE_PATH + movie.poster_path}
      {movie.title} */}
      </Link>
      
      
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
export function MovieDetails(){

  const MOVIE_API = "https://api.themoviedb.org/3/"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "ebc837392e4b2186424dd73076c9edfa"
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"; 
  
  const [movie, setMovie] = useState([])

  useEffect(() => {
    fetchMovies()
  },  [])

  const fetchMovies = async (event) => {

    const {data} = await axios.get(`${DISCOVER_API}`, {
      params: {
          api_key: API_KEY
         
      }

  })
        setMovie(data.results[0])
        console.log(data.results);
        
}



  return (
    
    <div className={"container1"} style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
      <div className="movie-title1">
              
              <img src={IMAGE_PATH + movie.poster_path} />
              
              <div className={"titleAndIMdb"}>
                  <br></br>
                  <div >{movie.title}</div>
                  <br></br>
                  <span>IMDB: </span><span>{movie.vote_average}</span>
                  <br></br>
                  <br></br>
                  <span>Release: </span><span>{movie.release_date}</span>
                  <br></br>
                  
              </div>
          </div>
      <div>   
     <div className='movieSummary'>{movie.overview}</div>
     <br></br>
     <br></br>
     <button className='PlayButton'>►</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     {/* <button className='PlayButton1'>🖤</button> */}
     {/* <div>{movie.related}</div> */}
     
</div>
</div>
  )
}



