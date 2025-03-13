import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import SearchBar from "@/app/components/SearchInput";
import { useRouter } from "expo-router";
import { useMovies } from "@/hooks/useMovies";
import { isLoading } from "expo-font";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: movieList,
    error: errorMovie,
    isLoading: loadingMovie,
  } = useMovies(`/search/movie?query`, { query: debouncedQuery });

  const movies = movieList?.results || [];

  if (errorMovie) return <Text>Error: {errorMovie?.message}</Text>;

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
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
            {searchQuery && loadingMovie && (
              <ActivityIndicator
                className="mt-5 self-center"
                size="large"
                color="blue"
              />
            )}
            {searchQuery && !isLoading && (
              <Text className="text-lg font-bold my-3 text-center">
                Search Results
              </Text>
            )}
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
        ListEmptyComponent={
          !loadingMovie && !errorMovie ? (
            <View className="mt-5 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
