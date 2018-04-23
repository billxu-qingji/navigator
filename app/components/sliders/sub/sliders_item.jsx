import React, { Component } from 'react';
/*eslint-disable*/
class SlidersItem extends Component {
  render() {
    const { index, images, speed } = this.props;
    let len = images.length;
    let style;
    if (index === len) {

      //最后一张结束直接跳到第一张
      style = {
        left: 0 + 'px',
        transitionDuration: 0 + 's'
      };
    } else {
      style = {
        left: index * -900 + 'px',
        transitionDuration: speed + 's'
      }
    }
    style.width = images.length * 900 + 'px';
    return (
      <ul className="sliders" style={style}>
        {
          images.map((item, index) => (
            <li
              className="slider"
              key={index}
            >
              <img src={item} alt="" />
            </li>
          ))
        }
      </ul>
    )
  }
}
export default SlidersItem;