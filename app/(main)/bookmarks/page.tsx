"use client"
import Input from "@/component/ui/input"
import { useEntertainmentStore } from "@/hooks/useEntertainmentStore"
import CardList from "@/component/ui/card-list"

const Bookmarks = () => {
  const { searchTerm, hasHydrated, setSearchTerm, getFilteredData } = useEntertainmentStore()

  const bookmarkedMovies = getFilteredData("Movie", true)
  const bookmarkedTVSeries = getFilteredData("TV Series", true)

  if (!hasHydrated) return (<div><h1>Loading...</h1> </div>)

  return (
    <div className="w-full p-200 sm:p-300 md:p-400 col-start-1 flex flex-col gap-300">
      <Input searchTerm={searchTerm} handleChangeTerm={setSearchTerm} />

      {bookmarkedMovies && (
        <>
          <h1 className="text-1">Bookmarked Movies</h1>
          <CardList data={bookmarkedMovies} />
        </>
      )}

      {bookmarkedTVSeries && (
        <>
          <h1 className="text-1">Bookmarked TV Series</h1>
          <CardList data={bookmarkedTVSeries} />
        </>
      )}
    </div>
  )
}

export default Bookmarks
