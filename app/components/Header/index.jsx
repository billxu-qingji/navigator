import React from 'react';
import { Input, Avatar, Modal, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { hashHistory } from 'react-router';
import Login from 'ant-design-pro/lib/Login';
import { login } from '../../actions/user';
import { USER, HOME as HOME_API } from '../../constants/api';
import './index.scss';

const { Search } = Input;
const { Tab, UserName, Password, Submit } = Login;
class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 'qrcode',
      resultList: [],
    };
  }
  onSubmit = async (err, values) => {
    try {
      const res = await axios.post(USER.LOGIN, values);
      if (res.data.success) {
        this.props.dispatch(login({ username: values.username }));
        this.setState({
          visible: false,
        });
        hashHistory.push('/');
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  loginOutHandler = async () => {
    try {
      const res = await axios.post(USER.LOGIN_OUT);
      if (!res.data.success) {
        throw new Error(res.data.message);
      } else {
        this.props.dispatch(login({}));
        hashHistory.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchHandler = async (value) => {
    try {
      if (!value.trim()) return;
      const res = await axios.post(HOME_API.GET_SEARCH_SITE + `?keyword=${value}`);
      if (res.data.success) {
        this.setState({
          resultList: res.data.data.sites,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.toString());
    }
  }
  render() {
    const menu = (
      <Menu>
        {
          this.state.resultList.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <a href={item.url}>
                  <img src={item.icon} alt="" style={{ width: 20, marginRight: 10 }} />
                  <span>{item.name}</span>
                </a>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
    return (
      <div>
        <div className="header" >
          <div className="logo">
            <img
              style={{ width: 45, verticalAlign: 'middle' }}
              src="https://qhyxpicoss.kujiale.com/2018/04/23/LLO2DJYKAEBKKX6FAAAAABA8_96x96.png"
              type="image/svg+xml"
              alt="logo"
            />
            <span style={{ color: '#ddd', fontSize: 30, verticalAlign: 'middle', marginLeft: 8 }}>酷家园</span>
          </div>
          <div className="search">
            <Dropdown overlay={menu} trigger={['focus']}>
              <Search
                className="search"
                placeholder="输入以搜索网站、负责人、confluce、以及其他文档"
                onChange={e => { console.log(e.target.value); this.searchHandler(e.target.value); }}
                onSearch={value => { this.searchHandler(value); }}
              />
            </Dropdown>
          </div>
          <div className="user">
            {
              !this.props.user.username
                ?
                (
                  <div onClick={() => this.setState({ visible: true })} style={{ cursor: 'pointer' }}>
                    <Avatar
                      style={{ marginRight: 10 }}
                      icon="user"
                      className="avatar"
                    />
                    <span style={{ fontSize: 18, color: '#ddd', marginTop: 2, verticalAlign: 'middle' }}>登录</span>
                  </div>
                )
                : (
                  <div >
                    <Avatar
                      style={{ marginRight: 10 }}
                      icon="user"
                      className="avatar"
                    />
                    <span style={{ fontSize: 18, color: '#ddd', marginTop: 2, verticalAlign: 'middle', marginRight: 10 }}>{this.props.user.username}</span>
                    <span
                      style={{ fontSize: 18, color: '#ddd', marginTop: 2, verticalAlign: 'middle', cursor: 'pointer' }}
                      onClick={this.loginOutHandler}
                    >
                      退出
                    </span>
                  </div>
                )
            }

          </div>
        </div>
        <Modal
          title="推荐使用二维码登录"
          footer={null}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
        >
          <div className="login-panel">
            <Login
              defaultActiveKey={this.state.type}
              onSubmit={this.onSubmit}
            >
              <Tab key="qrcode" tab="二维码登录" style={{ textAlign: 'center' }}>
                <div
                  id="wx_reg"
                  ref={() => {
                    window.WwLogin({
                      id: 'wx_reg',
                      appid: 'wxe838eaf3a3855809',
                      agentid: '1000035',
                      redirect_uri: 'http://one.qunhequnhe.com/api/weixin/code',
                      state: Math.random(),
                      href: '',
                    });
                  }}
                />
              </Tab>
              <Tab key="ladp" tab="LADP登录">
                <UserName name="username" style={{ width: '100%' }} />
                <Password name="password" style={{ width: '100%' }} />
                <Submit>登录</Submit>
              </Tab>
            </Login>
          </div>
        </Modal>
      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Header);
Header.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
