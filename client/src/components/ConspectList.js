import React, { Component } from 'react'
import Conspect from './Conspect.js'
import './css/ConspectList.css'

class ConspectList extends Component {
    
    render () {

        return (
            <ul>
                {this.props.conspects.length>0 ? this.props.conspects.map((conspect,index) => 
                    (<li className="rounded border-primary conspects"><Conspect key={index} conspect={conspect} /></li>)
                ):null}
            </ul>
        )
    }
}

export default ConspectList