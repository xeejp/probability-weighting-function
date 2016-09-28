import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import Users from './Users'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'

import Chart from 'components/Chart'
import ChartList from 'components/ChartList'

const mapStateToProps = ({loading, page, participants, money, rate, unit}) => ({
  loading, page, participants, money, rate, unit
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
    const { loading, page, participants, money, rate, unit } = this.props
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
          <DownloadButton
            fileName={"probability_weighting_function.csv"}
            list={[
              ["確率加重関数の推定"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ID", -rate[2] + unit, -rate[1] + unit, -rate[0] + unit, rate[0] + unit, rate[1] + unit, rate[2] + unit],
            ].concat(
              Object.keys(participants).map(id => [id, participants[id].add[5] + money + unit, participants[id].add[4] + money + unit, participants[id].add[3] + money + unit, participants[id].add[0] + money + unit, participants[id].add[1] + money + unit, participants[id].add[2] + money + unit])
            )}
            style={{marginLeft: '2%'}}
            disabled={page != "result"}
          />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)