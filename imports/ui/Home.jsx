import React, {Component} from 'react';
import FORM from './Form.jsx';
import TABLE from './Table.jsx';

class Home extends Component{
    render(){
        return(
            <div className="row">
                <div className="col">
                    <FORM />
                </div>
                <div className="col-md-auto">
                    <TABLE  />
                </div>
            </div>
        )
    }
}

export default Home