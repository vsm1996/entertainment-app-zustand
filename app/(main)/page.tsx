"use client"

import { useEntertainmentStore } from "@/hooks/useEntertainmentStore"

import Carousel from "@/component/ui/carousel"
import Card from "@/component/ui/card"
import Input from "@/component/ui/input"
import CardList from "@/component/ui/card-list"
import Pagination from "@/component/ui/pagination"

export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    getTrendingData,
    getRecommendedData,
    getFilteredData,
    homePagination,
    setHomePage,
    getPaginatedData,
    hasHydrated,
  } = useEntertainmentStore()

  const trendingData = getTrendingData()
  const recommendedData = getRecommendedData()
  const allFilteredData = getFilteredData()

  const paginatedRecommendedData = getPaginatedData(
    recommendedData,
    homePagination.currentPage,
    homePagination.itemsPerPage,
  )
  const totalPages = Math.ceil(recommendedData.length / homePagination.itemsPerPage)

  if (!hasHydrated) return (<div><h1>Loading...</h1> </div>)

  return (
    <main className="px-200 py-300 md:px-0 grid grid-rows-[max-content_max-content_max-content] gap-300 text-white">
      <Input searchTerm={searchTerm} handleChangeTerm={setSearchTerm} />

      {searchTerm ? (
        <>
          <div className="overflow-hidden w-full col-start-1 flex flex-col gap-300">
            <h1 className="text-1">Trending</h1>
          </div>

          <div className="col-start-1 flex flex-col gap-300">
            <CardList data={allFilteredData} />
          </div>
        </>
      ) : (
        <>
          <div className="overflow-hidden w-full col-start-1 flex flex-col gap-300">
            <h1 className="text-1">Trending</h1>

            <Carousel
              items={[
                ...trendingData.map(({ title, thumbnail, year, category, rating, isTrending }) => (
                  <Card
                    key={title}
                    title={title}
                    thumbnail={thumbnail}
                    year={year}
                    category={category}
                    isTrending={isTrending}
                    rating={rating}
                  />
                )),
              ]}
            />
          </div>

          <div className="col-start-1 flex flex-col gap-300">
            <h2 className="text-1">Reccommended for you</h2>
            <CardList data={paginatedRecommendedData} />
            <Pagination currentPage={homePagination.currentPage} totalPages={totalPages} onPageChange={setHomePage} />
          </div>
        </>
      )}
    </main>
  )
}
