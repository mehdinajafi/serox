import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as XIcon } from "../../../assets/icons/x-circle.svg"
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg"
import { ReactComponent as UserIcon } from "../../../assets/icons/user.svg"

interface ISearch {
  changeShowChat: (showChat: boolean) => void
}

const Search: React.FC<ISearch> = ({ changeShowChat }) => {
  const [searchParam, setSearchParam] = useState<string>("")

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value)
  }

  return (
    <div className="relative w-full flex items-center">
      <div className="flex relative w-full dark:text-gray-200">
        <SearchIcon className="absolute top-2.5 left-1.5 cursor-pointer w-5" />
        <input
          className="px-8 flex-grow p-2 bg-gray-200 dark:bg-transparent dark:focus:bg-black dark:placeholder-gray-200 dark:border-white focus:bg-white focus:outline-none"
          placeholder="Search for users..."
          type="text"
          autoComplete="off"
          value={searchParam}
          onChange={onChangeSearchInput}
        />
        {searchParam && (
          <XIcon
            onClick={() => setSearchParam("")}
            className="absolute top-2.5 right-1 cursor-pointer w-5"
          />
        )}
      </div>

      {searchParam && (
        <div className="flex flex-col overflow-y-scroll hide-scrollbar fixed top-24 bottom-0 w-full md:w-96 bg-white dark:bg-dark-grey border">
          <Link
            to={searchParam}
            onClick={() => changeShowChat(true)}
            className="flex items-center p-2 border-b dark:text-gray-200 dark:hover:bg-black hover:bg-gray-200"
          >
            <UserIcon className="mr-1" />
            <span>{searchParam}</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Search
