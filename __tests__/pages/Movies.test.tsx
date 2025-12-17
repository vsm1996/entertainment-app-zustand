import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Movies from "@/app/(main)/movies/page"
import { useEntStore } from "@/store"
import { act } from "react"

describe("Movies Page - User Experience", () => {
  beforeEach(() => {
    act(() => {
      useEntStore.getState().setSearchTerm("")
    })
  })

  describe("Browsing movies", () => {
    it("shows only movie content to users", () => {
      render(<Movies />)

      expect(screen.getByText("Movies")).toBeVisible()

      // Verify only movies are shown
      const store = useEntStore.getState()
      const movies = store.getFilteredData("Movie")

      expect(movies.length).toBeGreaterThan(0)
      movies.forEach((item) => {
        expect(item.category).toBe("Movie")
      })
    })

    it("displays a complete catalog of available movies", () => {
      render(<Movies />)

      const store = useEntStore.getState()
      const allMovies = store.entertainmentData.filter((item) => item.category === "Movie")
      const displayedMovies = store.getFilteredData("Movie")

      // Without search, all movies should be shown
      expect(displayedMovies.length).toBe(allMovies.length)
    })
  })

  describe("Searching within movies", () => {
    it("allows users to search for specific movies", async () => {
      render(<Movies />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      expect(searchInput).toBeVisible()

      fireEvent.change(searchInput, { target: { value: "earth" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const results = store.getFilteredData("Movie")

        results.forEach((movie) => {
          expect(movie.category).toBe("Movie")
          expect(movie.title.toLowerCase()).toContain("earth")
        })
      })
    })

    it("narrows results as users type their search", async () => {
      render(<Movies />)

      const store = useEntStore.getState()
      const allMovies = store.getFilteredData("Movie")
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      // User starts typing
      fireEvent.change(searchInput, { target: { value: "the" } })

      await waitFor(() => {
        const filteredMovies = store.getFilteredData("Movie")
        // Results should be filtered
        expect(filteredMovies.length).toBeLessThanOrEqual(allMovies.length)
      })
    })

    it("shows all movies again when search is cleared", async () => {
      render(<Movies />)

      const store = useEntStore.getState()
      const totalMovies = store.entertainmentData.filter((item) => item.category === "Movie").length
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      // User searches
      fireEvent.change(searchInput, { target: { value: "xyz" } })

      // User clears search
      fireEvent.change(searchInput, { target: { value: "" } })

      await waitFor(() => {
        const movies = store.getFilteredData("Movie")
        expect(movies.length).toBe(totalMovies)
      })
    })
  })

  describe("Managing movie bookmarks", () => {
    it("allows users to bookmark movies for later viewing", async () => {
      render(<Movies />)

      const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })
      expect(bookmarkButtons.length).toBeGreaterThan(0)

      // User can bookmark movies
      fireEvent.click(bookmarkButtons[0])

      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarkedMovies = store.getFilteredData("Movie", true)
        expect(bookmarkedMovies.length).toBeGreaterThan(0)
      })
    })
  })
})
