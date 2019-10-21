import React, { Component } from 'react';

const TableHeader = () =>{
  return (
      <thead>
          <tr>
              <th scope="row">  </th>
              <th scope="row">Name</th>
              <th scope="row">Age</th>
              <th scope="row">Country</th>
              <th scope="row">Phone Number</th>
              <th scope="row">Area of Interest</th>
              <th scope="row">Interesting Fact</th>
              <th scope="row"><button className="btn btn-light">Delete Selected</button></th>
          </tr>
      </thead>
  )
}

const TableBody = props => {
  const rows = props.eitData.map((row, index) =>{
      return (
          <tr key={index}>
              <td>
              <input
              type="checkbox"
              />
              </td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.country}</td>
              <td>{row.phone}</td>
              <td>{row.area}</td>
              <td>{row.fact}</td>
              <td>
                  <button className="btn btn-danger" onClick = {()=> props.removeEIT(index)}>Delete</button>&nbsp;
                  <button className="btn btn-info" onClick = {()=> props.editEIT(index)}>Edit </button>
              </td>
          </tr>
      )
  });
  return (
      <tbody>{rows}</tbody>
  )

}
class TABLE extends Component{
  render(){
    const {eitData, removeEIT} = this.props
    return(
      <table className="table">
        <TableHeader />
        <TableBody eitData={eitData} removeEIT={removeEIT} />
      </table>
    )
  }
}
export default TABLE