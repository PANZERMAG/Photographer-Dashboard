import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";


export default function RequiredAuth() {
    const { user } = useAppSelector(state => state.account)
    const location = useLocation()
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser())
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false))
    }, [initApp])

    if (!loading && !user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return (
        <>
            <Outlet />
        </>
    )


    return <Outlet />
}