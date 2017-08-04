import React, { Component } from 'react'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'

export default class ScrollAnimation extends Component {
  static posTop () {
    if (typeof window.pageYOffset !== 'undefined') {
      return window.pageYOffset
    } else if (document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    } else if (document.body.scrollTop) {
      return document.body.scrollTop
    }
    return 0
  }

  constructor (props) {
    super(props)
    const initialHide = this.props.initiallyVisible ? '' : 'hidden'
    this.state = {
      style: {
        animationDuration: `${this.props.duration}s`,
        visibility: initialHide
      },
      lastVisibility: {
        partially: false,
        completely: false
      },
      timeouts: [],
      hasAnimated: false
    }
    if (window && window.addEventListener) {
      window.addEventListener('scroll', throttle(this.handleScroll, 200))
    }
  }

  componentDidMount () {
    this.setState({
      elementBottom: this.node.getBoundingClientRect().bottom + ScrollAnimation.posTop(),
      elementTop: this.node.getBoundingClientRect().top + ScrollAnimation.posTop()
    }, this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount () {
    if (window && window.addEventListener) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    const visible = this.isVisible()
    if (!visible.partially) {
      this.state.timeouts.forEach(tid => clearTimeout(tid))
    }
    if (visible.completely !== (this.state.lastVisibility.completely) ||
        visible.partially !== this.state.lastVisibility.partially) {
      const style = this.getStyle(visible)
      const classes = this.getClasses(visible)
      if (visible.partially) {
        const timeout = setTimeout(() => {
          this.setState({ classes, style, lastVisibility: visible })
        }, this.props.delay)
        const timeouts = this.state.timeouts.slice()
        timeouts.push(timeout)
        this.setState({ timeouts, hasAnimated: true })
      } else {
        this.setState({ classes, style, lastVisibility: visible })
      }
    }
  }

  isVisible = () => {
    const viewBottom = window.scrollY + window.innerHeight
    const viewTop = window.scrollY
    const offset = this.props.offset
    const elementBottom = this.state.elementBottom
    const elementTop = this.state.elementTop
    const middleOfView = window.scrollY + (window.innerHeight / 2)
    let partially, completely

    if (elementBottom - elementTop > window.innerHeight - (2 * offset)) {
      completely = (
        elementTop < middleOfView + offset &&
        elementBottom > middleOfView - offset
      )
      partially = (
        completely ||
        (
          (elementTop > middleOfView + offset && elementTop < viewBottom) ||
          (elementBottom < middleOfView - offset && elementBottom > viewTop)
        )
      )
    } else {
      completely = (
        (elementBottom < viewBottom - offset && elementBottom > viewTop + offset) &&
        (elementTop > viewTop + offset && elementTop < viewBottom - offset)
      )
      partially = (
        (elementBottom < viewBottom && elementBottom > viewTop) ||
        (elementTop > viewTop && elementTop < viewBottom)
      )
    }
    return {completely, partially}
  }

  getStyle = visible => {
    let style = {
      animationDuration: `${this.props.duration}s`,
      opacity: 1
    }
    if (this.props.animateOnce && this.state.hasAnimated) return style
    if (!visible.partially && !this.props.initiallyVisible) {
      style.opacity = 0
    } else if (
      !visible.completely &&
      visible.partially &&
      !this.state.lastVisibility.partially &&
      !this.props.initiallyVisible
    ) {
      style.opacity = 0
    }
    return style
  }

  getClasses = visible => {
    let classes = 'animated'
    if (this.props.animateOnce && this.state.hasAnimated) return classes
    if (
      this.props.animateIn &&
      (
        visible.completely ||
        (visible.partially && !this.state.classes.includes(this.props.animateIn) && !this.props.animateOut)
      )
    ) {
      classes += ` ${this.props.animateIn}`
    } else if (
      visible.partially &&
      this.state.lastVisibility.completely &&
      this.props.animateOut
    ) {
      classes += ` ${this.props.animateOut}`
    }
    return classes
  }

  render () {
    return (
      <div ref={(node) => { this.node = node }} className={this.state.classes} style={this.state.style}>
        {this.props.children}
      </div>
    )
  }
}

ScrollAnimation.defaultProps = {
  offset: 100,
  duration: 1,
  initiallyVisible: false,
  delay: 0,
  animateOnce: false
}

ScrollAnimation.propTypes = {
  animateIn: PropTypes.string,
  animateOut: PropTypes.string,
  offset: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  initiallyVisible: PropTypes.bool,
  animateOnce: PropTypes.bool,
  children: PropTypes.node
}
