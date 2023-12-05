import {Route, Switch} from 'react-router-dom'

import HomePage from './components/HomePage'

import TopRatedMovie from './components/TopRatedMovie'

import UpcomingMovie from './components/UpcomingMovies'

import MovieDetails from './components/MovieDetails'

import SearchMovies from './components/SearchMovies'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/top-rated" component={TopRatedMovie} />
    <Route exact path="/upcoming" component={UpcomingMovie} />
    <Route exact path="/movie/:movieId" component={MovieDetails} />
    <Route exact path="/search" component={SearchMovies} />
    <Route component={NotFound} />
  </Switch>
)

export default App
