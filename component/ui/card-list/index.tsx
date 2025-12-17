"use client"
import Card from "@/component/ui/card"
import ContentGrid from "@/component/ui/content-grid"
import type { ItemProp } from "@/utils/types"

interface CardListProps {
  data: ItemProp[]
}

const CardList = ({ data }: CardListProps) => {
  return (
    <ContentGrid>
      {data.map(({ title, thumbnail, year, category, rating, isTrending }) => (
        <Card
          key={title}
          title={title}
          thumbnail={thumbnail}
          year={year}
          category={category}
          rating={rating}
          isTrending={isTrending}
        />
      ))}
    </ContentGrid>
  )
}

export default CardList
