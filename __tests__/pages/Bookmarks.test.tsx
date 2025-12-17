import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Bookmarks from "@/app/(main)/bookmarks/page"
import { useEntStore } from "@/store"
import { act } from "react"

describe("Bookmarks Page - User Experience", () => {
  beforeEach(() => {
    act(() => {
      const store = useEntStore.getState()
      store.setSearchTerm("")

      // Clear all bookmarks
      store.entertainmentData.forEach((item) => {
        if (item.isBookmarked) {
          store.toggleBookmark(item.title)
        }
      })
    })
  })

  describe("Viewing saved content", () => {
    it("organizes bookmarks by content type for easy browsing", () => {
      render(<Bookmarks />)

      expect(screen.getByText("Bookmarked Movies")).toBeVisible()
      expect(screen.getByText("Bookmarked TV Series")).toBeVisible()
    })

    it("shows users their bookmarked movies", () => {
      // Setup: User has bookmarked a movie
      act(() => {
        const store = useEntStore.getState()
        const movie = store.entertainmentData.find((item) => item.category === "Movie")
        if (movie) {
          store.toggleBookmark(movie.title)
        }
      })

      render(<Bookmarks />)

      const store = useEntStore.getState()
      const bookmarkedMovies = store.getFilteredData("Movie", true)

      expect(bookmarkedMovies.length).toBeGreaterThan(0)
      bookmarkedMovies.forEach((item) => {
        expect(item.category).toBe("Movie")
        expect(item.isBookmarked).toBe(true)
      })
    })

    it("shows users their bookmarked TV series", () => {
      // Setup: User has bookmarked a TV show
      act(() => {
        const store = useEntStore.getState()
        const tvShow = store.entertainmentData.find((item) => item.category === "TV Series")
        if (tvShow) {
          store.toggleBookmark(tvShow.title)
        }
      })

      render(<Bookmarks />)

      const store = useEntStore.getState()
      const bookmarkedTV = store.getFilteredData("TV Series", true)

      expect(bookmarkedTV.length).toBeGreaterThan(0)
      bookmarkedTV.forEach((item) => {
        expect(item.category).toBe("TV Series")
        expect(item.isBookmarked).toBe(true)
      })
    })

    it("shows an empty state when user has no bookmarks", () => {
      render(<Bookmarks />)

      const store = useEntStore.getState()
      const allBookmarks = store.getFilteredData(undefined, true)

      // No bookmarks initially
      expect(allBookmarks.length).toBe(0)
    })
  })

  describe("Searching bookmarked content", () => {
    it("allows users to search within their bookmarks", async () => {
      // Setup: User has bookmarked items
      act(() => {
        const store = useEntStore.getState()
        store.toggleBookmark("Beyond Earth")
        store.toggleBookmark("The Great Lands")
      })

      render(<Bookmarks />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "earth" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const results = store.getFilteredData(undefined, true)

        results.forEach((item) => {
          expect(item.isBookmarked).toBe(true)
          expect(item.title.toLowerCase()).toContain("earth")
        })
      })
    })

    it("filters bookmarked movies and TV shows separately", async () => {
      // Setup: Bookmark items from both categories
      act(() => {
        const store = useEntStore.getState()
        const movie = store.entertainmentData.find(
          (item) => item.category === "Movie" && item.title.toLowerCase().includes("the"),
        )
        const tvShow = store.entertainmentData.find(
          (item) => item.category === "TV Series" && item.title.toLowerCase().includes("the"),
        )

        if (movie) store.toggleBookmark(movie.title)
        if (tvShow) store.toggleBookmark(tvShow.title)
      })

      render(<Bookmarks />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "the" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const movieResults = store.getFilteredData("Movie", true)
        const tvResults = store.getFilteredData("TV Series", true)

        movieResults.forEach((item) => {
          expect(item.category).toBe("Movie")
          expect(item.isBookmarked).toBe(true)
          expect(item.title.toLowerCase()).toContain("the")
        })

        tvResults.forEach((item) => {
          expect(item.category).toBe("TV Series")
          expect(item.isBookmarked).toBe(true)
          expect(item.title.toLowerCase()).toContain("the")
        })
      })
    })
  })

  describe("Managing bookmarks", () => {
    it("allows users to remove bookmarks directly from this page", async () => {
      // Setup: User has bookmarked content
      act(() => {
        const store = useEntStore.getState()
        store.toggleBookmark("Beyond Earth")
      })

      render(<Bookmarks />)

      const bookmarkButton = screen.getAllByRole("button", { name: /bookmark/i })[0]
      fireEvent.click(bookmarkButton)

      await waitFor(() => {
        const store = useEntStore.getState()
        const item = store.entertainmentData.find((i) => i.title === "Beyond Earth")
        expect(item?.isBookmarked).toBe(false)
      })
    })
  })
})
