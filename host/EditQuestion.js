import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { updateQuestion, fetchContents } from './actions'



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
      snack: false,
      message: "設定を送信しました。",
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
          floatingLabelText={"お金の初期値"}
          onBlur={this.handleChangeOnlyNum.bind(this, ['money'])}
          fullWidth={true}
       />
        <TextField
          hintText={"増減の初期値"}
          defaultValue={this.state.question_text['add']}
          floatingLabelText={"増減の初期値"}
          onBlur={this.handleChangeOnlyNum.bind(this, ['add'])}
          fullWidth={true}
       />
        <TextField
          hintText={"お金の単位"}
          defaultValue={this.state.question_text['unit']}
          floatingLabelText={"お金の単位"}
          onBlur={this.handleChange.bind(this, ['unit'])}
          fullWidth={true}
       />
      </div>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      question_text: {
        money: this.props.money,
        add: this.props.add,
        unit: this.props.unit
      }    })
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
  
  handleRequestClose() {
    this.setState({ snack: false })
  }

  submit() {
    this.setState({
      open: false,
      snack: true,
      message: "設定を送信しました。"
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
  }

  reset(){
    this.setState({
      question_text: this.state.default_text,
      open: false,
      snack: true,
      message: "設定を初期化しました。"
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
  }

  render() {
    const { page } = this.props
    const actions = [
      <RaisedButton
        label="適用"
        disabled={this.state.disabled}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <RaisedButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label="すべてリセット"
        onTouchTap={this.reset.bind(this)}
      />,
    ]

    return (<span>
    <FloatingActionButton onClick={this.handleOpen.bind(this)} disabled={page != "waiting"}>
      <ImageEdit />
    </FloatingActionButton>
    <Dialog
      title="編集画面"
      actions={actions}
      modal={false}
      open={this.state.open}
      autoScrollBodyContent={true}
    >
      {this.QuestionTab()}
    </Dialog>
      <Snackbar
        open={this.state.snack}
        message={this.state.message}
        autoHideDuration={2000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    </span>)
  }
}

export default connect(mapStateToProps)(EditQuestion)