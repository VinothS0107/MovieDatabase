import {Link, withRouter} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const {match} = props
  const {path} = match
  const isSelected = path === '/' ? 'selected-id' : 'pages'
  const isTopRated = path === '/top-rated' ? 'selected-id' : 'pages'
  const isUpcoming = path === '/upcoming' ? 'selected-id' : 'pages'

  return (
    <nav className="nav-header">
      <h1 className="title">
        <Link to="/" className="logo-link">
          movieDB
        </Link>
      </h1>
      <div className="pages-list">
        <h1 className="pages-cont">
          <Link to="/" className={isSelected}>
            Popular
          </Link>
        </h1>
        <h1 className="pages-cont">
          <Link to="/top-rated" className={isTopRated}>
            Top Rated
          </Link>
        </h1>
        <li className="pages-cont">
          <Link to="/upcoming" className={isUpcoming}>
            Upcoming
          </Link>
        </li>
      </div>
      <Link to="/search">
        <button type="button" className="buttonSearch">
          <BsSearch />
        </button>
      </Link>
    </nav>
  )
}

export default withRouter(Header)
