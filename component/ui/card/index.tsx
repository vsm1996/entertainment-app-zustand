"use client"
import Image from "next/image"
import { useEntStore } from "@/store"
import BookmarkIcon from "@/component/ui/icons/BookmarkIcon"
import MovieIcon from "@/component/ui/icons/MovieIcon"
import TVIcon from "@/component/ui/icons/TVIcon"
import { usePathname } from "next/navigation"

interface CardProps {
  title: string
  thumbnail: {
    trending?: {
      small: string
      large: string
    }
    regular?: {
      small: string
      medium: string
      large: string
    }
  }
  year: number
  category: any
  rating: string
  isTrending?: boolean
  index?: number
}

const Card = ({ title, thumbnail, year, category, rating, index, isTrending = false }: CardProps) => {
  const pathname = usePathname()
  const isBookmarked = useEntStore(
    (state) => state.entertainmentData.find((item) => item.title === title)?.isBookmarked || false,
  )
  const toggleBookmark = useEntStore((state) => state.toggleBookmark)
  const searchTerm = useEntStore((state) => state.searchTerm)

  const handleBookmarkClick = () => {
    toggleBookmark(title)
  }

  return (
    <div
      className={`${isTrending && pathname === '/' ? "grid place-content-center peer overflow-hidden rounded-(--spacing-100)"
        : "w-full h-full flex flex-col items-stretch transition-all duration-400 ease-out hover:scale-95"
        } items-start gap-100 group`}
    >
      <div className={`${isTrending && pathname === '/' && !searchTerm && "row-1 col-1"} h-full relative overflow-hidden rounded-(--spacing-100) peer`}>
        <button
          className="cursor-pointer p-200 z-10 absolute top-100 right-100 rounded-full overflow-hidden bg-blue-950/50 hover:bg-white transition-all duration-300 ease-out group/bookmark text-white hover:text-blue-950"
          onClick={handleBookmarkClick}
        >
          <BookmarkIcon fill={isBookmarked ? "currentColor" : "none"} />
        </button>
        {thumbnail && (
          <Image
            width={isTrending && pathname === '/' && !searchTerm ? 470 : 280}
            height={isTrending && pathname === '/' && !searchTerm ? 230 : 420}
            className={`${!isTrending && "w-full"} peer`}
            src={thumbnail.regular?.large || thumbnail.trending?.large || ""}
            alt={title}
          />
        )}
      </div>

      <div
        className={`${isTrending && pathname === '/' && !searchTerm
          ? "z-20 row-1 col-1 place-self-end p-200 bg-blue-950/50 rounded-(--spacing-100) flex flex-col gap-200 mb-200 mr-200 transition-all duration-400 ease-out peer-hover:-translate-y-4 peer-hover:bg-blue-950/65 "
          : "flex flex-col gap-100"
          }`}
      >
        <div className="flex flex-row items-center gap-100 text-6 text-white/75">
          <p>{year}</p>
          <span>&middot;</span>
          <div className="flex flex-row items-center gap-100">
            {category === "Movie" ? <MovieIcon fill="#FFF" /> : <TVIcon fill="#FFF" />}
            <p>{category}</p>
          </div>
          <span>&middot;</span>
          <p>{rating}</p>
        </div>

        <p className="text-4 text-white">{title}</p>
      </div>
    </div>
  )
}

export default Card
