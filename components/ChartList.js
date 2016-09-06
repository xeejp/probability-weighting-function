import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import Chip from 'material-ui/chip'

import SwipeableViews from 'react-swipeable-views'

import Chart from './Chart'

const mapStateToProps = ({ question_text }) => ({ question_text })

class ChartList extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded, index: 0 }
  }
  
  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }

  handleChangeIndex(add) {
    this.setState({ index: this.state.index + add })
  }

  render() {
    const { participants, base } = this.props

    const styles = {
      mediumIcon: {
        width: 48,
        height: 48,
      },
      left: {
        width: 96,
        height: 96,
        padding: 24,
        float: "left",
      },
      right: {
        width: 96,
        height: 96,
        padding: 24,
        float: "right",
      }
    }

    var charts = Object.keys(participants).map((key, index) => <Chart key={key} add={participants[key].add} rate={participants[key].rate} base={base} title={key + "の結果"} />)

    return (
    <Card
      style={{marginBottom: '15px'}}
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
      <SwipeableViews index={this.state.index}>{charts}</SwipeableViews>
      <div>
        <IconButton
          iconStyle={styles.mediumIcon}
          style={styles.left}
          tooltip={"前へ"}
          onClick={this.handleChangeIndex.bind(this, -1)}
          disabled={this.state.index == 0}
        >
          <LeftIcon />
        </IconButton>
        <IconButton
          iconStyle={styles.mediumIcon}
          style={styles.right}
          tooltip={"次へ"}
          onClick={this.handleChangeIndex.bind(this, 1)}
          disabled={this.state.index == Object.keys(participants).length - 1}
        >
          <RightIcon />
        </IconButton>
        <Chip style={{clear: "both", margin: "auto"}}>ページ {this.state.index + 1}/{Object.keys(participants).length}</Chip>
      </div>
      </CardText>
     </Card>
  )
  }
}

export default connect(mapStateToProps)(ChartList)