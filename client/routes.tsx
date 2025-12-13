/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import MovieCards from './components/MovieCards'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="cards" element={<MovieCards />} />
  </Route>,
)

export default routes
