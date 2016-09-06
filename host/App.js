import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import Users from './Users'
import EditQuestion from './EditQuestion'

import Chart from 'components/Chart'
import ChartList from 'components/ChartList'

const mapStateToProps = ({loading, page, participants, money}) => ({
  loading, page, participants, money
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, participants, money } = this.props
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
            <Divider
              style={{
                marginTop: '5%',
                marginBottom: '5%'
             }}
            />
          <Users /><br />
          <ChartList participants={participants} base={money} /><br />
          <EditQuestion />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)