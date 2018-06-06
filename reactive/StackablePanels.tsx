import * as React from 'react'

import {
  BrowserSize,
  getGlobalWidth,
} from '@zen-components/reactive/BrowserSize'

export class StackablePanels extends React.Component<{
    breakpoint: number,
    justifyContent?: string,
  }> {
  
    _onResize = () => {
      this.forceUpdate()
    }
  
    render() {
  
      let style: React.CSSProperties = {
        display: 'flex',
        justifyContent: this.props.justifyContent
      }
      if (getGlobalWidth() < this.props.breakpoint) {
        style = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }
  
      return (
        <BrowserSize onResize={this._onResize}>
          <div style={style}>
            {this.props.children}
          </div>
        </BrowserSize>
      )
    }
  }