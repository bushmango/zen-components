import * as React from 'react'
import * as _ from 'lodash'

let isVerbose = false
let isDebug = false
let aggressivelySuppressTextFlash = true

export class TextInput extends React.Component<{
  label?: string
  tag?: any
  onUpdate: (newValue: any, tag: any) => void
  text: string
  width?: string
  autoUpdate?: boolean
}> {
  static defaultProps = {
    autoUpdate: true,
  }

  state = {
    isEditing: false,
    editValue: '',
    editStartValue: '',
    lastUpdateText: '',
  }

  _isMounted = false
  componentDidMount() {
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
                lastUpdateText: this.props.text || '',
              }
            }
            return {}
          })
        }
      }, 100)
      //}
    }
  }

  _debounceDelayCommitChange = _.debounce(() => {
    this._tryUpdateChange()
  }, 250)

  _tryUpdateChange = () => {
    let newValue = this.state.editValue || ''

    if (isDebug) {
      console.log('_tryUpdateChange', newValue)
    }

    if (this.state.isEditing) {
      // console.log('commit edit')
      if (
        newValue !== this.props.text &&
        newValue !== this.state.lastUpdateText
      ) {
        this.setState({ lastUpdateText: newValue })
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
    }
  }

  _tryCommitChange = () => {
    // Stop editing and commit change
    this._tryUpdateChange()
    if (this._isMounted) {
      this.setState({ isEditing: false })
    }
  }

  onChange = (event) => {
    let newValue = event.target.value

    if (isVerbose || isDebug) {
      console.log(
        'change to ',
        newValue,
        '' + this._isMounted,
        '' + this.props.autoUpdate
      )
    }
    if (this._isMounted) {
      this.setState({ editValue: newValue })
      if (this.props.autoUpdate) {
        if (isDebug) {
          console.log('try to debounce commit')
        }
        this._debounceDelayCommitChange()
      }
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
