import { React, _ } from './gridImports'
import { IGridColumn } from './IGridColumn'
import { IGridStyle } from './IGridStyle'

const verbose = true

function logVerbose(...msg) {
  if (verbose && console && console.log) {
    console.log(...msg)
  }
}

export class GridCellEditText extends React.Component<
  {
    gridStyle: IGridStyle
    column: IGridColumn
    dataRow: any
    onUpdateCell: (newValue: any, column: IGridColumn, dataRow: any) => void,
  },
  {}
  > {
  state = {
    isEditing: false,
    editValue: '',
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
    let header = this.props.column.header
    let item = this.props.dataRow[header.dataItem] || ''
    logVerbose('start editing', `'${item}'`, header)
    this.setState({ editValue: item, isEditing: true })
  }

  _tryCommitChange = () => {
    // Stop editing and commit change
    let newValue = this.state.editValue
    logVerbose('try commit', `'${newValue}'`)
    if (newValue != null && this.state.isEditing) {
      let header = this.props.column.header
      let oldValue = this.props.dataRow[header.dataItem] || ''
      // console.log('commit edit')
      logVerbose('test commit', `'${newValue}' vs '${oldValue}'`)
      if (newValue !== oldValue) {
        logVerbose('do commit', `'${newValue}'`)
        this.setState({ isEditing: false })
        this.props.onUpdateCell(newValue, this.props.column, this.props.dataRow)
      }
    }
  }

  onChange = (event) => {
    let newValue = event.target.value
    logVerbose('change to ', `'${newValue}'`)
    this.setState({ editValue: newValue })
  }

  render() {
    let { gridStyle, column, dataRow } = this.props

    let header = column.header
    let item = ''
    if (header.dataItem) {
      item = dataRow[header.dataItem] || ''
    }

    return (
      <div style={gridStyle.cellEdit} title={'' + item}>
        <div style={column.cellStyle}>
          <input
            type='text'
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            style={column.inputStyle}
            value={
              this.state.isEditing ? this.state.editValue || '' : item || ''
            }
          />
        </div>
      </div>
    )
  }
}
