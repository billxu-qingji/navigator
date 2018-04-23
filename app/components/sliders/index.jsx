import React, { Component } from 'react';
import SlidersItem from './sub/sliders_item';
import SlidersDots from './sub/sliders_dot';
import './index.scss';

/* eslint-disable */
export default class Sliders extends Component {
  constructor() {
    super();
    this.state = { index: 0 };
    this.go.bind(this);
    this.turn.bind(this);
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.go();
    }
  }

  go() {
    let time = this.props.delay * 1000;
    this.timer = setInterval(() => {
      if (this.state.index === this.props.images.length - 1) {

        //setState会合并最后一个改变所以要设置异步来抵消一次跳动时间
        setTimeout(() => {
          this.turn(1);
        }, 30);
      }
      this.turn(1);
    }, time)
  }
  turn(step) {
    let index = this.state.index + step;

    //如果是最后一张直接跳到第一张
    if (index > this.props.images.length) {
      index = 1;
    }
    if (index < 0) {
      index = this.props.images.length - 1;
    }
    this.setState({ index: index })
  };

  render() {
    const { images, speed, index } = this.props;
    return (
      <div
        className="wrapper"
        onMouseOver={() => clearInterval(this.timer)}
        onMouseOut={this.go.bind(this)}
      >
        <SlidersItem
          images={images}
          speed={speed}
          index={this.state.index}
        />
        <SlidersDots
          images={images}
          turn={this.turn.bind(this)}
          index={this.state.index}
        />
      </div>
    )
  }
};
