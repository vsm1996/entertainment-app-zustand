import type { ReactNode } from "react"

interface ContentGridProps {
  children: ReactNode
}

const ContentGrid = ({ children }: ContentGridProps) => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:pr-200 gap-200">{children}</div>
}

export default ContentGrid
