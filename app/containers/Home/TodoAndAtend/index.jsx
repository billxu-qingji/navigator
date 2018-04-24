import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Card, Table, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { HOME } from '../../../constants/api';
import { getRecord } from '../../../actions/home';
import './index.scss';

const COLUMNS = [
  {
    title: '日期',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {
    title: '上班时间',
    dataIndex: 'bgTime',
    key: 'gbTime',
  }, {
    title: '下班时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
];
class TodoAndAtend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentPage: 1,
    };
    this.getAttendRecord();
  }
  componentDidMount() {
    this.getTodoList();
  }
  getAttendRecord = async () => {
    try {
      const res = await axios.get(HOME.GET_ATTEND_RECORD + `?userid=${this.props.user.username || ''}`);
      if (res.data.success) {
        console.log(getRecord(res.data.data));
        this.props.dispatch(getRecord(res.data.data));
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  getTodoList = async () => {
    try {
      const res = await axios.post(HOME.GET_TODO_LIST);
      if (res.data.success) {
        this.setState({
          todos: res.data.data.jiraList,
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }
  render() {
    console.log(this.state.todos.slice((this.state.currentPage - 1) * 6, this.state.currentPage * 6));
    return (
      <Row gutter={8} className="content-row" key="todoAndAtend">
        <Col span={12}>
          <Card style={{ width: '100%', height: 350 }} title="JIRA TODO LIST">
            <List
              pagination={{
                pageSize: 6,
                total: this.state.todos.length,
                defaultPageSize: 6,
                size: 'small',
                hideOnSinglePage: true,
                onChange: (current) => {
                  this.setState({
                    currentPage: current,
                  });
                },
              }}
              itemLayout="horizontal"
              dataSource={this.state.todos.slice((this.state.currentPage - 1) * 6, this.state.currentPage * 6).map((item, index) => {
                return {
                  key: index,
                  title: item.title,
                  link: item.link,
                };
              })}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ marginTop: -1 }} src="https://qhyxpicoss.kujiale.com/2018/04/23/LLO2DJYKAEBKKX6FAAAAAAQ8_64x64.png" />}
                    title={<a href={item.link}>{item.title}</a>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100%', height: 350 }} title="考勤记录">
            <Table
              pagination={{
                pageSize: 5,
                total: this.props.attendRecord.length,
                size: 'small',
                hideOnSinglePage: true,
              }}
              columns={COLUMNS}
              dataSource={this.props.attendRecord.map((item, index) => {
                return {
                  key: index,
                  createDate: item.checkDate,
                  bgTime: item.checktime1 && item.checktime1.replace(item.checkDate + ' ', ''),
                  endTime: item.checktime2 && item.checktime2.replace(item.checkDate + ' ', ''),
                };
              })}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    attendRecord: state.home.attendRecord,
  };
};
export default connect(mapStateToProps)(TodoAndAtend);
TodoAndAtend.propTypes = {
  attendRecord: PropTypes.array,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
TodoAndAtend.defaultProps = {
  attendRecord: [],
};
