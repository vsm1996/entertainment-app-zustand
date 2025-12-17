"use client"
import Input from "@/component/ui/input"
import { useEntertainmentStore } from "@/hooks/useEntertainmentStore"
import CardList from "@/component/ui/card-list"
import Pagination from "@/component/ui/pagination"

const TVSeries = () => {
  const { searchTerm, setSearchTerm, hasHydrated, getFilteredData, tvSeriesPagination, setTVSeriesPage, getPaginatedData } =
    useEntertainmentStore()

  const filteredTVSeries = getFilteredData("TV Series")

  const paginatedTVSeries = getPaginatedData(
    filteredTVSeries,
    tvSeriesPagination.currentPage,
    tvSeriesPagination.itemsPerPage,
  )
  const totalPages = Math.ceil(filteredTVSeries.length / tvSeriesPagination.itemsPerPage)

  if (!hasHydrated) return (<div><h1>Loading...</h1> </div>)

  return (
    <div className="w-full p-200 sm:p-300 md:p-400 col-start-1 flex flex-col gap-300">
      <Input searchTerm={searchTerm} handleChangeTerm={setSearchTerm} />

      <h1 className="text-1">TV Series</h1>
      <CardList data={paginatedTVSeries} />
      <Pagination currentPage={tvSeriesPagination.currentPage} totalPages={totalPages} onPageChange={setTVSeriesPage} />
    </div>
  )
}

export default TVSeries
