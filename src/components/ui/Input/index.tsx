import { InputHTMLAttributes } from "react"

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline dark:bg-transparent dark:text-gray-300"
    />
  )
}

export default Input
