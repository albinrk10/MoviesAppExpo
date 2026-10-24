import { getMovieCastAction } from '@/src/core/actions/movie/get-cast-by-id.actions'
import { getMovieByIdAction } from '@/src/core/actions/movie/get-movie-by-id.actions'
import { useQuery } from '@tanstack/react-query'




export const useMovie = (id:number) => {

  const movieQuery = useQuery({
    queryKey: ['movie',id],
    queryFn:() => getMovieByIdAction(id),
    staleTime: 100 * 60 * 60 * 24
  })  

  const castQuery = useQuery({
    queryKey: ['movie',id,'cast'],
    queryFn:() => getMovieCastAction(id),
    staleTime: 100 * 60 * 60 * 24
  })  


  return {
    movieQuery,
    castQuery
  }
}
