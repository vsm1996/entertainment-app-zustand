import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { act } from "react"
import Home from "@/app/(main)/page"
import Movies from "@/app/(main)/movies/page"
import TVSeries from "@/app/(main)/tv-series/page"
import Bookmarks from "@/app/(main)/bookmarks/page"
import { useEntStore } from "@/store"

describe("Entertainment App - User Journeys", () => {
  beforeEach(() => {
    // Reset app state between tests
    const store = useEntStore.getState()
    act(() => {
      store.setSearchTerm("")
      // Clear all bookmarks
      store.entertainmentData.forEach((item) => {
        if (item.isBookmarked) {
          store.toggleBookmark(item.title)
        }
      })
    })
  })

  describe("Discovering and bookmarking content", () => {
    it("user browses trending content and saves favorites", async () => {
      render(<Home />)

      // User sees trending content
      expect(screen.getByText("Trending")).toBeVisible()

      // User finds "Beyond Earth" and decides to bookmark it
      const beyondEarthCard = screen.getByText("Beyond Earth")
      expect(beyondEarthCard).toBeVisible()

      // Click the bookmark button on the card
      const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })
      fireEvent.click(bookmarkButtons[0])

      // Navigate to bookmarks to verify it was saved
      const { unmount } = render(<Bookmarks />)

      await waitFor(() => {
        expect(screen.getByText(/bookmarked movies/i)).toBeVisible()
      })

      unmount()
    })

    it("user removes content from their bookmarks", async () => {
      // Setup: User has already bookmarked something
      act(() => {
        const store = useEntStore.getState()
        const firstMovie = store.entertainmentData.find((item) => item.category === "Movie")
        if (firstMovie) {
          store.toggleBookmark(firstMovie.title)
        }
      })

      render(<Bookmarks />)

      // User sees their bookmarked content
      expect(screen.getByText(/bookmarked/i)).toBeVisible()

      // User clicks to remove bookmark
      const bookmarkButton = screen.getAllByRole("button", { name: /bookmark/i })[0]
      fireEvent.click(bookmarkButton)

      // Content should be removed from bookmarks view
      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarkedItems = store.getFilteredData(undefined, true)
        // One less bookmarked item
        expect(bookmarkedItems.length).toBe(0)
      })
    })
  })

  describe("Searching for specific content", () => {
    it("user searches for content across the entire catalog", async () => {
      render(<Home />)

      // User types in search box
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "earth" } })

      // User sees filtered results
      await waitFor(() => {
        expect(screen.getByText("Beyond Earth")).toBeVisible()
      })
    })

    it("user searches for movies specifically", async () => {
      render(<Movies />)

      // User is on movies page
      expect(screen.getByText(/movies/i)).toBeVisible()

      // User searches within movies
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "the" } })

      // Results should only show movies containing "the"
      await waitFor(() => {
        const store = useEntStore.getState()
        const results = store.getFilteredData("Movie")
        results.forEach((item) => {
          expect(item.category).toBe("Movie")
          expect(item.title.toLowerCase()).toContain("the")
        })
      })
    })

    it("user clears search to see all content again", async () => {
      render(<Home />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      // User searches
      fireEvent.change(searchInput, { target: { value: "earth" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const filtered = store.getFilteredData()
        expect(filtered.length).toBeLessThan(store.entertainmentData.length)
      })

      // User clears search
      fireEvent.change(searchInput, { target: { value: "" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        expect(store.searchTerm).toBe("")
      })
    })

    it("user searches within their bookmarks", async () => {
      // Setup: User has bookmarked several items
      act(() => {
        const store = useEntStore.getState()
        store.toggleBookmark("Beyond Earth")
        store.toggleBookmark("The Great Lands")
      })

      render(<Bookmarks />)

      // User searches in bookmarks
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "earth" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const results = store.getFilteredData(undefined, true)
        // Should only show bookmarked items with "earth"
        results.forEach((item) => {
          expect(item.isBookmarked).toBe(true)
          expect(item.title.toLowerCase()).toContain("earth")
        })
      })
    })
  })

  describe("Navigating between content categories", () => {
    it("user browses movies exclusively", () => {
      render(<Movies />)

      // User should only see movie content
      const store = useEntStore.getState()
      const movies = store.getFilteredData("Movie")

      expect(movies.length).toBeGreaterThan(0)
      movies.forEach((item) => {
        expect(item.category).toBe("Movie")
      })
    })

    it("user browses TV series exclusively", () => {
      render(<TVSeries />)

      // User should only see TV series content
      const store = useEntStore.getState()
      const tvShows = store.getFilteredData("TV Series")

      expect(tvShows.length).toBeGreaterThan(0)
      tvShows.forEach((item) => {
        expect(item.category).toBe("TV Series")
      })
    })

    it("user views bookmarked movies and TV shows separately", () => {
      // Setup: User bookmarks one of each category
      act(() => {
        const store = useEntStore.getState()
        const movie = store.entertainmentData.find((item) => item.category === "Movie")
        const tvShow = store.entertainmentData.find((item) => item.category === "TV Series")

        if (movie) store.toggleBookmark(movie.title)
        if (tvShow) store.toggleBookmark(tvShow.title)
      })

      render(<Bookmarks />)

      // User should see both categories in bookmarks
      expect(screen.getByText(/bookmarked movies/i)).toBeVisible()
      expect(screen.getByText(/bookmarked tv series/i)).toBeVisible()
    })
  })

  describe("Complex user scenarios", () => {
    it("user searches, bookmarks from results, then views saved content", async () => {
      // Step 1: User searches on home page
      const { unmount: unmountHome } = render(<Home />)
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "beyond" } })

      await waitFor(() => {
        expect(screen.getByText("Beyond Earth")).toBeVisible()
      })

      // Step 2: User bookmarks from search results
      const bookmarkButton = screen.getAllByRole("button", { name: /bookmark/i })[0]
      fireEvent.click(bookmarkButton)

      unmountHome()

      // Step 3: User navigates to bookmarks
      render(<Bookmarks />)

      // Step 4: User sees the bookmarked content
      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarkedItem = store.entertainmentData.find((item) => item.title === "Beyond Earth")
        expect(bookmarkedItem?.isBookmarked).toBe(true)
      })
    })

    it("user maintains search context when switching between pages", () => {
      // User searches on home page
      const { unmount: unmountHome } = render(<Home />)
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "land" } })

      const store = useEntStore.getState()
      expect(store.searchTerm).toBe("land")

      unmountHome()

      // User navigates to movies page - search should persist
      render(<Movies />)

      const moviesStore = useEntStore.getState()
      expect(moviesStore.searchTerm).toBe("land")

      // Results should still be filtered
      const movieResults = moviesStore.getFilteredData("Movie")
      movieResults.forEach((item) => {
        expect(item.title.toLowerCase()).toContain("land")
      })
    })
  })
})
