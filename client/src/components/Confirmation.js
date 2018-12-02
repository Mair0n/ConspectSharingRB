import React, { Component } from 'react'
import { emailConfirm } from './UserFunctions'

class Confirmation extends Component {
    constructor() {
        super()

        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        emailConfirm(this.props.match.params.token).then(res => {
            this.props.history.push('../login')
        })
    }

    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <button className="btn-lg" onClick={this.onClick}>Click to confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirmation