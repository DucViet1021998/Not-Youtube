import React, { Fragment, useState } from "react";

import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from "./components/Modes";
import { Store } from "./store/store";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import { DashboardDefaultLayout } from "./layouts/DashboardDefaultLayout";





const App = () => {
  const checkAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      return false
    }
    else {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        const expTime = payload.exp * 1000
        if (expTime < Date.now()) {
          return false
        } else if (expTime > Date.now()) {
          return true
        } else return true
      } catch (error) {
        return false
      }
    }
  }
  const [badge, setBadge] = useState(Number(localStorage.getItem('notify')) || 0)
  const [login, setLogin] = useState(checkAccessToken())
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('mode') || "light")



  return (
    <ConfigProvider
      theme={{
        token: currentTheme === 'light' ? lightTheme : darkTheme,
      }}>
      <Store.Provider value={{ login, setLogin, badge, setBadge, currentTheme, setCurrentTheme }}>
        <Routes>
          {/* Private Layout */}
          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route, index) => {
              let Layout = DashboardDefaultLayout
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
      </Store.Provider >
    </ConfigProvider>
  );
}

export default App;




