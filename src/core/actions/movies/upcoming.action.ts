import { movieApi } from "@/src/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/src/infrastructure/interfaces/moviedb-response";
import { MovieMapper } from "@/src/infrastructure/mappers/movie.mapper";

export const upcomingMoviesAction = async () => {
    try {

     const{data} =await movieApi.get<MovieDBMoviesResponse>('/upcoming');

    //  console.log(JSON.stringify(data,null,2));
    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    // console.log(movies);

     return movies;

    } catch (error) {
        console.log(error);
        throw 'Cannot load now popular movies';

    }
}