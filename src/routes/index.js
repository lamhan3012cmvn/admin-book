import { BackTop } from "antd"
import AuthAPI from "Apis/Auth.Api"
import Cookies from "js-cookie"
import React, { Suspense, useEffect } from "react"
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom"
import NotFound from "../components/Common/NotFound"

const FrameAdmin = React.lazy(() => import("../pages/FrameAdmin"))
const Routes = () => {
    const match = useRouteMatch()
    const history = useHistory()
    const redirectLogin = () => history.push("/login")

    //check isAdmin and save account info

    // useEffect(() => {
    //     if (!Cookies.getJSON("account")) {
    //         AuthAPI.getAuth()
    //             .then(res => {
    //                 if (res && res.success === true) {
    //                     Cookies.set("account", res.data)
    //                 } else {
    //                     redirectLogin()
    //                 }
    //             })
    //             .catch(err => {
    //                 redirectLogin()
    //             })
    //     }
    // }, [])

    return (
        <div>
            <Suspense fallback={() => <h1>loading...</h1>}></Suspense>
            <Switch>
                <Route
                    exact
                    path={`${match.url}`}
                    render={() => {
                        return <FrameAdmin />
                    }}
                />
                <Route
                    exact
                    path={`${match.url}/:type`}
                    render={() => {
                        return <FrameAdmin />
                    }}
                />
                <Route
                    path={`${match.url}/:type/:productId`}
                    render={() => {
                        return <FrameAdmin />
                    }}
                />
                <Route component={NotFound} />
            </Switch>
            <BackTop />
        </div>
    )
}

export default Routes
