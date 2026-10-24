import { movieApi } from "@/src/core/api/movie-api";
import { CompleteMovie } from "@/src/infrastructure/interfaces/movie.interface";
import { MovieDBMovieResponse } from "@/src/infrastructure/interfaces/moviedb-movie.response";
import { MovieMapper } from "@/src/infrastructure/mappers/movie.mapper";

export const getMovieByIdAction = async (id: number | string):Promise<CompleteMovie> => {
    try {

        const { data } = await movieApi.get<MovieDBMovieResponse>(`/${id}`);

        //  console.log(JSON.stringify(data,null,2));


        console.log('Pelicula-http-cargada');

        return MovieMapper.fromTheMovieDBToCompleteMovie(data);

    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies';

    }
}