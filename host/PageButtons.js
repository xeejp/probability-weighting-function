﻿import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'

import { submitPage, nextPage, backPage } from './actions'

import { getPage } from 'util/index'

const pages = ["waiting", "experiment", "result"]

const mapStateToProps = ({ page, participants }) => ({
  page, participants
})

class PageButtons extends Component {
  changePage(page) {
    const { dispatch } = this.props
    dispatch(submitPage(page))
  }

    backPage(page) {
    const { dispatch } = this.props
    dispatch(backPage())
  }

  nextPage(page) {
    const { dispatch } = this.props
    dispatch(nextPage())
  }

  render() {
    const { page, participants } = this.props
    const buttons = []
    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
          <StepButton
            onClick={this.changePage.bind(this, pages[i])}
          >{getPage(pages[i])}</StepButton>
        </Step>
      )
    }
    return (
      <span>
        <Stepper activeStep={pages.indexOf(page)} linear={false}>
          {buttons}
        </Stepper>
        <RaisedButton onClick={this.backPage.bind(this)} disabled={page == "waiting"} style={{ marginLeft: '3%' }}>戻る</RaisedButton>
        <RaisedButton onClick={this.nextPage.bind(this)} primary={true} style={{ marginLeft: '3%' }}>次へ</RaisedButton>
      </span>
    )
  }
}

export default connect(mapStateToProps)(PageButtons)
