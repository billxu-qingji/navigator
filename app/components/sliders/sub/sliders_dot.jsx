/* eslint-disable */
import React, { Component } from 'react';
class SlidersDots extends Component {
  render() {
    const { images, index, turn } = this.props;
    return (
      <div className="dots">
        {
          images.map((item, nowIndex) => {
            let len = images.length - 1;
            if (nowIndex === len) return;
            return (
              <span
                key={nowIndex}
                className={"dot " + (nowIndex == index % len ? 'active' : '')}
                onClick={() => turn(nowIndex - index)}
              >
                {nowIndex + 1}
              </span>
            )
          }

          )
        }
      </div>
    )
  }
}
export default SlidersDots;