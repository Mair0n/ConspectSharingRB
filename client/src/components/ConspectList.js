import React, { Component } from 'react'
import Conspect from './Conspect.js'

class ConspectList extends Component {
    
    render () {

        return (
            <div className="container conspectContainer">
                {this.props.conspects.length>0 ? this.props.conspects.map((conspect,index) =>
                    <Conspect key={index} conspect={conspect} />
                ):null}
            </div>
        )
    }
}

export default ConspectList