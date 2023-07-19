import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Banner";
import MovieSlide from "../Components/MovieSlide";
import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector(
    (state) => state.movie
  );
  console.log("home", popularMovies);

  useEffect(() => {
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
    <div className="slide">
      <Banner movie={popularMovies.results[0]} />
      <h1>요즘 대세 컨텐츠 </h1>
      <MovieSlide movies={popularMovies} />
      <h1>인기순 영화</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>새로 올라올 컨텐츠</h1>
      <MovieSlide movies={upComingMovies} />
    </div>
  );
};

export default Home;