import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, Country, Gener, Movies, TVSeries, Top, MovieDetails} from "./App";
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
      <Route path="/country" element={<Country />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvseries" element={<TVSeries />} />
      <Route path="/movieINformations" element={<MovieDetails />} />
      
      
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);


