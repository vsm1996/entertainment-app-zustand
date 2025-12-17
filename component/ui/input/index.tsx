"use client"

import type { ChangeEvent } from "react"
import SearchIcon from "../icons/SearchIcon"

interface InputProps {
  searchTerm: string
  handleChangeTerm: (searchTerm: string) => {}
}

const Input = ({ searchTerm, handleChangeTerm }: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value
    handleChangeTerm(newTerm.toLocaleLowerCase())
  }

  return (
    <div className="col-start-1 flex items-center gap-400">
      <SearchIcon />
      <input
        className="caret-red-500 w-full text-2 outline-none pb-200 pr-100 border-b-1 border-b-transparent focus:text-white focus:border-b-1 focus:border-b-blue-500"
        placeholder="Search for movies of TV Series"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default Input
