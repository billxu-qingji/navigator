import React from 'react';
/*eslint-disable*/
import { Row, Col, Card, List, Avatar, Icon } from 'antd';

import axios from 'axios';
import { HOME } from '../../../constants/api';

// eslint-disable-next-line
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
export default class CONFLUENCE extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confluenceTop: [],
    };
  }
  componentDidMount() {
    this.getConfluenceTop();
  }
  getConfluenceTop = async () => {
    try {
      const res = await axios.post(HOME.GET_CONFLUENCE_TOP);
      if (res.data.success) {
        this.setState({
          confluenceTop: res.data.data.contents,
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  render() {
    return (
      <Row className="content-row">
        <Col span={24}>
          <Card title="CONFLUENCE十大热帖">
            <List
              itemLayout="horizontal"
              dataSource={this.state.confluenceTop.map(item => {
                return {
                  title: item.title,
                  commentNum: item.commentNum,
                  linkAddr: item.linkAddr,
                };
              })}
              renderItem={item => {
                return (
                  <List.Item
                    actions={[<IconText type="message" text={item.commentNum.toString()} />]}
                    key={item.title}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href={item.linkAddr}>{item.title}</a>}
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
