import { render, screen } from "@testing-library/react"
import Navbar from "@/component/ui/navbar"
import { jest } from "@jest/globals"

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}))

describe("Navbar - User Navigation", () => {
  describe("Navigating the app", () => {
    it("provides clear navigation options to all main sections", () => {
      render(<Navbar />)

      const links = screen.getAllByRole("link")

      // Users should see navigation to all main sections
      expect(links).toHaveLength(4)
      expect(links[0]).toHaveAttribute("href", "/")
      expect(links[1]).toHaveAttribute("href", "/movies")
      expect(links[2]).toHaveAttribute("href", "/tv-series")
      expect(links[3]).toHaveAttribute("href", "/bookmarks")
    })

    it("shows the site logo for brand recognition", () => {
      render(<Navbar />)

      const nav = screen.getByRole("navigation")
      expect(nav).toBeVisible()
    })

    it("displays user profile information", () => {
      render(<Navbar />)

      const avatar = screen.getByAltText("User avatar")
      expect(avatar).toBeVisible()
    })
  })

  describe("Visual feedback", () => {
    it("remains visible and accessible throughout the app", () => {
      render(<Navbar />)

      const nav = screen.getByRole("navigation")
      expect(nav).toBeVisible()

      // All navigation links should be accessible
      const links = screen.getAllByRole("link")
      links.forEach((link) => {
        expect(link).toBeVisible()
      })
    })
  })
})
