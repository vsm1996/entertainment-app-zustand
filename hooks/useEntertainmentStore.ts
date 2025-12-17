import { useEntStore } from "@/store"

export const useEntertainmentStore = () => {
  const searchTerm = useEntStore((state) => state.searchTerm)
  const setSearchTerm = useEntStore((state) => state.setSearchTerm)
  const toggleBookmark = useEntStore((state) => state.toggleBookmark)
  const getFilteredData = useEntStore((state) => state.getFilteredData)
  const getTrendingData = useEntStore((state) => state.getTrendingData)
  const getRecommendedData = useEntStore((state) => state.getRecommendedData)
  const homePagination = useEntStore((state) => state.homePagination)
  const moviesPagination = useEntStore((state) => state.moviesPagination)
  const tvSeriesPagination = useEntStore((state) => state.tvSeriesPagination)
  const setHomePage = useEntStore((state) => state.setHomePage)
  const setMoviesPage = useEntStore((state) => state.setMoviesPage)
  const setTVSeriesPage = useEntStore((state) => state.setTVSeriesPage)
  const getPaginatedData = useEntStore((state) => state.getPaginatedData)

  return {
    searchTerm,
    setSearchTerm,
    toggleBookmark,
    getFilteredData,
    getTrendingData,
    getRecommendedData,
    homePagination,
    moviesPagination,
    tvSeriesPagination,
    setHomePage,
    setMoviesPage,
    setTVSeriesPage,
    getPaginatedData,
  }
}
