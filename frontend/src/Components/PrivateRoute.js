import { useContext } from "react"
import { Redirect, Route } from "react-router";
import { AuthContext } from "../authContext"

const PrivateRoute = ({children, loginCondition, ...rest}) => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <Route {...rest} render = {props => {
            if(loginCondition === 'loggedIn'){
                return isLoggedIn ? children : <Redirect to = "/login"/>
            }else if(loginCondition === 'loggedOut'){
                return isLoggedIn ? <Redirect to ='/'/> : children
            }
        }}/>

    )
}

export default PrivateRoute
