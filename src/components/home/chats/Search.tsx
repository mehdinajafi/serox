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
    <div className="relative w-full h-10vh flex items-center">
      <div className="relative w-full mx-1">
        <input
          id="searchInput"
          className="w-full p-2 border border-gray-500 rounded focus:outline-none"
          placeholder="Search"
          type="text"
          onInput={(e) => SearchBetweenUsers(e)}
        />
        <XIcon
          onClick={closeSearching}
          className="absolute top-0.5 right-0 cursor-pointer w-10 text-gray-500"
        />
      </div>

      {showResults && (
        <div className="flex flex-col w-full h-70vh overflow-y-scroll absolute top-14 bg-white border rounded">
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
