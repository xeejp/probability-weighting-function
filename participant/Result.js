import React, { Component } from 'react'
import { connect } from 'react-redux'

import CardChart from 'components/CardChart'

const mapStateToProps = ({ add,  rate}) => ({
  add, rate
})

const Result = ({ add, rate }) => (
  <div>
    <CardChart add={add} rate={rate} expanded={true}/>
  </div>
)

export default connect(mapStateToProps)(Result)