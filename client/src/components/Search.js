import React, { Component } from 'react'
import ConspectList from './ConspectList.js'
import Conspect from './Conspect.js'
import { searchConspects } from './UserFunctions.js'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            conspects: [],
            isError:false
        }
    }

    componentDidMount() {
        searchConspects(this.props.match.params.q).then(res => {
            if (res.statusCode === 404) {
                this.setState({isError:!this.state.isError})
            } else {
                this.setState({conspects:res})
            }
        })
    }   
 
    render () {

        const conspects = !this.state.isError ? (<ConspectList conspects={this.state.conspects} />) : null
        
        return (
        <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
                <h3>Результат поиска по запросу: {this.props.match.params.q}</h3>
                {conspects}
            </div>
        </div>

        )
    }
}

export default Search