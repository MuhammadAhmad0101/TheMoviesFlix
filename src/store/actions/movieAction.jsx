import { getMovie } from "../reducers/moviesSlice";
export { removeMovie } from "../reducers/moviesSlice";
import api from "../../utils/axios";
export const asyncMovieLoader = (id) => async (dispatch) => {
      const details = await api.get(`/movie/${id}`);
      const castBy = await api.get(`/movie/${id}/credits`);
      const recommendedMovies = await api.get(`/movie/${id}/recommendations`);
      const similarMovies = await api.get(`/movie/${id}/similar`);
      const videoLink = await api.get(`/movie/${id}/videos`);
      const watchProviders = await api.get(`/movie/${id}/watch/providers`);
      const reviews = await api.get(`/movie/${id}/reviews`);
      const idDetail = {
            detail: details.data,
            castBy: castBy.data,
            recommendedMovies: recommendedMovies.data.results,
            similarMovies: similarMovies.data.results,
            videoLink: videoLink.data.results.find((link) => link.type === "Trailer"),
            reviews: reviews.data.results,
            watchProviders: watchProviders.data.results.IN,
      };
      dispatch(getMovie(idDetail));
};
