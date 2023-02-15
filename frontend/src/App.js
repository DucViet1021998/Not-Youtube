import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
