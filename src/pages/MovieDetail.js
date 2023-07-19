import React, { useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faSubscript, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { movieAction } from "../redux/actions/movieAction";
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';



const MovieDetail = () => {
  const {genreList} = useSelector((state) => state.movie)
  const location = useLocation()
  const movieItem = location.state.value.item;
  // const [cast, setCast] = useState([])

  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector(
    (state) => state.movie
  );
  console.log("home", popularMovies);

  useEffect(() => {
    // const API_KEY = process.env.REACT_APP_API_KEY;
    // axios.get(`https://api.themoviedb.org/3/movie/${movieItem}/credits?api_key=${API_KEY}`)
    // .then(response => {
    //   const castData = response.data.cast;
    //   console.log(castData)
    //   setCast(castData);
    // })
    // .catch(error => {
    //   console.error(error);
    // });

    dispatch(movieAction.getMovies());
    
  }, []);
  
  // loading이 true면 loading 스피너를 보여주고 
  // loading이 false면 데이터를 보여줌
  // true: 데이터 도착하기 전
  // false: 데이터 도착 후 

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#fff" loading={loading} size={150} />
      </div>
    ) 
  }
  
  return (
    <div 
    className='MovieDetail' 
    style={{
      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieItem.poster_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      // filter: 'brightness(0.6)'
  }}
    >
      <div className='MovieDetail_wrap' >
        <div className='movie_img'>
          <img src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieItem.poster_path}`}/>
        </div>
        <div className="movie_content">
        <h2 >{movieItem.title}</h2>
        <h3>{movieItem.original_title}</h3>
          <div className='button_wrap'>
            <button className='btn_play'><FontAwesomeIcon icon={faPlay} size="lg" style={{ color: 'white' }}/><span>play</span></button>
            <button className='button btn_plus'><FontAwesomeIcon icon={faPlus} size="2x"/></button>
            <button className='button btn_thumbsUp'><FontAwesomeIcon icon={faThumbsUp} size="2x" /></button>
          </div>
        </div>
      </div>
      <div className='movieDetail_desc'>
        <div className='desc_left'>
          <div className='movie_basic_info'>
            <span>80% 일치</span>
            <span>{new Date(movieItem.release_date).getFullYear()}</span>
            <span>HD</span>
            <span><FontAwesomeIcon icon={faClosedCaptioning} /></span>
          </div>
          <div className='overview'>
            <p>{movieItem.overview}</p>
          </div>
        </div>
        <div className='desc_right'>
          <div>
            <span>❤ 출연진</span>
          </div>
          <div>
            <span>❤ 장르</span>
            {movieItem.genre_ids.map((id) => (
              <badge bg='danger'># {genreList.find((movieItem) => movieItem.id === id).name}</badge>
            ))}
          </div>
          <div>
            <span>❤ 평점</span>
            <p>{movieItem.vote_average}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetail
