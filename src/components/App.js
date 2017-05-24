import React, { Component } from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class App extends Component {
  
  constructor(){
    super();
  }

  componentWillMount(){
    const { signed } = this.props.DB;
    if(signed){
      hashHistory.push('/Details');
    }else{
      hashHistory.push('/SignIn');
    }
  }
  render() {
    return (
        <div>
          

        </div>
    )
  }
}

const mapStateToProps = ({ DB }) => ({ DB });
export default connect(mapStateToProps, {})(App);