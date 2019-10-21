import React, { Component } from 'react';

class FORM extends Component{
  constructor(props){
    super(props)
    this.initialState ={
      name:'',
      age:'',
      phone:'',
      country:'',
      area:'',
      fact:'',
      imageUrl:'',
    }
    this.state = this.initialState
  }
  handleChange = event => {
    const {name, value} = event.target 
    this.setState({
      [name]: value,
    })
  }
  submitForm = () => {
    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }
  render (){
    const {name, age, phone, country, area, fact, imageUrl} = this.state
    return (
      <form className="form-group">
          <label>Name </label>
          <input
              className="form-control"
              type="text"
              name="name"
              placeholder= "EIT's Name"
              value={name}
              onChange={this.handleChange}
          />
          <label>Age</label>
          <input
              type="text"
              name="age"
              className="form-control"
              value={age}
              placeholder ="Age of Eit"
              onChange={this.handleChange}
          />
          <label>Country </label>
          <input
              type="text"
              className="form-control"
              name="country"
              value={country}
              placeholder ="Home country"
              onChange={this.handleChange}
          />
          <label>Phone Number</label>
          <input
              type="text"
              className="form-control"
              name="phone"
              value={phone}
              placeholder ="Phone Number"
              onChange={this.handleChange}
          />
          <label>Area of Interest</label>
          <input
              type="text"
              name="area"
              className="form-control"
              value={area}
              placeholder ="Area of Interest. ie business"
              onChange={this.handleChange}
          />
          <label>Interesting Fact</label>
          <input
              type="text"
              name="fact"
              className="form-control"
              value={fact}
              placeholder ="Interesting Fact obout EIT"
              onChange={this.handleChange}
          />
          <br></br>
          <input className="btn btn-success" type="button" value="Submit" onClick={this.submitForm} />

      </form>
  )
  }
}

export default FORM