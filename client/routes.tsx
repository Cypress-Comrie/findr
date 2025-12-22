/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import MovieCards from './components/MovieCards'
import WatchList from './components/WatchList'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="cards" element={<MovieCards />} />
    <Route path="watchlist" element={<WatchList />} />
    <Route index element={<MovieCards />} />
  </Route>,
)

export default routes
