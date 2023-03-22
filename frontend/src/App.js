import React, { Fragment, useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from "./components/Modes";
import { Store } from "./store/store";
import PrivateLayout from "./routes/PrivateRoute";
import PublicLayout from "./routes/PublicRoute";
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import { DashboardDefaultLayout } from "./layouts/DashboardDefaultLayout";


const App = () => {
  const checkAccessToken = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken) {
        return false;
      } else {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expTime = payload.exp * 1000;
        if (expTime < Date.now() && !refreshToken) {
          return false;
        }
        return true;
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false
    }
  };

  const [badge, setBadge] = useState(Number(localStorage.getItem('notify')) || 0)
  const [login, setLogin] = useState(checkAccessToken())
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('mode') || "light")

  useEffect(() => {
    setLogin(checkAccessToken());
  }, []);



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




