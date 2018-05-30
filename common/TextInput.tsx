import * as React from 'react'
import * as _ from 'lodash'

let isVerbose = false
let aggressivelySuppressTextFlash = true

export class TextInput extends React.Component<
  {
    text: string
    tag?: any
    onUpdate: (newValue: any, tag: any) => void
  },
  {}
> {
  state = {
    isEditing: false,
    editValue: '',
    editStartValue: '',
  }

  componentWillUnmount() {
    this._tryCommitChange()
  }
  onFocus = () => {
    this._startEditing()
  }
  onBlur = () => {
    this._tryCommitChange()
  }

  _startEditing = () => {
    // Start editing
    // console.log('start editing')
    this.setState({
      editValue: this.props.text || '',
      editStartValue: this.props.text || '',
      isEditing: true,
    })
  }

  _tryCommitChange = () => {
    // Stop editing and commit change
    let newValue = this.state.editValue
    if (newValue && this.state.isEditing) {
      // console.log('commit edit')
      if (newValue !== this.props.text) {
        this.props.onUpdate(newValue, this.props.tag)
        this.setState({ isEditing: false })
      }
    }
  }

  onChange = event => {
    let newValue = event.target.value
    if (isVerbose) {
      console.log('change to ', newValue)
    }
    this.setState({ editValue: newValue })
  }

  render() {
    let showEdit =
      this.state.isEditing ||
      (aggressivelySuppressTextFlash &&
        this.state.editStartValue === this.props.text)

    return (
      <input
        type="text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        style={{}}
        value={showEdit ? this.state.editValue || '' : this.props.text || ''}
      />
    )
  }
}
