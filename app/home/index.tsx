import MainSlideshow from '@/presentation/components/movies/MainSlideshow';
import MovieHorizontalList from '@/presentation/components/movies/MovieHorizontalList';
import { useMovies } from '@/presentation/hooks/useMovies';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const HomeScreen = () => {

    const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery} = useMovies();
    const safeArea = useSafeAreaInsets();

    if (nowPlayingQuery.isLoading) {
        return (
            <View className="justify-center items-center flex-1">
                <ActivityIndicator color='purple' size={40} />
            </View>
        );
    }

    return (
        <ScrollView>

            <View className='mt-2 pb-10' style={{ paddingTop: safeArea.top }}>
                <Text className='text-3xl font-bold px-4 mb-2'>Movies App</Text>

                {/* carusel */}
                <MainSlideshow
                    movies={nowPlayingQuery.data ?? []}
                />
                {/* popular */}
                <MovieHorizontalList
                    title='Populares'
                    movies={popularQuery.data ?? []}
                    className='mb-5'
                />
                {/* topRatedQuery */}
                <MovieHorizontalList
                    title='Mejor calificadas'
                    movies={topRatedQuery.data?.pages.flat() ?? []}
                    className='mb-5'
                    loadNextPage={topRatedQuery.fetchNextPage}
                />

                {/* upcomingQuery */}
                <MovieHorizontalList
                    title='Proximamente en cines'
                    movies={upcomingQuery.data ?? []}
                    className='mb-5'
                />
                <MovieHorizontalList
                    movies={upcomingQuery.data ?? []}
                    className='mb-5'
                />
              

            </View>
        </ScrollView>
    )
}

export default HomeScreen