import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Header from '../NavBar'

import './index.css'

const apiKey = '8ec417dd387e3d58d78bc240f7fec3b1'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedMovie extends Component {
  state = {
    topRatedMoviesData: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.topRatedMovies(apiKey)
  }

  topRatedMovies = async key => {
    this.setState({status: apiStatusConstants.inProgress})
    const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`

    const response = await fetch(topRatedMoviesURL)
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
        releaseDate: format(new Date(result.release_date), 'MMM dd,yyyy'),
        title: result.title,
        video: result.video,
        voteAverage: result.vote_average,
        voteCount: result.vote_count,
      }))

      this.setState({
        topRatedMoviesData: updatedData,
        status: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <>
      <div className="loader-spinner">
        <Loader type="Circles" height="80" width="80" />
      </div>
    </>
  )

  renderSuccess = () => {
    const {topRatedMoviesData} = this.state

    return (
      <ul className="popular-movies">
        {topRatedMoviesData.map(each => (
          <li key={each.id} className="list-movies">
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
    const {status} = this.state

    return (
      <>
        <Header />
        {status === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderSuccess()}
      </>
    )
  }
}
export default TopRatedMovie
