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
        100%の確率で1000{unit + ((type <= 2)? "もらえる。" : "失う。")}
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
    return(<div>
    <p>しばらくお待ちください</p>
    </div>
    )
  }

  finish(){
      return(<div>
      <p>終わり</p>
      <RaisedButton onClick={this.next.bind(this, {choice:1 ,type: 7})}>結果へ</RaisedButton>
      </div>
      )
  }

  render(){
    const { money,unit,ansed,question,slideIndex} = this.props
    var Questions = question.concat()
    var index
    console.log(question)

    return (
        <div>
        	<p>実験画面</p>
      		<div style={{height: 'auto'}}>
      	  	<h5>どちらが良いか選択してください</h5>
        		<SwipeableViews index={slideIndex} disabled={true}>
                  <div>{this.Question_text(0)}  	</div>
                  <div>{this.Question_text(1)}    	</div>
                  <div>{this.Question_text(2)} 		</div>
                  <div>{this.Question_text(3)} 		</div>
                  <div>{this.Question_text(4)} 		</div>
                  <div>{this.Question_text(5)} 		</div>
                  <div>{this.Question_text(6)} 		</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(7)} 		</div>
                  <div>{this.Question_text(8)} 		</div>
                  <div>{this.Question_text(9)} 		</div>
                  <div>{this.Question_text(10)} 	</div>
                  <div>{this.Question_text(11)} 	</div>
                  <div>{this.Question_text(12)} 	</div>
                  <div>{this.Question_text(13)} 	</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(14)} 	</div>
                  <div>{this.Question_text(15)} 	</div>
                  <div>{this.Question_text(16)} 	</div>
                  <div>{this.Question_text(17)} 	</div>
                  <div>{this.Question_text(18)} 	</div>
                  <div>{this.Question_text(19)} 	</div>
                  <div>{this.Question_text(20)}		</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(21)} 	</div>
                  <div>{this.Question_text(22)} 	</div>
                  <div>{this.Question_text(23)} 	</div>
                  <div>{this.Question_text(24)} 	</div>
                  <div>{this.Question_text(25)} 	</div>
                  <div>{this.Question_text(26)} 	</div>
                  <div>{this.Question_text(27)}		</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(28)} 	</div>
                  <div>{this.Question_text(29)} 	</div>
                  <div>{this.Question_text(30)} 	</div>
                  <div>{this.Question_text(31)} 	</div>
                  <div>{this.Question_text(32)} 	</div>
                  <div>{this.Question_text(33)} 	</div>
                  <div>{this.Question_text(34)}		</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(35)} 	</div>
                  <div>{this.Question_text(36)} 	</div>
                  <div>{this.Question_text(37)} 	</div>
                  <div>{this.Question_text(38)} 	</div>
                  <div>{this.Question_text(39)} 	</div>
                  <div>{this.Question_text(40)} 	</div>
                  <div>{this.Question_text(41)}		</div>
                  <div>{this.finish()} 				</div>
        		</SwipeableViews>
      		</div>
      	</div>
    )

  }
}

export default connect(mapStateToProps)(Question)