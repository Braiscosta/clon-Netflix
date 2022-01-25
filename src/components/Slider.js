import "./movie.css";
import "./slider.css";
import "swiper/swiper-bundle.css";
import Movie from "./Movie";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
/* import { forwardRef } from "react"; */

export default function Slider({
  movies,
  handleClick,
  handleMouse,
  setMovie,
  largeRow,
  topRow,
  coordinate,
  refer,
  setIsHovered,
}) {
  return (
    <div>
      <Swiper
        spaceBetween={5}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },

          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1800: {
            slidesPerView: 6,
          },
        }}
      >
        {movies.map((movie, index) =>
          topRow ? (
            index < 9 && (
              <SwiperSlide key={index}>
                <Movie
                  setIsHovered={setIsHovered}
                  movie={movie}
                  largeRow={largeRow}
                  topRow={topRow}
                  top={index}
                  coordinate={coordinate}
                  handleMouse={handleMouse}
                  setMovie={setMovie}
                  handleClick={handleClick}
                ></Movie>
              </SwiperSlide>
            )
          ) : (
            <SwiperSlide key={index}>
              <Movie
                setIsHovered={setIsHovered}
                ref={refer}
                movie={movie}
                largeRow={largeRow}
                topRow={topRow}
                top={index}
                coordinate={coordinate}
                handleMouse={handleMouse}
                setMovie={setMovie}
                handleClick={handleClick}
              ></Movie>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
}
