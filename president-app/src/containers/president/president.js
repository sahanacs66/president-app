import React, { Component } from 'react';
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import './president.css'
//import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


class president extends Component {
    constructor(props) {
      super(props)
      this.state = {data:[]}

    }

    ascending_order = () => {
    fetch("http://localhost:5000/ascending_order", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => {
      return resp.json()
    })
    .then((data) => {
      this.setState({ data: data.result.data })
      this.props.onUpdate(data.result.data)
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })
  }

  descending_order = () => {
  fetch("http://localhost:5000/descending_order", {
    method: "GET",
    dataType: "JSON",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    this.setState({ data: data.result.data })
    this.props.onUpdate(data.result.data)
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  })
}


    render() {
      return (
        <div className='president-app'>
          <BootstrapTable data={this.props.data} >
            <TableHeaderColumn isKey={true} dataField = 'name' className= 'Table-header'>
            NAME
            <button onClick={() => this.ascending_order()} >Asc</button>
            <button onClick={() => this.descending_order()} >Desc</button>
            </TableHeaderColumn>
            <TableHeaderColumn dataField = 'birthday' className= 'Table-header'>
            BIRTHDAY
            </TableHeaderColumn>
            <TableHeaderColumn dataField = 'birth_place' className= 'Table-header'>
            BIRTH_PLACE
            </TableHeaderColumn>
            <TableHeaderColumn dataField = 'death_day' className= 'Table-header'>
            DEATH_DAY
            </TableHeaderColumn>
            <TableHeaderColumn dataField = 'death_place' className= 'Table-header'>
            DEATH_PLACE
            </TableHeaderColumn>
          </BootstrapTable>
       </div>

    );
  }
}

export default president
