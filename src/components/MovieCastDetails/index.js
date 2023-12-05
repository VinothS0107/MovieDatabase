import {Component} from 'react'

import './index.css'

const apiKey = '8ec417dd387e3d58d78bc240f7fec3b1'

class MovieCastDetails extends Component {
  state = {
    movieCast: [],
  }

  componentDidMount() {
    this.getMovieCast(apiKey)
  }

  getMovieCast = async key => {
    const {movieId} = this.props
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const {cast} = data
      const updateCast = cast.map(each => ({
        adult: each.adult,
        castId: each.cast_id,
        character: each.character,
        creditId: each.credit_id,
        gender: each.gender,
        id: each.id,
        knownForDepartment: each.known_for_department,
        name: each.name,
        order: each.order,
        originalName: each.original_name,
        popularity: each.popularity,
        profilePath: each.profile_path,
      }))
      this.setState({movieCast: updateCast})
    }
  }

  render() {
    const {movieCast} = this.state

    return (
      <>
        <h1 className="castItem">Cast</h1>
        <ul className="castCrew">
          {movieCast.map(each => (
            <li className="castCrewEach">
              <img
                src={`https://image.tmdb.org/t/p/original${each.profilePath}`}
                alt={each.id}
                className="profile"
              />
              <h1 className="nameList">
                {each.originalName} <span className="name-as">as</span>{' '}
                {each.character}
              </h1>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default MovieCastDetails
