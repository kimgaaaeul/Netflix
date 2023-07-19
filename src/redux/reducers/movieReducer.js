let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upComingMovies: {},
  loading: true, // 리듀서는 액션으로부터 값을 받기 때문에 액션 정의 하러 가야쥐
  genreList: []
}; // 빈 배열 형태로 초기값 만들어놓고 

function movieReducer(state = initialState, action) {
  let {type, payload} = action;
  switch(type) {
    case 'GET_MOVIES_REQUEST':
      return {...state, loading: true }
    case 'GET_MOVIES_SUCCESS' :
      return { 
        ...state, 
        popularMovies: payload.popularMovies, 
        topRatedMovies: payload.topRatedMovies, 
        upComingMovies: payload.upComingMovies,
        loading: false,
        genreList: payload.genreList
      };
    case  'GET_MOVIE_FAILURE' : 
      return {...state, loading: false}
    default:
      return {...state}
  }
}

export default movieReducer