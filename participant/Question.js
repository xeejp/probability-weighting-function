import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { next } from './actions'

const mapStateToProps = ({ money,unit,ansed,question,slideIndex,rate,add}) => ({
  money,unit,ansed,question,slideIndex,rate,add
})

class Question extends Component  {
    constructor(props) {
    super(props)
    this.only = true
  }

  next(value) {
    this.only = true
    const{ dispatch } = this.props
    dispatch(next(value))
  }

  Question_text(index){
	  const { money, unit, question, rate, add} = this.props
	  const type = question[index]
  return (
  <div>
   <RaisedButton onClick={this.next.bind(this, {choice: 1, type: type})} style={{float: 'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
     <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        100%の確率で{money}{unit + ((type <= 2)? "もらえる。" : "失う。")}
     </div>
   </RaisedButton>
   <RaisedButton onClick={this.next.bind(this, {choice: 2, type: type})} style={{float:  'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
    <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            return (type <= 2)? <p>{rate[type]}%の確率で{(add[type] + money) + unit}、{100 - rate[type]}%の確率で0{unit}もらえる。</p>
            : <p>{rate[type - 3]}%の確率で{(add[type] + money) + unit}、{100 - rate[type - 3]}%の確率で0{unit}失う。</p>
        })()}
     </div>
   </RaisedButton>
  </div>)
  }

  wait(){
	  const {slideIndex} = this.props
    var t = slideIndex + 1
    if(this.only && t != 48 && t % 8 == 0) {
      setTimeout(this.next.bind(this, {choice:1 ,type: 6}), 10000)
      this.only = false
    }
    return(<div style={{margin: '5%'}}>
    <p>しばらくお待ちください</p>
    </div>
    )
  }

  finish(){
      return(<div style={{margin: '5%'}}>
      <p>終了しました。</p>
      <RaisedButton onClick={this.next.bind(this, {choice:1 ,type: 7})}>結果へ</RaisedButton>
      </div>
      )
  }

  render(){
    const { money,unit,ansed,question,slideIndex} = this.props
    var Questions = question.concat()
    var index
    console.log(question)

    var questionlist = new Array()
    var t = 0
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 7; j++){
        questionlist[t++] = <div key={t}>{this.Question_text(i * 7 + j)}</div>
      }
      questionlist[t++] = <div key={t}>{this.wait()}</div>
    }

    questionlist[t - 1] = <div key={t}>{this.finish()}</div>

    return (
        <div>
        	<p>実験画面</p>
      		<div style={{height: 'auto'}}>
      	  	<h5>どちらが良いか選択してください</h5>
        		<SwipeableViews index={slideIndex} disabled={true}>{questionlist}</SwipeableViews>
      		</div>
      	</div>
    )

  }
}

export default connect(mapStateToProps)(Question)