import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import { Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { Store } from "./store/store";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

const App = () => {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) setLogin(true)
  }, [])

  return (
    <Store.Provider value={{ login, setLogin }}>
      <Routes>
        {/* Private Layout */}
        <Route element={<PrivateLayout />}>
          {privateRoutes.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            const Page = route.component
            return <Route
              key={index}
              path={route.path}
              element={<Layout><Page /></Layout>} />
          })}
        </Route>
        {/*End Of Private Layout */}


        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            const Page = route.component
            return <Route
              key={index}
              path={route.path}
              element={<Layout><Page /></Layout>} />
          })}
        </Route>
        {/* End Of Public Layout */}


      </Routes>
    </Store.Provider>
  );
}

export default App;




