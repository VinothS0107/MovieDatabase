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
    if (searchedValue === '') {
      const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`

      const response = await fetch(getPopularMoviesURL)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = data.results.map(result => ({
          backdropPath: result.backdrop_path,
          id: result.id,
          adult: result.adult,
          genreIds: result.genre_ids,
          originalLanguage: result.original_language,
          overview: result.overview,
          popularity: result.popularity,
          posterPath: result.poster_path,
          releaseDate: format(new Date(result.release_date), 'MMM dd ,yyyy'),
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
    } else {
      const getPopularMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${searchedValue}&page=1`
      const response = await fetch(getPopularMoviesURL)
      if (response.ok === true) {
        const data = await response.json()

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
        console.log(updatedData)

        this.setState({
          popularMovies: updatedData,
          status: apiStatusConstants.success,
        })
      }
    }
  }

  onSearchValue = event => {
    const search = event.target.value
    this.setState({search})
  }

  onSearchClick = event => {
    event.preventDefault()
    const {search} = this.state
    this.setState({searchedValue: search, search: ''}, this.componentDidMount)
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

    return (
      <ul className="popular-movies">
        {popularMovies.map(each => (
          <li className="list-movies">
            <img
              src={`https://image.tmdb.org/t/p/original${each.posterPath}`}
              className="poster_image"
              alt={each.title}
            />
            <p className="rating">{Math.ceil(each.voteAverage * 10) / 10}</p>
            <div className="content">
              <h1 className="movie-title">{each.title}</h1>
              <p className="movie-date">{each.releaseDate}</p>
              <Link
                to={`/movie/${each.id}`}
                key={each.id}
                className="each-movie-link "
              >
                <button type="button" className="viewDetails">
                  View Details
                </button>
              </Link>
            </div>
          </li>
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
