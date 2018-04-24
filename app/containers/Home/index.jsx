import React from 'react';
import { Col, Row, Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { HOME as HOME_API } from '../../constants/api';
import { HOME as HOME_URL } from '../../constants/url';

import { getSites } from '../../actions/home';

import Sliders from '../../components/sliders';
import MySite from './MySite';
import ConstSite from './ConstSite';
import ComUse from './ComUse';
import Confluence from './Confluence';
import TodoAndAtend from './TodoAndAtend';
import './index.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getSite();
    console.log('home init');
  }
  getSite = async () => {
    try {
      const res = await axios.post(HOME_API.GET_SITES);
      if (res.data.success) {
        this.props.dispatch(getSites(res.data.data));
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  render() {
    return (
      <div>
        <Row gutter={8} className="content-row">
          <Col span={18} style={{ height: 270 }}>
            <Sliders
              images={HOME_URL.SIDERS_URL_LIST}
              speed={1}
              delay={2}
              autoPlay
              autoParse
            />
          </Col>
          <Col span={6}>
            <Card
              style={{ width: '100%', height: 270, cursor: 'pointer' }}
              title="公告"
              className="border-line"
            >
              <Ellipsis
                lines={1}
                tooltip
                className="border-line"
              >
                1.重磅来袭， 酷家乐第二季度沟通会将于2018-04-20举行
              </Ellipsis>
              <Ellipsis
                lines={1}
                tooltip
                className="border-line"
              >
                2.新人须知， 公司休假及上下班打卡制度最新发布
              </Ellipsis>
              <Ellipsis
                lines={1}
                tooltip
                className="border-line"
              >
                3.第七届hackday将于2018-04-20举行，我们期待你的贡献
              </Ellipsis>
              <Ellipsis
                lines={1}
                tooltip
                className="border-line"
              >
                4.热烈祝贺酷家乐D轮融资1亿美元，价值超6亿美元
              </Ellipsis>
              <Ellipsis
                lines={1}
                tooltip
                className="border-line"
              >
                5.公司价值观确定
              </Ellipsis>
            </Card>
          </Col>
        </Row>
        <ConstSite />
        {
          this.props.user.username
            ?
            [
              <MySite key="mysite" getSite={this.getSite} />,
              <TodoAndAtend key="todo_and_atend" />,
            ]
            : ' '
        }

        <ComUse />
        <Confluence />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Home);
Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};
Home.defaultProps = {
  user: {},
};
