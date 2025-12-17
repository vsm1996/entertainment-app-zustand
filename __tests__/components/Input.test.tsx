import { render, screen, fireEvent } from "@testing-library/react"
import Input from "@/component/ui/input"
import { useEntStore } from "@/store"

describe("Search Input - User Behavior", () => {
  beforeEach(() => {
    // Reset search state
    useEntStore.getState().setSearchTerm("")
  })

  describe("Searching for content", () => {
    it("allows users to type search queries", () => {
      const handleChange = (term: string) => useEntStore.getState().setSearchTerm(term)
      render(<Input searchTerm="" handleChangeTerm={handleChange} />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      fireEvent.change(searchInput, { target: { value: "earth" } })

      expect(searchInput).toHaveValue("earth")
    })

    it("converts search queries to lowercase for consistency", () => {
      let capturedTerm = ""
      const handleChange = (term: string) => {
        capturedTerm = term
      }

      render(<Input searchTerm="" handleChangeTerm={handleChange} />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)
      fireEvent.change(searchInput, { target: { value: "EARTH" } })

      expect(capturedTerm).toBe("earth")
    })

    it("shows the current search term to users", () => {
      const handleChange = () => {}
      render(<Input searchTerm="space adventure" handleChangeTerm={handleChange} />)

      const searchInput = screen.getByDisplayValue("space adventure")
      expect(searchInput).toBeVisible()
    })

    it("allows users to clear their search", () => {
      const handleChange = (term: string) => useEntStore.getState().setSearchTerm(term)
      render(<Input searchTerm="earth" handleChangeTerm={handleChange} />)

      const searchInput = screen.getByPlaceholderText(/Search for movies of TV Series/i)

      fireEvent.change(searchInput, { target: { value: "" } })

      expect(searchInput).toHaveValue("")
    })

    it("provides clear placeholder text to guide users", () => {
      const handleChange = () => {}
      render(<Input searchTerm="" handleChangeTerm={handleChange} />)

      expect(screen.getByPlaceholderText(/Search for movies of TV Series/i)).toBeVisible()
    })
  })
})
