import api from "../api"

const API_KEY = process.env.REACT_APP_API_KEY;


function getMovies() {
  return async (dispatch) => {
    try { //정상적으로 데이터가 들어온다는 전제하에서 아래 코드를 실행하라
      dispatch({
        type: 'GET_MOVIES_REQUEST'})
      const popularMovieApi = api.get(`movie/popular?api_key=${API_KEY}&language=ko&page=1`);
      const topRatedApi = api.get(`movie/top_rated?api_key=${API_KEY}&language=ko&page=1`);
      const upComingApi = api.get(`movie/upcoming?api_key=${API_KEY}&language=ko&page=1`);
      const genreApi = api.get(`genre/movie/list?api_key=${API_KEY}&language=ko`);


  
      let [popularMovies, topRatedMovies, upComingMovies, genreList] = await Promise.all([popularMovieApi, topRatedApi, upComingApi, genreApi]);
        console.log('genreList', genreList)
      dispatch({
        type: 'GET_MOVIES_SUCCESS',
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          genreList: genreList.data.genres,
        }
      })
    } catch (error) {
      dispatch({type: 'GET_MOVIE_FAILURE'})
    }

  }
}

export const movieAction = {
  getMovies,
}