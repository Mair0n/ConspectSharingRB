import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Conspect extends Component {

    render () {

        return (
            <div className="conspect">
                <div className="conspectHeader">
                    <h4><Link to={"/conspect/"+this.props.conspect.id}>{this.props.conspect.title}</Link></h4>
                    <h5>{this.props.conspect.description}</h5>
                    <h6>{this.props.conspect.depNumber}</h6>
                </div>
                
            </div>
        )
    }
}

export default Conspect