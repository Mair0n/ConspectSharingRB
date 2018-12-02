import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ConspectAddForm from './ConspectAddForm.js'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            showConspectEditor: false
        }
        this.myRef = React.createRef()

    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            id:decoded.id,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
        })
    }

    render () {
        
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Профиль</h1>
                    </div>
                    <table className="table table-sm col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Имя</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Фамилия</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <ConspectAddForm user={jwt_decode(localStorage.usertoken).id}/>
                </div>
            </div>
        )
    }
}

export default Profile