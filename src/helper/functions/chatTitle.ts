import { validate as uuidValidate } from "uuid"

const chatTitle = (
  targetUsername: string,
  currentUsername: string | null | undefined
) => {
  if (targetUsername === currentUsername) {
    return "Saved Messages"
  } else if (uuidValidate(targetUsername)) {
    return `AU-${targetUsername.slice(24, 36)}`
  } else {
    return targetUsername
  }
}

export default chatTitle
