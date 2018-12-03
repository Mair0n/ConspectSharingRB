import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/ConspectAddForm.css'

import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";

import { conspectAdd } from './UserFunctions'
import { getUserConspects } from './UserFunctions'
import { deleteUserConspect } from './UserFunctions.js'

import DeleteConspectProof from './DeleteConspectProof.js'


const initialState = {
    isOpen : false,
    markDownText: '',
    title: '',
    description: '',
    depNumber: '',
    body: '',
    user: '',
    conspects:[],
    deleteConfirm: null
}

const resetState = {
    isOpen : false,
    markDownText: '',
    title: '',
    description: '',
    depNumber: '',
    body: '',
    user: '',
    deleteConfirm: null
}

class ConspectAddForm extends Component {
    constructor() {
        super()
        this.state = initialState;
        this.checkBoxes = []
        this.deleteConfirm = null;

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteProof = this.deleteProof.bind(this)
    }

    componentDidMount() {
        getUserConspects(this.props.user).then(res => {
            this.setState({
                conspects:res.data,
            }, () => {
                this.checkBoxes = []
                this.reset()
            })
        })
    }

    reset() {
        this.setState(resetState);
    }

    openEditor = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleChange = value => {
        this.setState({body : value})
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()
        var conspect = {
            title: this.state.title,
            description: this.state.description,
            depNumber: this.state.depNumber,
            body: this.state.body,
            user: this.props.user
        }

        conspectAdd(conspect).then(res => {
            var conspect = {
                id:res.data._id,
                title: this.state.title,
                description: this.state.description,
                depNumber: this.state.depNumber,
                body: this.state.body,
                user: this.props.user
            }
            let usConsp = [];
            usConsp = this.state.conspects;
            usConsp.push(conspect);
            this.setState({conspects:usConsp},this.reset())
        })
    }

    headerCheckBoxClick(e) {
        this.checkBoxes.forEach(check => {
            if (check)
            check.checked = e.target.checked
        })
    }

    deleteProof(value) {
        if (value){
            var conspectsToDelete = [];
            var refreshedConspects = [];
            var checkB = []
            this.checkBoxes.forEach(check => {
                if(check != null && check.checked) conspectsToDelete.push(check.id)
                else checkB.push(check)
            })
            deleteUserConspect(conspectsToDelete).then(res => {        
                this.state.conspects.forEach(cnsp => {
                    if (conspectsToDelete.indexOf(cnsp.id) < 0) refreshedConspects.push(cnsp)
                })
                this.checkBoxes = checkB;
                this.setState({conspects: refreshedConspects, deleteConfirm: false})
            }).catch(error => new Error(error))
        }
        else this.setState({deleteConfirm: false})
    }

    deleteConspects() {
        if (!this.state.deleteConfirm) {
            this.setState({deleteConfirm: true})
        }
    }

    render () {
        
        const Editor = (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Название:</label>
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="Введите название конспекта"
                            value={this.state.title}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Краткое описание:</label>
                        <input type="text"
                            className="form-control"
                            name="description"
                            placeholder="Введите краткое описание"
                            value={this.state.description}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="depNumber">Номер специальности:</label>
                        <input type="text"
                            className="form-control"
                            name="depNumber"
                            placeholder="Ваш номер специальности"
                            value={this.state.depNumber}
                            onChange={this.onChange}/>
                    </div>
                    <SimpleMDE onChange={this.handleChange.bind(this)} /> 
                    <button type="submit"
                        className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
                
            </div>
        )

        const userConspects = (
            <div className="table-responsive">
                <table className="table table-sm">
                    <caption>Ваши конспекты</caption>
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" className={"text-center"} ><input type="checkbox" name="headerCheckBox" onClick={this.headerCheckBoxClick.bind(this)}/></th>
                        <th scope="col" className="text-center">Название</th>
                        <th scope="col" className="text-center">Краткое описание</th>
                        <th scope="col" className="text-center">Номер специальности</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.conspects.length>0 ? this.state.conspects.map((conspect, index) => 
                            <tr key={conspect.id}>
                                <th scope="row" className="text-center">
                                    <input ref={(checkbox) => {this.checkBoxes[index] = checkbox }} id={conspect.id} type="checkbox" />
                                </th>
                                <td className="text-center">
                                    <Link to={"/conspect/"+conspect.id}>{(conspect.title.length>0) ? conspect.title:'Без названия'}</Link>
                                </td>
                                <td className="text-center">
                                    {conspect.description}
                                </td>
                                <td className="text-center">
                                    {conspect.depNumber}
                                </td>
                            </tr>
                        ): null}
                    </tbody>
                </table>
                <button type="button" className="btn btn-dark" onClick={this.deleteConspects.bind(this)}>Удалить выбранные</button>
                {this.state.deleteConfirm ? <DeleteConspectProof isVisible={true} deleteProof={this.deleteProof}/> : <DeleteConspectProof isVisible={false} deleteProof={this.deleteProof}/>}
            </div>
        )

        const body = this.state.isOpen && Editor
        
        return (
            <div>
                {userConspects}
                <button className="btn btn-primary" onClick={this.openEditor.bind(this)}>
                    {this.state.isOpen ? "Закрыть редактор" : "Добавить конспект"}
                </button>
                {body}
            </div>
        )
    }
}

export default ConspectAddForm