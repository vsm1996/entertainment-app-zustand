import { render, screen, fireEvent } from "@testing-library/react"
import CardList from "@/component/ui/card-list"
import { mockEntertainmentItem } from "../utils/test-helpers"
import { jest } from "@jest/globals"

describe("CardList Component", () => {
  const mockToggleBookmark = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render multiple cards", () => {
    const data = [mockEntertainmentItem, { ...mockEntertainmentItem, title: "Test Movie 2" }]

    render(<CardList data={data} onToggleBookmark={mockToggleBookmark} />)

    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument()
  })

  it("should call onToggleBookmark with correct title", () => {
    const data = [mockEntertainmentItem]

    render(<CardList data={data} onToggleBookmark={mockToggleBookmark} />)

    const bookmarkButton = screen.getByRole("button")
    fireEvent.click(bookmarkButton)

    expect(mockToggleBookmark).toHaveBeenCalledWith("Test Movie")
  })

  it("should render empty grid when no data", () => {
    const { container } = render(<CardList data={[]} onToggleBookmark={mockToggleBookmark} />)

    expect(container.querySelector(".grid")).toBeInTheDocument()
  })
})
