import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Eits } from '../api/eits.js';


export default class EIT extends Component{
    toggleChecked(){
        Meteor.call('eits.setChecked', this.props.eit._id, !this.props.eit.checked)
    }
    deleteThisEit(){
        Meteor.call('eits.remove', this.props.eit._id)
    }
    render(){
        const eitClassname = classnames({
            checked: this.props.eit.checked,
        });
    }

}
