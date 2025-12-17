import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TVSeries from "@/app/(main)/tv-series/page"
import { useEntStore } from "@/store"
import { act } from "react"

describe("TV Series Page - User Experience", () => {
  beforeEach(() => {
    act(() => {
      useEntStore.getState().setSearchTerm("")
    })
  })

  describe("Browsing TV series", () => {
    it("shows only TV series content to users", () => {
      render(<TVSeries />)

      expect(screen.getByText("TV Series")).toBeVisible()

      const store = useEntStore.getState()
      const tvShows = store.getFilteredData("TV Series")

      expect(tvShows.length).toBeGreaterThan(0)
      tvShows.forEach((item) => {
        expect(item.category).toBe("TV Series")
      })
    })

    it("displays a complete catalog of available TV series", () => {
      render(<TVSeries />)

      const store = useEntStore.getState()
      const allTVShows = store.entertainmentData.filter((item) => item.category === "TV Series")
      const displayedShows = store.getFilteredData("TV Series")

      expect(displayedShows.length).toBe(allTVShows.length)
    })
  })

  describe("Searching within TV series", () => {
    it("allows users to search for specific shows", async () => {
      render(<TVSeries />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "night" } })

      await waitFor(() => {
        const store = useEntStore.getState()
        const results = store.getFilteredData("TV Series")

        results.forEach((show) => {
          expect(show.category).toBe("TV Series")
          expect(show.title.toLowerCase()).toContain("night")
        })
      })
    })

    it("shows all TV series when search is cleared", async () => {
      render(<TVSeries />)

      const store = useEntStore.getState()
      const totalShows = store.entertainmentData.filter((item) => item.category === "TV Series").length
      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      fireEvent.change(searchInput, { target: { value: "xyz" } })
      fireEvent.change(searchInput, { target: { value: "" } })

      await waitFor(() => {
        const shows = store.getFilteredData("TV Series")
        expect(shows.length).toBe(totalShows)
      })
    })
  })

  describe("Managing TV series bookmarks", () => {
    it("allows users to bookmark TV shows for later viewing", async () => {
      render(<TVSeries />)

      const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })
      expect(bookmarkButtons.length).toBeGreaterThan(0)

      fireEvent.click(bookmarkButtons[0])

      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarkedShows = store.getFilteredData("TV Series", true)
        expect(bookmarkedShows.length).toBeGreaterThan(0)
      })
    })
  })
})
