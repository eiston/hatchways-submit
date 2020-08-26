import React, { Component } from "react";
import { connect } from "react-redux";
import Student from "../components/Student"
import { fetchStudentInfo } from "../actions";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {name:'', tag:''};
  }

  handleSearch(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const tag = e.target.tag.value;
    this.setState({name:name, tag:tag});
  }
  componentDidMount() {
    this.props.fetchStudentInfo();
  }
  render() {
    const {students} = this.props.data;
    const {name, tag} = this.state;
    let data = students && students.filter(item => {
      if(!name || name.length === 0)return true;
      else return (
        item.firstName.toUpperCase().includes(name.toUpperCase()) || 
        item.lastName.toUpperCase().includes(name.toUpperCase())
      );
    })
    data = data && data.filter(item => {
      if(!tag || tag.length === 0) return true;
      else return (
        item.tags && item.tags.includes(tag)
      );
    })

    return (
    <div className="app">
      <form className="inputContainer" onSubmit={(e)=>this.handleSearch(e)}>
        <input id="name-input" name="name" placeholder='Search by name'/>
        <input id="tag-input" name="tag" placeholder='Search by tags'/>
        <input className="filterSubmit" type='submit'/>
      </form>
      {this.props.isLoadingData ? (
            "Loading . . ."
          ) : (
            students && data.map(
              (data, index) => (<div key={data.id}>
              {index > 0 && <hr/>}
              <Student id={data.id}  {...data}/>
              </div>)
            )
          )}
    </div>
    );
  }
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
  data,
  isLoadingData
});
export default connect(
  mapStateToProps,
  {
    fetchStudentInfo
  }
)(App);
