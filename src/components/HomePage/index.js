import {Component} from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../NavBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class HomePage extends Component {
  state = {
    popularMovies: [],
    status: apiStatusConstants.initial,
    search: '',
    searchedValue: '',
  }

  componentDidMount() {
    this.popularMovie(apiKey)
  }

  popularMovie = async apikey => {
    this.setState({status: apiStatusConstants.inProgress})
    const {searchedValue} = this.state
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&query=${searchedValue}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        id: result.id,
        adult: result.adult,
        genreIds: result.genre_ids,
        originalLanguage: result.original_language,
        overview: result.overview,
        popularity: result.popularity,
        posterPath: result.poster_path,
        releaseDate: result.release_date,
        title: result.title,
        video: result.video,
        voteAverage: result.vote_average,
        voteCount: result.vote_count,
      }))

      this.setState({
        popularMovies: updatedData,
        status: apiStatusConstants.success,
      })
    }
  }

  onSearchValue = event => {
    const search = event.target.value
    this.setState({search})
  }

  onSearchClick = event => {
    event.preventDefault()
    const {search} = this.state
    this.setState({searchedValue: search, search: ''})
  }

  renderLoader = () => (
    <>
      <div className="loader-spinner">
        <Loader type="Circles" height="80" width="80" />
      </div>
    </>
  )

  renderSuccess = () => {
    const {popularMovies} = this.state
    console.log(popularMovies)
    return (
      <ul className="popular-movies">
        {popularMovies.map(each => (
          <Link
            to={`/movie/${each.id}`}
            key={each.id}
            className="each-movie-link"
          >
            <li className="list-movies">
              <img
                src={`https://image.tmdb.org/t/p/original${each.posterPath}`}
                className="poster_image"
                alt={each.title}
              />
              <div className="content">
                <h1 className="movie-title">{each.title}</h1>
                <p className="movie-date">
                  {format(new Date(`${each.releaseDate}`), 'MMM dd ,yyyy')}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const {status, search} = this.state
    return (
      <>
        <Header
          enterValue={search}
          onSearchEnter={this.onSearchValue}
          onSearchClick={this.onSearchClick}
        />
        {status === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderSuccess()}
      </>
    )
  }
}
