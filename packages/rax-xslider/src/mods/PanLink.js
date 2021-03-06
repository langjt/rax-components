/** @jsx createElement */

'use strict';

import {createElement, Component} from 'rax';
import Link from 'rax-link';
import Util from './Util'
import {EVENT_PAN_VIEW_PAN_START} from './Constant';
import Detection from './Detection';
import PropTypes from 'prop-types';

const {Emitter} = Util;

class PanLink extends Component {
  isPanning = false;

  static contextTypes = {
    uuid: PropTypes.number,
    slider: PropTypes.Component
  };

  render() {
    let props = {
      ...this.props,
      preventMoveEvent: true,
      onClick: this.onCellClick
    };


    if (Detection.isEnableSliderAndroid) {
      if (this.context.slider.props.vertical) {
        props.onVerticalPan = this.onPan;
      } else {
        props.onHorizontalPan = this.onPan;
      }
    }

    return (
      <Link {...props} />
    );
  }

  onCellClick = (e) => {
    const {onClick, onPress} = this.props;
    if (this.isPanning) {
      return;
    }
    if (typeof onClick === 'function') {
      onClick(e);
    } else if (typeof onPress === 'function') {
      onPress(e);
    }
  }

  onPan = (e) => {
    if (e.state === 'start') {
      this.isPanning = true;
      Emitter.emit(EVENT_PAN_VIEW_PAN_START, {
        uuid: this.context.uuid,
        element: this
      });
    } else if (e.state === 'end') {
      setTimeout(() => {
        this.isPanning = false;
      }, 50);
    }
  }
}


export default PanLink;