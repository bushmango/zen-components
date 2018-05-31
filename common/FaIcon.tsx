import React from 'react'

const FaIcon = (props: { icon: string; size?: string; prefix?: string }) => {
  let className = (props.prefix || 'fas') + ' fa-' + props.icon
  if (props.size) {
    className += ' fa-' + props.size
  }
  return <span><i className={className} /></span>
}

export { FaIcon }
