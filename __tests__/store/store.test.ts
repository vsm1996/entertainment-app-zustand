import { renderHook, act } from "@testing-library/react"
import { useEntStore } from "@/store"

describe("Entertainment Store - User Data Management", () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useEntStore())
    act(() => {
      result.current.setSearchTerm("")
      // Reset bookmarks
      result.current.entertainmentData.forEach((item) => {
        if (item.isBookmarked) {
          result.current.toggleBookmark(item.title)
        }
      })
    })
  })

  describe("Saving favorite content", () => {
    it("remembers when users bookmark content", () => {
      const { result } = renderHook(() => useEntStore())

      const item = result.current.entertainmentData.find((i) => i.title === "Beyond Earth")
      const wasBookmarked = item?.isBookmarked

      act(() => {
        result.current.toggleBookmark("Beyond Earth")
      })

      const updatedItem = result.current.entertainmentData.find((i) => i.title === "Beyond Earth")
      expect(updatedItem?.isBookmarked).toBe(!wasBookmarked)
    })

    it("removes bookmarks when users change their mind", () => {
      const { result } = renderHook(() => useEntStore())

      // Bookmark it
      act(() => {
        result.current.toggleBookmark("Beyond Earth")
      })

      const bookmarked = result.current.entertainmentData.find((i) => i.title === "Beyond Earth")
      expect(bookmarked?.isBookmarked).toBe(true)

      // Unbookmark it
      act(() => {
        result.current.toggleBookmark("Beyond Earth")
      })

      const unbookmarked = result.current.entertainmentData.find((i) => i.title === "Beyond Earth")
      expect(unbookmarked?.isBookmarked).toBe(false)
    })

    it("keeps other content unaffected when bookmarking", () => {
      const { result } = renderHook(() => useEntStore())

      const otherItems = result.current.entertainmentData.filter((i) => i.title !== "Beyond Earth")
      const otherStates = otherItems.map((i) => i.isBookmarked)

      act(() => {
        result.current.toggleBookmark("Beyond Earth")
      })

      const updatedOthers = result.current.entertainmentData.filter((i) => i.title !== "Beyond Earth")
      updatedOthers.forEach((item, index) => {
        expect(item.isBookmarked).toBe(otherStates[index])
      })
    })
  })

  describe("Searching for content", () => {
    it("remembers user's search term", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("earth")
      })

      expect(result.current.searchTerm).toBe("earth")
    })

    it("allows users to clear their search", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("earth")
      })

      act(() => {
        result.current.setSearchTerm("")
      })

      expect(result.current.searchTerm).toBe("")
    })
  })

  describe("Filtering content based on preferences", () => {
    it("finds content matching user's search query", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("earth")
      })

      const results = result.current.getFilteredData()
      expect(results.length).toBeGreaterThan(0)
      results.forEach((item) => {
        expect(item.title.toLowerCase()).toContain("earth")
      })
    })

    it("shows only movies when user wants to browse movies", () => {
      const { result } = renderHook(() => useEntStore())

      const movies = result.current.getFilteredData("Movie")
      expect(movies.length).toBeGreaterThan(0)
      movies.forEach((item) => {
        expect(item.category).toBe("Movie")
      })
    })

    it("shows only TV series when user wants to browse shows", () => {
      const { result } = renderHook(() => useEntStore())

      const tvShows = result.current.getFilteredData("TV Series")
      expect(tvShows.length).toBeGreaterThan(0)
      tvShows.forEach((item) => {
        expect(item.category).toBe("TV Series")
      })
    })

    it("shows only bookmarked content when user views favorites", () => {
      const { result } = renderHook(() => useEntStore())

      // Bookmark some content first
      act(() => {
        result.current.toggleBookmark("Beyond Earth")
        result.current.toggleBookmark("The Great Lands")
      })

      const bookmarked = result.current.getFilteredData(undefined, true)
      expect(bookmarked.length).toBeGreaterThan(0)
      bookmarked.forEach((item) => {
        expect(item.isBookmarked).toBe(true)
      })
    })

    it("combines filters when user has specific criteria", () => {
      const { result } = renderHook(() => useEntStore())

      // Bookmark a movie
      const movie = result.current.entertainmentData.find((i) => i.category === "Movie")
      if (movie) {
        act(() => {
          result.current.toggleBookmark(movie.title)
        })
      }

      const bookmarkedMovies = result.current.getFilteredData("Movie", true)
      bookmarkedMovies.forEach((item) => {
        expect(item.category).toBe("Movie")
        expect(item.isBookmarked).toBe(true)
      })
    })

    it("returns no results gracefully when nothing matches", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("nonexistentmovie12345")
      })

      const results = result.current.getFilteredData()
      expect(results).toEqual([])
    })
  })

  describe("Discovering trending content", () => {
    it("highlights popular trending content for users", () => {
      const { result } = renderHook(() => useEntStore())

      const trending = result.current.getTrendingData()
      expect(trending.length).toBeGreaterThan(0)
      trending.forEach((item) => {
        expect(item.isTrending).toBe(true)
      })
    })

    it("filters trending content by user's search", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("beyond")
      })

      const trending = result.current.getTrendingData()
      trending.forEach((item) => {
        expect(item.isTrending).toBe(true)
        expect(item.title.toLowerCase()).toContain("beyond")
      })
    })
  })

  describe("Discovering recommended content", () => {
    it("suggests non-trending content for users to explore", () => {
      const { result } = renderHook(() => useEntStore())

      const recommended = result.current.getRecommendedData()
      expect(recommended.length).toBeGreaterThan(0)
      recommended.forEach((item) => {
        expect(item.isTrending).toBe(false)
      })
    })

    it("filters recommendations by user's search", () => {
      const { result } = renderHook(() => useEntStore())

      act(() => {
        result.current.setSearchTerm("the")
      })

      const recommended = result.current.getRecommendedData()
      recommended.forEach((item) => {
        expect(item.isTrending).toBe(false)
        expect(item.title.toLowerCase()).toContain("the")
      })
    })
  })
})
