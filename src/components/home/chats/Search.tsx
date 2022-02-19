import React, { useState } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { ReactComponent as XIcon } from "../../../assets/icons/x-circle.svg"
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg"
import { ReactComponent as UserIcon } from "../../../assets/icons/user.svg"

interface ISearch extends RouteComponentProps {
  changeShowChat: (showChat: boolean) => void
}

const Search: React.FC<ISearch> = ({ changeShowChat, history }) => {
  const [searchParam, setSearchParam] = useState<string>("")

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value)
  }

  const chatWithSearchedUser = () => {
    history.push(searchParam)
    setSearchParam("")
    changeShowChat(true)
  }

  return (
    <div className="flex mb-1">
      <div className="flex items-center relative w-full dark:text-gray-200 mx-2">
        <SearchIcon className="absolute left-1.5 cursor-pointer w-5" />
        <input
          className="grow p-2 px-8 border-2 rounded-2xl border-white focus:border-2 focus:border-primary-700 bg-gray-200 dark:bg-transparent dark:focus:bg-black dark:placeholder-gray-200 dark:border-white focus:bg-white focus:outline-none"
          placeholder="Search for users..."
          type="text"
          autoComplete="off"
          value={searchParam}
          onChange={onChangeSearchInput}
        />
        {searchParam && (
          <XIcon
            onClick={() => setSearchParam("")}
            className="absolute right-2 cursor-pointer w-4 text-red-600"
          />
        )}
      </div>

      {searchParam && (
        <div className="fixed top-28 bottom-0 w-full md:w-96 bg-white dark:bg-dark-grey">
          <button
            onClick={chatWithSearchedUser}
            className="flex items-center w-full p-2 border-b dark:text-gray-200 dark:hover:bg-black hover:bg-gray-200"
          >
            <UserIcon className="mr-1" />
            <span>{searchParam}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default withRouter(Search)
