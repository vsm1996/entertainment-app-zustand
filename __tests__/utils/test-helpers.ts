import { useEntStore } from "@/store"

export const resetStore = () => {
  const store = useEntStore.getState()
  store.setSearchTerm("")
}

export const mockEntertainmentItem = {
  title: "Test Movie",
  thumbnail: {
    regular: {
      small: "/test-small.jpg",
      medium: "/test-medium.jpg",
      large: "/test-large.jpg",
    },
  },
  year: 2023,
  category: "Movie" as const,
  rating: "PG",
  isBookmarked: false,
}
