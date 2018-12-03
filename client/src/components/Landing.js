import React, { Component } from 'react'
import ConspectList from './ConspectList.js'
import { getConspectsForHome } from './UserFunctions'

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            conspects: [],
            isError: false
        };
      }

    componentDidMount() {
        getConspectsForHome().then(conspectsGetted => {
            if (conspectsGetted.statusCode === 404) {
                this.setState({isError:!this.state.isError})
            } else {
                this.setState({conspects:conspectsGetted, isError:!this.state.isError})
            }
        })
    }

    render () {

        const conspects = this.state.isError ? 
        (   <div className="col-sm-8 mx-auto">
                <ConspectList conspects={this.state.conspects} />
            </div>) : null

        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Приветствуем на сайте!</h1>
                    </div>
                    {conspects}
                </div>
            </div>
        )
    }
}

export default Landing