import { movieApi } from "@/src/core/api/movie-api";
import { MovieDBCreditsResponse } from "@/src/infrastructure/interfaces/moviedb-credits.response";
import { CastMapper } from "@/src/infrastructure/mappers/cast.mapper";




export const getMovieCastAction = async (movieId: number) => {
    try {

        const { data } = await movieApi.get<MovieDBCreditsResponse>(
            `/${movieId}/credits`
        );
        //  console.log(JSON.stringify(data,null,2));


        console.log('Pelicula-http-cargada');

        return data.cast.map(CastMapper.fromMovieDBCastToEntity);

    } catch (error) {
        console.log(error);
        throw 'Cannot load cast by id';

    }
}