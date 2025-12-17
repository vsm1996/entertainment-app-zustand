import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { ItemProp } from "@/utils/types"

interface StateProps {
  entertainmentData: ItemProp[]
  hasHydrated: boolean
  searchTerm: string
  homePagination: { currentPage: number; itemsPerPage: number }
  moviesPagination: { currentPage: number; itemsPerPage: number }
  tvSeriesPagination: { currentPage: number; itemsPerPage: number }
  toggleBookmark: (title: string) => void
  setSearchTerm: (term: string) => void
  getFilteredData: (category?: string, bookmarkedOnly?: boolean) => ItemProp[]
  getTrendingData: () => ItemProp[]
  getRecommendedData: () => ItemProp[]
  setHomePage: (page: number) => void
  setMoviesPage: (page: number) => void
  setTVSeriesPage: (page: number) => void
  getPaginatedData: (data: ItemProp[], currentPage: number, itemsPerPage: number) => ItemProp[]
}

export const useEntStore = create<StateProps>()(
  persist(
    (set, get) => ({
      entertainmentData: [
        {
          title: "Beyond Earth",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/beyond-earth/trending/small.jpg",
              large: "/assets/thumbnails/beyond-earth/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/beyond-earth/regular/small.jpg",
              medium: "/assets/thumbnails/beyond-earth/regular/medium.jpg",
              large: "/assets/thumbnails/beyond-earth/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Bottom Gear",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/bottom-gear/trending/small.jpg",
              large: "/assets/thumbnails/bottom-gear/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/bottom-gear/regular/small.jpg",
              medium: "/assets/thumbnails/bottom-gear/regular/medium.jpg",
              large: "/assets/thumbnails/bottom-gear/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Undiscovered Cities",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/undiscovered-cities/trending/small.jpg",
              large: "/assets/thumbnails/undiscovered-cities/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/undiscovered-cities/regular/small.jpg",
              medium: "/assets/thumbnails/undiscovered-cities/regular/medium.jpg",
              large: "/assets/thumbnails/undiscovered-cities/regular/large.jpg",
            },
          },
          year: 2019,
          category: "TV Series",
          rating: "E",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "1998",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/1998/trending/small.jpg",
              large: "/assets/thumbnails/1998/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/1998/regular/small.jpg",
              medium: "/assets/thumbnails/1998/regular/medium.jpg",
              large: "/assets/thumbnails/1998/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "18+",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Dark Side of the Moon",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/dark-side-of-the-moon/trending/small.jpg",
              large: "/assets/thumbnails/dark-side-of-the-moon/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/dark-side-of-the-moon/regular/small.jpg",
              medium: "/assets/thumbnails/dark-side-of-the-moon/regular/medium.jpg",
              large: "/assets/thumbnails/dark-side-of-the-moon/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "PG",
          isBookmarked: true,
          isTrending: true,
        },
        {
          title: "The Great Lands",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-great-lands/regular/small.jpg",
              medium: "/assets/thumbnails/the-great-lands/regular/medium.jpg",
              large: "/assets/thumbnails/the-great-lands/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Diary",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-diary/regular/small.jpg",
              medium: "/assets/thumbnails/the-diary/regular/medium.jpg",
              large: "/assets/thumbnails/the-diary/regular/large.jpg",
            },
          },
          year: 2019,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Earth's Untouched",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/earths-untouched/regular/small.jpg",
              medium: "/assets/thumbnails/earths-untouched/regular/medium.jpg",
              large: "/assets/thumbnails/earths-untouched/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "No Land Beyond",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/no-land-beyond/regular/small.jpg",
              medium: "/assets/thumbnails/no-land-beyond/regular/medium.jpg",
              large: "/assets/thumbnails/no-land-beyond/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "During the Hunt",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/during-the-hunt/regular/small.jpg",
              medium: "/assets/thumbnails/during-the-hunt/regular/medium.jpg",
              large: "/assets/thumbnails/during-the-hunt/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Autosport the Series",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/autosport-the-series/regular/small.jpg",
              medium: "/assets/thumbnails/autosport-the-series/regular/medium.jpg",
              large: "/assets/thumbnails/autosport-the-series/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Same Answer II",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/same-answer-2/regular/small.jpg",
              medium: "/assets/thumbnails/same-answer-2/regular/medium.jpg",
              large: "/assets/thumbnails/same-answer-2/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Below Echo",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/below-echo/regular/small.jpg",
              medium: "/assets/thumbnails/below-echo/regular/medium.jpg",
              large: "/assets/thumbnails/below-echo/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Rockies",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-rockies/regular/small.jpg",
              medium: "/assets/thumbnails/the-rockies/regular/medium.jpg",
              large: "/assets/thumbnails/the-rockies/regular/large.jpg",
            },
          },
          year: 2015,
          category: "TV Series",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Relentless",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/relentless/regular/small.jpg",
              medium: "/assets/thumbnails/relentless/regular/medium.jpg",
              large: "/assets/thumbnails/relentless/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Community of Ours",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/community-of-ours/regular/small.jpg",
              medium: "/assets/thumbnails/community-of-ours/regular/medium.jpg",
              large: "/assets/thumbnails/community-of-ours/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Van Life",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/van-life/regular/small.jpg",
              medium: "/assets/thumbnails/van-life/regular/medium.jpg",
              large: "/assets/thumbnails/van-life/regular/large.jpg",
            },
          },
          year: 2015,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Heiress",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-heiress/regular/small.jpg",
              medium: "/assets/thumbnails/the-heiress/regular/medium.jpg",
              large: "/assets/thumbnails/the-heiress/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Off the Track",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/off-the-track/regular/small.jpg",
              medium: "/assets/thumbnails/off-the-track/regular/medium.jpg",
              large: "/assets/thumbnails/off-the-track/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Whispering Hill",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/whispering-hill/regular/small.jpg",
              medium: "/assets/thumbnails/whispering-hill/regular/medium.jpg",
              large: "/assets/thumbnails/whispering-hill/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "112",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/112/regular/small.jpg",
              medium: "/assets/thumbnails/112/regular/medium.jpg",
              large: "/assets/thumbnails/112/regular/large.jpg",
            },
          },
          year: 2013,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Lone Heart",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/lone-heart/regular/small.jpg",
              medium: "/assets/thumbnails/lone-heart/regular/medium.jpg",
              large: "/assets/thumbnails/lone-heart/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Production Line",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/production-line/regular/small.jpg",
              medium: "/assets/thumbnails/production-line/regular/medium.jpg",
              large: "/assets/thumbnails/production-line/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Dogs",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/dogs/regular/small.jpg",
              medium: "/assets/thumbnails/dogs/regular/medium.jpg",
              large: "/assets/thumbnails/dogs/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Asia in 24 Days",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/asia-in-24-days/regular/small.jpg",
              medium: "/assets/thumbnails/asia-in-24-days/regular/medium.jpg",
              large: "/assets/thumbnails/asia-in-24-days/regular/large.jpg",
            },
          },
          year: 2020,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Tasty Tour",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-tasty-tour/regular/small.jpg",
              medium: "/assets/thumbnails/the-tasty-tour/regular/medium.jpg",
              large: "/assets/thumbnails/the-tasty-tour/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Darker",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/darker/regular/small.jpg",
              medium: "/assets/thumbnails/darker/regular/medium.jpg",
              large: "/assets/thumbnails/darker/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Unresolved Cases",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/unresolved-cases/regular/small.jpg",
              medium: "/assets/thumbnails/unresolved-cases/regular/medium.jpg",
              large: "/assets/thumbnails/unresolved-cases/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Mission: Saturn",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/mission-saturn/regular/small.jpg",
              medium: "/assets/thumbnails/mission-saturn/regular/medium.jpg",
              large: "/assets/thumbnails/mission-saturn/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
      ],
      searchTerm: "",
      homePagination: { currentPage: 1, itemsPerPage: 12 },
      moviesPagination: { currentPage: 1, itemsPerPage: 12 },
      tvSeriesPagination: { currentPage: 1, itemsPerPage: 12 },
      hasHydrated: false,

      toggleBookmark: (title) =>
        set((state) => ({
          entertainmentData: state.entertainmentData.map((ent) =>
            ent.title === title
              ? { ...ent, isBookmarked: !ent.isBookmarked }
              : ent
          ),
        })),

      setSearchTerm: (term) => set({ searchTerm: term }),

      getFilteredData: (category, bookmarkedOnly) => {
        const { entertainmentData, searchTerm } = get()
        let filtered = entertainmentData

        if (searchTerm) {
          filtered = filtered.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        if (category) {
          filtered = filtered.filter((item) => item.category === category)
        }

        if (bookmarkedOnly) {
          filtered = filtered.filter((item) => item.isBookmarked)
        }

        return filtered
      },

      getTrendingData: () =>
        get().getFilteredData().filter((item) => item.isTrending),

      getRecommendedData: () =>
        get().getFilteredData().filter((item) => !item.isTrending),

      setHomePage: (page) =>
        set((state) => ({
          homePagination: { ...state.homePagination, currentPage: page },
        })),

      setMoviesPage: (page) =>
        set((state) => ({
          moviesPagination: { ...state.moviesPagination, currentPage: page },
        })),

      setTVSeriesPage: (page) =>
        set((state) => ({
          tvSeriesPagination: { ...state.tvSeriesPagination, currentPage: page },
        })),

      getPaginatedData: (data, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
      },
    }),
    {
      name: "entertainment-store",
      partialize: (state) => ({
        entertainmentData: state.entertainmentData,
        searchTerm: state.searchTerm,
        homePagination: state.homePagination,
        moviesPagination: state.moviesPagination,
        tvSeriesPagination: state.tvSeriesPagination,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true
        }
      },
    }
  )
)