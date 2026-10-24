import MovieCast from '@/src/presentation/components/movie/MovieCast';
import MovieDescription from '@/src/presentation/components/movie/MovieDescription';
import MovieHeader from '@/src/presentation/components/movie/MovieHeader';
import { useMovie } from '@/src/presentation/hooks/useMovie';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';


const MovieScreen = () => {

    const { id } = useLocalSearchParams();

    const { movieQuery,castQuery } = useMovie(+id);

     if (movieQuery.isLoading || !movieQuery.data) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <Text className='mb-4'>Espere por favor</Text>
                <ActivityIndicator color='purple' size={30} />
            </View>
        );
     }


    return (
        <ScrollView>
            <MovieHeader
            originalTitle={movieQuery.data.originalTitle}
            poster={movieQuery.data.poster}
            title={movieQuery.data.title}
            />
            <MovieDescription 
            movie={movieQuery.data}
            />
              <MovieCast cast={castQuery.data ?? []}/>

        </ScrollView>
    )
}

export default MovieScreen