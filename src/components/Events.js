import React, { Component } from 'react';
import { connect } from 'react-redux';

class Events extends Component{

}

const mapStateToProps = ({ DB }) => ({DB});
export default connect(mapStateToProps, {})(Events);