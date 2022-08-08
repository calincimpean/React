import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { App, Country, Gener, Movies, TVSeries, Top, MovieDetails, TvDetails} from "./App";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/topimdb" element={<Top />} />
      <Route path="/" element={<App />} />
      
      <Route path="/gener" element={<Gener />} />
      {/* <Route path="/movies" element={<Movies />} /> */}
      <Route path="/tvseries" element={<TVSeries />} />
      <Route path="/movieINformations/:movieId" element={<MovieDetails />} />
      <Route path="/tvINformations/:movieId" element={<TvDetails />} />
      
      
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// delete

