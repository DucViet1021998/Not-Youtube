import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Store } from "~/store/store";


export default function PrivateLayout() {
    const store = useContext(Store)
    const navigate = useNavigate()

    useEffect(() => {
        if (!store.login) {
            return navigate('/')
        }

    }, [store.login, navigate])

    return <Outlet />
}