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
      <ul className="pages-list">
        <li className="pages-cont">
          <Link to="/" className={isSelected}>
            Popular
          </Link>
        </li>
        <li className="pages-cont">
          <Link to="/top-rated" className={isTopRated}>
            Top Rated
          </Link>
        </li>
        <li className="pages-cont">
          <Link to="/upcoming" className={isUpcoming}>
            Upcoming
          </Link>
        </li>
      </ul>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-bar-input"
          value={enterValue}
          onChange={onChangeEnter}
        />
        <button type="button" className="button-img">
          <BsSearch className="search-butn" onClick={onSearchItem} />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
