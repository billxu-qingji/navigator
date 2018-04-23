import React from 'react';
import { Row, Col, Icon, Card, Modal, Input, message, Upload, Button, Tag } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { HOME } from '../../../constants/api';
import { MY_SITE_BG_COLOR } from '../../../constants/index';
import './index.scss';

const { TextArea } = Input;
class MySite extends React.PureComponent {
  constructor(props) {
    super(props);
    this.title = '';
    this.url = '';
    this.intro = '';
    this.state = {
      visible: false,
      closable: false,
    };
  }
  handleOk = async () => {
    try {
      const res = await axios.post(HOME.ADD_MY_SITES, {
        url: this.url,
        name: this.title,
        intro: this.intro,
      });
      if (res.data.success) {
        message.success('提交成功');
        this.setState({
          visible: false,
        });
        this.props.getSite();
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      message.error('提交失败');
    }
  }
  deleteSite = async (id) => {
    try {
      const res = await axios.post(HOME.DELE_MY_SITE + `?site_id=${id}`);
      if (res.data.success) {
        this.props.getSite();
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  render() {
    return (
      <Row className="content-row my_site_row">
        <Col span={24}>
          <Card
            style={{ width: '100%' }}
            title="我的导航"
            extra={<Icon className="add_site_icon" type="folder-add" onClick={() => this.setState({ visible: true })} />}
          >
            {
              this.props.mySiteList.sites && this.props.mySiteList.sites.map((item, index) => {
                const colorNum = item.id % 10;
                return (
                  /* eslint-disable */
                  <a className="site" key={index} href={item.url}>
                    <Tag
                      closable={this.state.closable}
                      onClose={(e) => {
                        e.preventDefault();
                        this.deleteSite(item.id);
                      }}
                      style={{ background: MY_SITE_BG_COLOR[colorNum], borderColor: MY_SITE_BG_COLOR[colorNum], position: 'relative' }}
                      className="my_site_btn"
                      onMouseEnter={() => {
                        this.setState({
                          closable: true,
                        });
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          closable: false,
                        });
                      }}
                    >
                      {item.name && item.name.charAt(0)}
                    </Tag>
                    <Ellipsis
                      className="title"
                      style={{ color: '#777', width: 60, marginLeft: -5 }}
                      lines={1}
                      tooltip
                      length={60}
                    >{item.name || '未知'}</Ellipsis>
                  </a>

                );
              })
            }
          </Card>
        </Col>
        <Modal
          title="请输入网站信息"
          visible={this.state.visible}
          cancelText="返回"
          okText="提交"
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          <Row className="add_my_site_row">
            <Col span={4}>
              <span className="label">网站地址：</span>
            </Col>
            <Col span={20}>
              <Input
                placeholder="http://10.10.31.33:8080/#/?_k=nrqv2x"
                onChange={(e) => {
                  this.url = e.target.value;
                }}
              />
            </Col>
          </Row>
          <Row className="add_my_site_row">
            <Col span={4}>
              <span className="label">网站名称：</span>
            </Col>
            <Col span={20}>
              <Input
                placeholder="酷家园"
                onChange={(e) => {
                  this.title = e.target.value;
                }}
              />
            </Col>
          </Row>
          <Row className="add_my_site_row">
            <Col span={4}>
              <span className="label">网站简介：</span>
            </Col>
            <Col span={20}>
              <TextArea
                rows={4}
                onChange={(e) => {
                  this.intro = e.target.value;
                }}
              />
            </Col>
          </Row>
          <Row className="add_my_site_row">
            <Col span={4}>
              <span className="label">上传图标：</span>
            </Col>
            <Col span={20}>
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            </Col>
          </Row>
        </Modal>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  if (!state.home.sites) return {};
  return {
    mySiteList: state.home.sites.users,
  };
};
export default connect(mapStateToProps)(MySite);
MySite.propTypes = {
  mySiteList: PropTypes.object,
  getSite: PropTypes.func.isRequired,
};
MySite.defaultProps = {
  mySiteList: {},
};
