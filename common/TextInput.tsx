import * as React from 'react'
import * as _ from 'lodash'

let isVerbose = false
let aggressivelySuppressTextFlash = true

export class TextInput extends React.Component<{
  text: string
  label?: string
  tag?: any
  onUpdate: (newValue: any, tag: any) => void
  width?: string
}> {
  state = {
    isEditing: false,
    editValue: '',
    editStartValue: '',
  }

  _isMounted = false
  componentWillMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
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
    if (this._isMounted) {
      this.setState({
        editValue: this.props.text || '',
        editStartValue: this.props.text || '',
        isEditing: true,
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (aggressivelySuppressTextFlash) {
      //let showEdit = this.getShowEdit()
      //if (showEdit) {
      // console.log(
      //   'new props',
      //   this.props.text,
      //   this.state.editStartValue,
      //   this.props.text === this.state.editStartValue,
      // )
      setTimeout(() => {
        // console.log('1')
        if (this._isMounted) {
          this.setState((prevState: any) => {
            if (!prevState.isEditing) {
              // console.log('2')
              return {
                editValue: this.props.text || '',
                editStartValue: this.props.text || '',
              }
            }
            return {}
          })
        }
      }, 100)
      //}
    }
  }

  _tryCommitChange = () => {
    // Stop editing and commit change
    let newValue = this.state.editValue || ''
    if (this.state.isEditing) {
      // console.log('commit edit')
      if (newValue !== this.props.text) {
        this.props.onUpdate(newValue, this.props.tag)
        // this.setState({ isEditing: false }, () => {
        //   if (aggressivelySuppressTextFlash) {
        //     setTimeout(() => {
        //       this.setState((prevState: any) => {
        //         if (!prevState.isEditing) {
        //           return {
        //             editValue: this.props.text || '',
        //             editStartValue: this.props.text || '',
        //           }
        //         }
        //         return {}
        //       })
        //     }, 100)
        //   }
        // })
      }
      if (this._isMounted) {
        this.setState({ isEditing: false })
      }
    }
  }

  onChange = (event) => {
    let newValue = event.target.value
    if (isVerbose) {
      console.log('change to ', newValue)
    }
    if (this._isMounted) {
      this.setState({ editValue: newValue })
    }
  }

  getShowEdit() {
    return (
      this.state.isEditing ||
      (aggressivelySuppressTextFlash &&
        this.state.editStartValue === this.props.text &&
        this.state.editStartValue !== this.state.editValue)
    )
  }

  render() {
    let showEdit = this.getShowEdit()

    return (
      <span>
        {this.props.label && <div>{this.props.label}</div>}

        <input
          type="text"
          // label={this.props.label}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={showEdit ? this.state.editValue || '' : this.props.text || ''}
          style={{ maxWidth: this.props.width }}
        />
        {/* <span>{this.state.isEditing ? 'E' : showEdit ? 'e' : '-'}</span> */}
      </span>
    )
  }
}
