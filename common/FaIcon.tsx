import React from 'react'

const FaIcon = (props: {
  icon: string
  size?: string
  prefix?: string
  color?: string
  style?: any
}) => {
  let className = (props.prefix || 'fas') + ' fa-' + props.icon
  if (props.size) {
    className += ' fa-' + props.size
  }
  return (
    <span>
      <i
        className={className}
        style={props.style ? props.style : { color: props.color }}
      />
    </span>
  )
}

export { FaIcon }
