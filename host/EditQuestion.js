import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import FlatButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { updateQuestion } from './actions'



const mapStateToProps = ({ money, add, unit, page }) => ({
  money, add, unit, page
})

class EditQuestion extends Component {
  constructor(props) {
    super(props)
    const { money, add, unit } = this.props
    this.state = {
      question_text: {
        money: money,
        add: add,
        unit: unit
      },
      open: false,
      disabled: false,
      default_text: {
        money: 1000,
        add: 1000,
        unit: '円'
      }
    }
  }

  QuestionTab() {
    return (
      <div>
        <TextField
          hintText={"お金の初期値"}
          defaultValue={this.state.question_text['money']}
          onBlur={this.handleChangeOnlyNum.bind(this, ['money'])}
          fullWidth={true}
       />
        <TextField
          hintText={"増減の初期値"}
          defaultValue={this.state.question_text['add']}
          onBlur={this.handleChangeOnlyNum.bind(this, ['add'])}
          fullWidth={true}
       />
        <TextField
          hintText={"お金の単位"}
          defaultValue={this.state.question_text['unit']}
          onBlur={this.handleChange.bind(this, ['unit'])}
          fullWidth={true}
       />
      </div>
    )
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false, disabled: false})
  }

  handleChange(value, event){
    var question_text = Object.assign({}, this.state.question_text)
    var temp = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ question_text: question_text })
  }

  handleChangeOnlyNum(value, event){
    if(isNaN(event.target.value) || event.target.value.indexOf('.') != -1) {
      this.setState({ disabled: true })
      return
    }
    var question_text = Object.assign({}, this.state.question_text)
    var temp1 = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp1 = temp1[value[i]]
    }
    var temp2 = parseInt(temp1[value[value.length - 1]])
    temp1[value[value.length - 1]] = parseInt(event.target.value)
    this.setState({ question_text: question_text, disabled: false })
    if(parseInt(question_text.min) >= parseInt(question_text.max)){
      temp1[value[value.length - 1]] = temp2
      this.setState({ question_text: question_text, disabled: true })
    }
  }

  submit() {
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
    this.setState({ open: false })
  }

  reset() {
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
    this.setState({ question_text: this.state.default_text, open: false, disabled: false})
  }

  render() {
    const { page } = this.props
    const actions = [
      <FlatButton
        label="適用"
        disabled={this.state.disabled}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <FlatButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
     <FlatButton
        label="すべてリセット"
        onTouchTap={this.reset.bind(this)}
      />,
    ]

    return (<div>
    <FloatingActionButton onClick={this.handleOpen.bind(this)} disabled={page != "waiting"}>
      <ImageEdit />
    </FloatingActionButton>
    <Dialog
      title="編集画面"
      actions={actions}
      modal={false}
      open={this.state.open}
      onRequestClose={this.handleClose.bind(this)}
      autoScrollBodyContent={true}
    >
      {this.QuestionTab()}
    </Dialog>
    </div>)
  }
}

export default connect(mapStateToProps)(EditQuestion)