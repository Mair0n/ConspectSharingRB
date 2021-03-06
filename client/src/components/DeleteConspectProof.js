import React, { Component } from 'react'
import proofIcon from './svgs/circle-check.svg'
import delIcon from './svgs/x.svg'
import onClickOutside from "react-onclickoutside";
import './css/DeleteConspectProof.css'


class DeleteConspectProof extends Component {

    state = {
        confirm: false
    }

    handleClickOutside = evt => {
        this.props.deleteProof(false)
    }

    render () {
        
        if (this.props.isVisible)
        return (
            <span className="conspectDeleteSpan">Удалить выбранные конспекты?
                <img src={proofIcon} onClick={() => {this.props.deleteProof(true)}} display="inline" alt="delete Icon"/>
                <img src={delIcon} onClick={() => {this.props.deleteProof(false)}} display="inline" alt="delete Icon"/>
            </span>
        )
        else return null;
    }
}

export default onClickOutside(DeleteConspectProof)