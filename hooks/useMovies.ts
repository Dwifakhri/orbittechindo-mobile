import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";

interface MovieQuery {
  page?: number;
  limit?: number;
  sort_by?: string;
  query?: string;
}

// Fetch movies
const fetchMovies = async (
  url: string,
  { page, sort_by, query, limit }: MovieQuery,
) => {
  try {
    const { data } = await api.get(url, {
      params: { language: "en-US", page, sort_by, query, limit },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch movies");
  }
};

export const useMovies = (url: string, query: MovieQuery) => {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(url, query),
    staleTime: 1000 * 60 * 5,
  });
};

// Fetch movies
const fetchMovieDetail = async (id: string) => {
  try {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch movies");
  }
};

export const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => fetchMovieDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
