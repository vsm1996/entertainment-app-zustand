"use client"
import Input from "@/component/ui/input"
import { useEntertainmentStore } from "@/hooks/useEntertainmentStore"
import CardList from "@/component/ui/card-list"
import Pagination from "@/component/ui/pagination"

const Movies = () => {
  const { searchTerm, setSearchTerm, getFilteredData, hasHydrated, moviesPagination, setMoviesPage, getPaginatedData } =
    useEntertainmentStore()

  const filteredMovies = getFilteredData("Movie")

  const paginatedMovies = getPaginatedData(filteredMovies, moviesPagination.currentPage, moviesPagination.itemsPerPage)
  const totalPages = Math.ceil(filteredMovies.length / moviesPagination.itemsPerPage)

  if (!hasHydrated) return (<div><h1>Loading...</h1> </div>)

  return (
    <div className="w-full p-200 sm:p-300 md:p-400 col-start-1 flex flex-col gap-300">
      <Input searchTerm={searchTerm} handleChangeTerm={setSearchTerm} />
      <h1 className="text-1">Movies</h1>
      <CardList data={paginatedMovies} />
      <Pagination currentPage={moviesPagination.currentPage} totalPages={totalPages} onPageChange={setMoviesPage} />
    </div>
  )
}

export default Movies
