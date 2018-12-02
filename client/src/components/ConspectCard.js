import React, { Component } from 'react'
import { getConspectInfo } from './UserFunctions'
import ReactMarkdown from 'react-markdown'

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
                            <span>Название: </span><h2 name="title">{this.state.conspect.title}</h2>
                            <span>Краткое описание: </span><h3 name="description">{this.state.conspect.description}</h3>
                            <span>Номер специальности: </span><h4 name="depNumber">{this.state.conspect.depNumber}</h4>
                        </div>
                        <div className="conspectBody">
                            <ReactMarkdown source={this.state.conspect.body} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
  export default ConspectCard;