import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ConspectAddForm from './ConspectAddForm.js'
import './css/Profile.css'

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
                    <div className="profileBlock d-flex flex-row justify-content-around">
                        <div className="p-6">
                            <h1 className="text-center">Профиль</h1>
                        </div>
                        <div className="p-6 userDataCol rounded border-primary">
                            <p>Имя: {this.state.first_name}</p>
                            <p>Фамилия: {this.state.last_name}</p>
                            <p>Email: {this.state.email}</p>
                        </div>
                    </div>
                    <ConspectAddForm user={jwt_decode(localStorage.usertoken).id}/>
                </div>
            </div>
        )
    }
}

export default Profile