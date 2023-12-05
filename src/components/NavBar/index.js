import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const {match, onSearchEnter, onSearchClick, enterValue} = props
  const {path} = match
  const isSelected = path === '/' ? 'selected-id' : 'pages'
  const isTopRated = path === '/top-rated' ? 'selected-id' : 'pages'
  const isUpcoming = path === '/upcoming' ? 'selected-id' : 'pages'

  const onChangeEnter = event => {
    onSearchEnter(event)
  }

  const onSearchItem = event => {
    onSearchClick(event)
  }

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
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-bar-input"
          value={enterValue}
          onChange={onChangeEnter}
        />
        <button type="button" className="buttonSearch" onClick={onSearchItem}>
          Search
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
