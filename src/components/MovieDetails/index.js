import {Component} from 'react'

import {format, getYear} from 'date-fns'

import Loader from 'react-loader-spinner'

import Header from '../NavBar'

import MovieCastDetails from '../MovieCastDetails'
import './index.css'

const apiKey = '8ec417dd387e3d58d78bc240f7fec3b1'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    singleMovie: '',
    genresState: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSeparateMovie(apiKey)
  }

  getSeparateMovie = async key => {
    this.setState({status: apiStatusConstants.inProgress})
    const {genresState} = this.state
    const {match} = this.props
    const {params} = match
    const {movieId} = params
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        genres: data.genres,
        homepage: data.homepage,
        id: data.id,
        imdbId: data.imdb_id,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        productionCompanies: data.production_companies,
        productionCountries: data.production_countries,
        releaseDate: format(new Date(data.release_date), 'MM/dd/yyyy'),
        revenue: data.revenue,
        runtime: data.runtime,
        spokenLanguages: data.spoken_languages,
        status: data.status,
        tagline: data.tagline,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      }

      const {genres} = updatedData
      genres.map(each => genresState.push(each.name))
      const joinedGenre = genresState.join(',')

      this.setState({
        singleMovie: updatedData,
        genresState: joinedGenre,
        status: apiStatusConstants.success,
      })
    }
  }

  renderProgressView = () => (
    <>
      <div className="loader-spinner">
        <Loader type="Circles" height="80" width="80" />
      </div>
    </>
  )

  renderSuccessView = () => {
    const {singleMovie, genresState} = this.state
    const year = getYear(new Date(singleMovie.releaseDate))

    return (
      <>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${singleMovie.backdropPath})`,
            backgroundSize: 'cover',
            width: '100%',
            minHeight: '90vh',
            position: 'absolute',
            filter: 'blur(2px)',
            left: '0',
            zIndex: '-1',
          }}
        >
          {null}
        </div>
        <div className="movies-details-container">
          <div className="movie-images">
            <img
              src={`https://image.tmdb.org/t/p/original/${singleMovie.posterPath}`}
              alt="movieImage"
              className="posterImage"
            />
          </div>
          <div className="movie-details">
            <h1 className="movie_name">
              {singleMovie.originalTitle}
              <span className="year-span">{`(${year})`}</span>
            </h1>

            <div className="details-List">
              <div className="subMovieDetails">
                <p className="movieDetailsList">{`${singleMovie.releaseDate} `}</p>
                <p className="movieDetailsList">{`${genresState}`}</p>
                <p className="movieDetailsList">
                  {`${singleMovie.originalLanguage}`}
                </p>
                <p className="movieDetailsList">{`${singleMovie.runtime} min`}</p>
              </div>
              <p className="tagline">{singleMovie.tagline}</p>
              <p className="overView">{singleMovie.overview}</p>
            </div>
          </div>
        </div>
        <MovieCastDetails key={singleMovie.id} movieId={singleMovie.id} />
      </>
    )
  }

  render() {
    const {status} = this.state
    return (
      <>
        <Header />
        {status === apiStatusConstants.inProgress
          ? this.renderProgressView()
          : this.renderSuccessView()}
      </>
    )
  }
}

export default MovieDetails
