import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'


const MovieCard = ({item}) => {
  const {genreList} = useSelector((state) => state.movie)

  const navigate = useNavigate();

  const goToMovieDetailPage = () => {
   navigate(`/movies/${item.id}`, {state:{value: {item}, genreList: {genreList}}}); // movieDetail 페이지로 이동
  };

  return (
    <div 
      onClick={goToMovieDetailPage}
      className='card' 
      style={{
        backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}` + ")" ,
        }}
      > 
      <div className='overlay'>
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg='danger'>{genreList.find((item) => item.id === id).name}</Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <span>{item.adult ?  '청불' : 'Under 18'} </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
