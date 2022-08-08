const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "ebc837392e4b2186424dd73076c9edfa";

class apiClientSeries {
  getMoviesList(page = 1) {
    const url = `${API_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetch(url)
      .then(res => res.json())
      .then(res => res.results);
  }
  getMovieData(id) {
    const urls = [
      `${API_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`,
      `${API_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
    ];
    const movieData = {};
    const fetchs = [
      fetch(urls[0])
        .then(res => res.json())
        .then(res => (movieData.general = res)),
      fetch(urls[1])
        .then(res => res.json())
        .then(res => (movieData.credits = res))
    ];
    return Promise.all(fetchs).then(() => {
      return movieData;
    });
  }
}
export default new apiClientSeries();
