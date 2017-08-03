import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
  render () {
    let { component, className, isLoading, children } = this.props

    const loadingStyle = {
      position: 'relative',
      margin: '0px auto',
      width: '100px',
      height: '100px'
    }

    const svgStyle = {
      animation: 'rotate 2s linear infinite',
      height: '100%',
      transformOrigin: 'center center',
      width: '100%',
      position: 'absolute',
      top: '50vh',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }

    const circleStyle = {
      strokeDasharray: '1,200',
      strokeDashoffset: '0',
      animation: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite',
      strokeLinecap: 'round'
    }

    const animation = `@keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124px;
      }
    }

    @keyframes color {
      100%, 0% {
        stroke: #304760;
      }
      40% {
        stroke: #2E4D72;
      }
      66% {
        stroke: #708DAD;
      }
      80%, 90% {
        stroke: #1D2E40;
      }
    }`

    if (isLoading) {
      let { width, height, margin, style } = this.props

      loadingStyle.width = width
      loadingStyle.height = height
      loadingStyle.margin = margin

      return React.createElement(
        component,
        { style: Object.assign({}, loadingStyle, style) },
        <style>{animation}</style>,
        <svg style={svgStyle} viewBox='25 25 50 50'>
          <circle
            style={circleStyle}
            cx='50'
            cy='50'
            r='20'
            fill='none'
            strokeWidth='7'
            strokeMiterlimit='10'
          />
        </svg>
      )
    } else {
      return React.createElement(component, { className }, children || null)
    }
  }
}

Loading.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  component: PropTypes.any,
  colors: PropTypes.array,
  children: PropTypes.node
}

Loading.defaultProps = {
  className: '',
  isLoading: true,
  style: {},
  width: '100px',
  height: '100px',
  margin: '0 auto',
  component: 'div'
}

export default Loading

// Polyfills
if (typeof Object.assign !== 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object')
    }

    var to = Object(target)

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index]

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey]
          }
        }
      }
    }
    return to
  }
}
