import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {},
  properties: {
    src: {
      type: String,
      value: '',
    },
    controls: {
      type: Boolean,
      value: true,
    },
    autoPlay: {
      type: Boolean,
      value: false,
    },
    loop: {
      type: Boolean,
      value: false,
    },
    onEnded: {
      type: Function,
      value: noop,
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    onClick: {
      type: Function,
      value: noop,
    },
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onClick', event);
    },
    onEnded(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onEnded', event);
    },
  },
});
