import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import { UsersContext } from "../../../contexts/UsersDataContext"

const Search: React.FC = () => {
  const { usersData } = useContext(UsersContext)
  const { setShowChat } = useContext(ShowChatContext)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [usersFound, setUsersFound] = useState<string[] | null>(null)

  const SearchBetweenUsers = (e: React.FormEvent<HTMLInputElement>) => {
    let inputValue: string = e.currentTarget.value

    if (inputValue.trim() === "") {
      setShowResults(false)
    } else {
      setShowResults(true)
    }

    if (usersData) {
      const usernames = Object.keys(usersData)
      const filtredUsers: string[] | null = usernames.filter((username) =>
        username.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      )
      setUsersFound(
        filtredUsers.length === usernames.length ? null : filtredUsers
      )
    }
  }

  const closeSearching = () => {
    const searchInput = document.querySelector(
      "#searchInput"
    ) as HTMLInputElement
    searchInput.value = ""

    setShowResults(false)
  }

  return (
    <div className="relative w-full flex items-center">
      <div className="flex relative w-full">
        <input
          id="searchInput"
          className="flex-grow p-2 bg-gray-200 focus:bg-white focus:outline-none"
          placeholder="Search for users..."
          type="text"
          onInput={(e) => SearchBetweenUsers(e)}
        />
        <XIcon
          onClick={closeSearching}
          className="absolute top-0.5 right-1.5 cursor-pointer w-10"
        />
      </div>
      {showResults && (
        <div className="flex flex-col overflow-y-scroll hide-scrollbar fixed top-24 bottom-0 w-full md:w-96 bg-white border">
          {usersFound &&
            usersFound.map((username) => (
              <Link
                to={username}
                key={username}
                onClick={() => setShowChat(true)}
                className="p-2 border-b hover:bg-gray-200"
              >
                {username}
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default Search
