import * as React from 'react';
import {Fragment} from 'react';
import '../App.css';
import {InputText} from "primereact/inputtext";

export class GPEInput extends React.Component {
    render() {
        return (
            <Fragment>
                <label>{this.props.title}</label>
                <InputText value={this.props.getValue} onChange={(e)=>this.props.onChange(e)}
                           placeholder={this.props.getPlaceholder}/>
            </Fragment>
        )
    }
}