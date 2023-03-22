import { Outlet, useNavigate } from "react-router-dom";
import { Store } from "~/store/store";
import React, { useContext, useEffect } from 'react';


export default function PublicLayout() {
    const store = useContext(Store)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.login === true) {
            return navigate('/dashboard')
        }

    }, [store.login, navigate])

    return <Outlet />
}