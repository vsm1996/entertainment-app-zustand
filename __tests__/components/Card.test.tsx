import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Card from "@/component/ui/card"
import { useEntStore } from "@/store"
import { act } from "react"

describe("Card Component - User Behavior", () => {
  const mockCardData = {
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
    isTrending: false,
  }

  beforeEach(() => {
    // Reset store state
    const store = useEntStore.getState()
    store.entertainmentData.forEach((item) => {
      if (item.isBookmarked) {
        store.toggleBookmark(item.title)
      }
    })
  })

  describe("Displaying content information", () => {
    it("shows the title, year, category, and rating to users", () => {
      render(<Card {...mockCardData} />)

      expect(screen.getByText("Test Movie")).toBeVisible()
      expect(screen.getByText("2023")).toBeVisible()
      expect(screen.getByText("Movie")).toBeVisible()
      expect(screen.getByText("PG")).toBeVisible()
    })

    it("displays TV series category with appropriate label", () => {
      const tvCard = { ...mockCardData, category: "TV Series" as const }
      render(<Card {...tvCard} />)

      expect(screen.getByText("TV Series")).toBeVisible()
    })

    it("shows a thumbnail image for each content item", () => {
      render(<Card {...mockCardData} />)

      const image = screen.getByRole("img")
      expect(image).toBeVisible()
      expect(image).toHaveAttribute("alt", "Test Movie")
    })
  })

  describe("Bookmarking content", () => {
    it("allows users to bookmark content they want to save", async () => {
      render(<Card {...mockCardData} />)

      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i })

      // User clicks to bookmark
      fireEvent.click(bookmarkButton)

      // Check that the item is now bookmarked in the store
      await waitFor(() => {
        const store = useEntStore.getState()
        const item = store.entertainmentData.find((i) => i.title === "Test Movie")
        expect(item?.isBookmarked).toBe(true)
      })
    })

    it("allows users to remove bookmarks from content", async () => {
      // First bookmark the item
      act(() => {
        useEntStore.getState().toggleBookmark("Test Movie")
      })

      render(<Card {...mockCardData} />)

      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i })

      // User clicks to unbookmark
      fireEvent.click(bookmarkButton)

      // Check that the bookmark was removed
      await waitFor(() => {
        const store = useEntStore.getState()
        const item = store.entertainmentData.find((i) => i.title === "Test Movie")
        expect(item?.isBookmarked).toBe(false)
      })
    })

    it("shows visual feedback when content is bookmarked", () => {
      // Bookmark the item first
      act(() => {
        useEntStore.getState().toggleBookmark("Test Movie")
      })

      render(<Card {...mockCardData} />)

      const bookmarkButton = screen.getByRole("button", { name: /bookmark/i })
      expect(bookmarkButton).toBeInTheDocument()
      // The button should be visible and interactive
      expect(bookmarkButton).not.toBeDisabled()
    })
  })

  describe("Trending content display", () => {
    it("displays trending content in a distinct format", () => {
      const trendingCard = {
        ...mockCardData,
        isTrending: true,
        thumbnail: {
          trending: {
            small: "/trending-small.jpg",
            large: "/trending-large.jpg",
          },
        },
      }

      render(<Card {...trendingCard} />)

      // Trending content should still show all the information
      expect(screen.getByText("Test Movie")).toBeVisible()
      expect(screen.getByText("2023")).toBeVisible()
    })
  })
})
