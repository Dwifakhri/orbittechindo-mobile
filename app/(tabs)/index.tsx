import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import SearchBar from "@/app/components/SearchInput";
import { useRouter } from "expo-router";
import { useMovies } from "@/hooks/useMovies";
import FeaturedMovie from "@/app/components/FeaturedMovie";

export default function Index() {
  const router = useRouter();
  const {
    data: movieList,
    error: errorMovie,
    isLoading: loadingMovie,
  } = useMovies("/movie/now_playing", { page: 1 });

  const {
    data: featuredMovie,
    error: errorFeatured,
    isLoading: loadingFeatured,
  } = useMovies("/discover/movie", { sort_by: "popularity.desc" });

  const movies = movieList?.results || [];
  const moviesFeat = featuredMovie?.results || [];

  if (loadingFeatured || loadingMovie)
    return (
      <ActivityIndicator
        className="mt-5 self-center"
        size="large"
        color="blue"
      />
    );

  if (errorMovie || errorFeatured)
    return <Text>Error: {errorFeatured?.message || errorMovie?.message}</Text>;

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={movies}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
        ListHeaderComponent={
          <View className="mt-3 mb-2 px-4">
            <Text className="text-2xl font-bold text-center mb-5">Movie21</Text>
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />
            {moviesFeat.length > 0 && (
              <View className="mt-5">
                <Text className="text-lg font-bold mb-3">Featured Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={moviesFeat}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <FeaturedMovie movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item?.id?.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <Text className="text-lg font-bold mb-3">Latest Movies</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movie/${item?.id}`)}
            className="w-1/2 p-2"
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}`,
              }}
              className="w-full h-72 rounded-md"
              resizeMode="cover"
            />
            <Text className="text-center mt-2 font-semibold">
              {item?.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
