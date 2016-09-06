import React, { Component } from 'react'
import { connect } from 'react-redux'

import CardChart from 'components/CardChart'

const mapStateToProps = ({ add,  rate, money }) => ({
  add, rate, money
})

const Result = ({ add, rate, money }) => (
  <div>
    <CardChart add={add} rate={rate} base={money} expanded={true}/>
  </div>
)

export default connect(mapStateToProps)(Result)