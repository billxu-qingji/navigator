import React from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';

function ConstSite(props) {
  const { constSites } = props;
  const elem = [];
  constSites.sites && constSites.sites.forEach((item) => {
    elem.push(
      <Col span={6} key={item.id}>
        <Card
          className="const_site_card"
          style={{ marginTop: 8, height: 80 }}
          hoverable
        >
          <a href={item.url}>
            <img src={item.icon} alt="sitelogo" className="site_logo" />
            <p style={{ fontSize: 16, marginBottom: 5, color: '#666', marginTop: 7 }}>{item.name}</p>
            <p style={{ color: '#999', fontSize: 10 }}>{item.intro}</p>
          </a>
        </Card>
      </Col>,
    );
  });
  return (
    <Row gutter={6} className="content-row const_site_row">
      {
        elem
      }
    </Row>
  );
}
const mapStateToProps = state => {
  if (!state.home.sites) return {};
  return {
    constSites: state.home.sites.common,
  };
};
export default connect(mapStateToProps)(ConstSite);
ConstSite.propTypes = {
  constSites: PropTypes.object,
};
ConstSite.defaultProps = {
  constSites: {},
};
