import { Store, iNotification } from "react-notifications-component"

interface IOptions {
  title: string
  message: string
  type: iNotification["type"]
}

const showNotification = (options: IOptions) => {
  Store.addNotification({
    title: options.title,
    message: options.message,
    type: options.type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  })
}

export default showNotification
