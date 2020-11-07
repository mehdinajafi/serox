import React, { useContext } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"

type PrivateRouteProps = {
  component: React.FC<RouteProps>
  exact: boolean
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  exact,
  path,
}) => {
  const { currentUser } = useContext(UserContext)
  return (
    <Route
      exact={exact}
      path={path}
      // If the user is not authenticated, user will be redirected to the join page
      render={(routeProps) =>
        currentUser ? <Component {...routeProps} /> : <Redirect to={"/join"} />
      }
    />
  )
}

export default PrivateRoute
