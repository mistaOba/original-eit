import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import FORM from './Form.jsx';
import TABLE from './Table.jsx';
import EIT from './EITs.jsx'
import { Eits } from '../api/eits.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteSelected: false,
    }
  }

  toggleDeleteSelected() {
    this.setState({
      deleteSelected:!this.state.deleteSelected,
    });
  }

  render (){
    return(
      <div className="container">
        <nav className="nav">
          <h2 className="nav-items"> EIT APP</h2>&nbsp;
          <h2 className="nav-items">Welcome</h2>

        </nav>
        <div className="row">
          <div className="col">
            <FORM handleSubmit={this.handleSubmit}/>
          </div>
          <div className="col-md-auto">
            <TABLE eitData ={this.state.EITs} />
          </div>
        </div>
      </div>
    )
  }

}

export default withTracker(()=>{
  return {
    EITS: Eits.find({}, {sort:{createdAt: -1}}).fetch(),
  };
})(App);
