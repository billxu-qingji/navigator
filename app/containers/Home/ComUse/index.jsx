import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card } from 'antd';
import PropTypes from 'prop-types';

class ComUse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Row className="content-row">
        <Col span={24}>
          <Card style={{ width: '100%' }} title="常用网站">
            {
              this.props.systemSiteList.sites && this.props.systemSiteList.sites.map((item, index) => {
                return (
                  <Row key={index} style={{ marginTop: 20, borderBottom: '1px solid #e8e8e8', marginBottom: 20 }}>
                    <Col span={1}>
                      <h4>{item.typeName}</h4>
                    </Col>
                    <Col span={23}>
                      <ul style={{ listStyle: 'none' }}>
                        {
                          item.sites.map((elem, i) => {
                            return (
                              <li key={i} style={{ float: 'left', marginRight: 20, marginBottom: 15 }}>
                                <a href={elem.url}>
                                  <img src={elem.icon} alt="" style={{ width: 20, marginRight: 8, marginTop: -2 }} />
                                  <span>{elem.name}</span>
                                </a>
                              </li>
                            );
                          })
                        }
                      </ul>
                    </Col>
                  </Row>
                );
              })
            }
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  if (!state.home.sites) return false;
  return {
    systemSiteList: state.home.sites.system,
  };
};
export default connect(mapStateToProps)(ComUse);
/*eslint-disable */
ComUse.propTypes = {
  systemSiteList: PropTypes.object,
};
ComUse.defaultProps = {
  systemSiteList: {},
};
