import React, { Component } from 'react'
import { getUserConspects } from './UserFunctions'
import { Link } from 'react-router-dom'
import DeleteConspectProof from './DeleteConspectProof.js'


class UsersConspectsTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible:false,
            conspects: []
        }
    }

    componentDidMount() {
        getUserConspects(this.props.userid).then(res => {
            this.setState({conspects:res.data})
        })
    }

    render () {
        if(this.state.conspects.length>0) 
        {
        return (
            <div className="table-responsive">
                <table className="table table-sm">
                <caption>Ваши конспекты</caption>
                <tbody>
                {this.state.conspects.map((conspect) => 
                    <tr key={conspect.id}>
                        <td>
                            <Link to={"/conspect/"+conspect.id}>{(conspect.title.length>0) ? conspect.title:'Без названия'}</Link>
                        </td>
                        <td key={conspect.id}>
                            <DeleteConspectProof props={this.props} conspectId={conspect.id} conspectTitle={conspect.title}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        )} else return null;
    }
}

export default UsersConspectsTable