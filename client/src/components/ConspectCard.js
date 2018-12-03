import React, { Component } from 'react'
import { getConspectInfo } from './UserFunctions'
import ReactMarkdown from 'react-markdown'
import './css/ConspectCard.css'

class ConspectCard extends Component {
    state = {
        conspect:{}
    }

    componentDidMount() {
        getConspectInfo(this.props.match.params.id).then(res => {
            this.setState({conspect:res.data})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <div className="conspectHeader">
                            <span>Название: </span>
                            <h4 name="title">{this.state.conspect.title}</h4>
                            <span>Краткое описание: </span><h5 name="description">{this.state.conspect.description}</h5>
                            <span>Номер специальности: </span><h6 name="depNumber">{this.state.conspect.depNumber}</h6>
                        </div>
                        <div className="conspectBody rounded border-primary">
                            <ReactMarkdown source={this.state.conspect.body} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
  export default ConspectCard;