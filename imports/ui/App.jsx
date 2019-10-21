import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import FORM from './Form.jsx';
import TABLE from './Table.jsx';

class App extends Component {
  state = {
    EITs: [],
  }
  removeEIT = index => {
    const {EITs} = this.state
    this.setState({
      EITs: EITs.filter((EIT, i) =>{
        return i !==index
      })
    })
  }
  handleSubmit = EIT =>{
    this.setState({ EITs: [...this.state.EITs, EIT]})
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
            <TABLE eitData ={this.state.EITs} removeEIT={this.removeEIT} />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
