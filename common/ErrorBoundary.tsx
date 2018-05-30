import * as React from 'react'
import * as _ from 'lodash'

export class ErrorBoundary extends React.Component<{
  label: string
}> {
  state = { hasError: false, error: null, info: null }

  componentDidCatch(error, info) {
    // Display fallback UI
    console.log(error)
    console.log(info)
    this.setState({ hasError: true, error, info })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
        >
          Something went wrong in {this.props.label}.
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
          <pre>{JSON.stringify(this.state.info, null, 2)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
