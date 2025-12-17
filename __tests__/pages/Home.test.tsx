import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Home from "@/app/(main)/page"
import { useEntStore } from "@/store"
import { act } from "react"

describe("Home Page - User Experience", () => {
  beforeEach(() => {
    act(() => {
      useEntStore.getState().setSearchTerm("")
    })
  })

  describe("Browsing content on the home page", () => {
    it("shows users trending content first", () => {
      render(<Home />)

      expect(screen.getByText("Trending")).toBeVisible()
    })

    it("shows recommended content below trending", () => {
      render(<Home />)

      expect(screen.getByText(/Reccommended for you/i)).toBeVisible()
    })

    it("displays trending content in a browsable carousel format", () => {
      render(<Home />)

      const trendingSection = screen.getByText("Trending")
      expect(trendingSection).toBeVisible()

      // Trending items should be displayed
      const store = useEntStore.getState()
      const trendingItems = store.getTrendingData()
      expect(trendingItems.length).toBeGreaterThan(0)
    })
  })

  describe("Searching from the home page", () => {
    it("provides a search box prominently for users", () => {
      render(<Home />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      expect(searchInput).toBeVisible()
      expect(searchInput).not.toBeDisabled()
    })

    it("shows filtered results when user searches", async () => {
      render(<Home />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "beyond earth" } })

      await waitFor(() => {
        expect(screen.getByText("Beyond Earth")).toBeVisible()
      })
    })

    it("returns to full catalog when search is cleared", async () => {
      render(<Home />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      // User searches
      fireEvent.change(searchInput, { target: { value: "xyz" } })

      // User clears search
      fireEvent.change(searchInput, { target: { value: "" } })

      await waitFor(() => {
        expect(screen.getByText("Trending")).toBeVisible()
        expect(screen.getByText(/Reccommended for you/i)).toBeVisible()
      })
    })

    it("shows no results gracefully when search has no matches", () => {
      render(<Home />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "zzznonexistentmovie999" } })

      // The page should still render without errors
      expect(screen.getByText("Trending")).toBeVisible()
    })
  })

  describe("Interacting with content", () => {
    it("allows users to bookmark trending content", async () => {
      render(<Home />)

      const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })
      expect(bookmarkButtons.length).toBeGreaterThan(0)

      // User can click bookmark buttons
      fireEvent.click(bookmarkButtons[0])

      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarked = store.entertainmentData.filter((item) => item.isBookmarked)
        expect(bookmarked.length).toBeGreaterThan(0)
      })
    })

    it("allows users to bookmark recommended content", async () => {
      render(<Home />)

      const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })

      // Find a bookmark button in the recommended section
      const recommendedButton = bookmarkButtons[bookmarkButtons.length - 1]
      fireEvent.click(recommendedButton)

      await waitFor(() => {
        const store = useEntStore.getState()
        const bookmarked = store.entertainmentData.filter((item) => item.isBookmarked)
        expect(bookmarked.length).toBeGreaterThan(0)
      })
    })
  })
})
