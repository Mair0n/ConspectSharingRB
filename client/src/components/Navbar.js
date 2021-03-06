import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


class Navbar extends Component {

    state ={
        query:''
    }

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }


    onSearch(e) {
        this.props.history.push('/search/'+this.state.query)
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Войти
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Зарегистрироваться
                    </Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Профиль
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Выйти
                    </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggle-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center"
                    id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <form noValidate onSubmit={this.onSearch.bind(this)}>
                            <input type="text"
                                    className="form-control"
                                    name="query"
                                    value={this.state.query}
                                    onChange={this.onChange.bind(this)}
                                />
                            </form>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Главная
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)