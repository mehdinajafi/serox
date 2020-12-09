import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { firebase } from "../../../firebase/firebase"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"
import { ShowChatContext } from "../../../contexts/ShowChatContext"

const Search: React.FC = () => {
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

    firebase
      .database()
      .ref("users")
      .once("value")
      .then((data) => {
        const users = Object.keys(data.val())
        const filtredUsers: string[] | null = users.filter((username) =>
          username.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        )
        setUsersFound(
          filtredUsers.length === users.length ? null : filtredUsers
        )
      })
      .catch((error) => {
        alert(error.message)
      })
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
        <div className="flex flex-col w-full h-60vh overflow-y-scroll absolute top-14 bg-white border rounded">
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
