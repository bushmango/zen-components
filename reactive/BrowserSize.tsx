import * as React from 'react'
import * as _ from 'lodash'

let globalWidth = 0
export function getGlobalWidth() {
  return globalWidth
}

export class BrowserSize extends React.Component<{
  onResize?: (newWidth: number) => any,
}> {
  state = {
    width: 800,
    isMobile: false,
  }

  _throttled_onWindowResize = _.throttle(() => {
    this._onWindowResize()
  }, 200)
  _onWindowResize() {
    let width = window.innerWidth
    globalWidth = width
    this.setState({ width, isMobile: width < 480 })

    if (this.props.onResize) {
      this.props.onResize(width)
    }
  }

  componentDidMount() {
    this._onWindowResize()
    window.addEventListener('resize', this._throttled_onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._throttled_onWindowResize)
  }

  render() {
    return this.props.children
  }
}
