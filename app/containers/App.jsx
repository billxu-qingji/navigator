import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import MyHeader from '../components/Header';

import { login } from '../actions/user';

const { Header, Footer, Content } = Layout;
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    const usernameMatch = document.cookie.match(/username=(\w+)/);
    if (usernameMatch) {
      this.props.dispatch(login({
        username: usernameMatch[1],
      }));
    }
  }
  render() {
    return (
      <Layout >
        <Header>
          <MyHeader
            username={this.props.user}
          />
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright©2018 三人行 All Rights Reserved.
        </Footer>
      </Layout>
    );
  }
}
export default connect()(App);
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
};
App.defaultProps = {
  user: {},
};
