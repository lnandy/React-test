import { Table, Tag } from 'antd';
import React from 'react';
import axios from 'axios';

const colors = ['','magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
const getRandom = () => {
    return Math.ceil(Math.random()*11);
}
const columns = [{
    title: '员工',
    dataIndex: 'name',
    width: '7%',
    //sorter: true,
    render: (name, record)  => (
        <Tag color={colors[getRandom()]} key={record.id}>{name}</Tag>
    ),
}, {
    title: '项目名称',
    dataIndex: 'projectName',
    //   filters: [
    //     { text: 'Male', value: 'male' },
    //     { text: 'Female', value: 'female' },
    //   ],
    width: '10%',
}, {
    title: '任务描述',
    dataIndex: 'taskDesc',
}, {
    title: '时间',
    dataIndex: 'date',
    width: '10%',
}, {
    title: '延期原因',
    dataIndex: 'delayReason',
    width: '15%'
}, {
    title: '完成度',
    dataIndex: 'complateRate',
    width: '10%',
}];

export default class Dailylist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {
                pageSize: 6,
                page: 1,
                current: 1,
            },
            loading: false,
            filters: {}
        }
        this.filters = {};
        // if(sessionStorage.getItem('session') === null || sessionStorage.getItem('session') === 'not login'){
        //     this.props.history.push('/');
        // }
    }

    componentDidMount() {
        this.handleTableChange();
    }

    handleTableChange = (pagination = {}, filters) => {
        if(JSON.stringify(filters) !== "{}"){
            this.filters = filters;
        }
        const pager = { ...this.state.pagination };
        pager.current = pagination.current || 1;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            pageInfo:{
                pageSize: pager.pageSize,
                page: pager.current,
            },
            ...this.filters,
        });
    }

    fetch = (params = {}) => {
        let me = this;
        me.setState({ loading: true });
        axios.post('/crm-rest-template/dailyPaper/queryDailyPaperDetail', params)
        .then(function (data) {
            const pagination = { ...me.state.pagination };
            pagination.total = Number(data.headers['x-total-count']);
            me.setState({
                loading: false,
                data: data.data,
                pagination,
            });
        })
    // reqwest({
    //   url: 'https://randomuser.me/api',
    //   method: 'get',
    //   data: {
    //     results: 100,
    //     ...params,
    //   },
    //   type: 'json',
    // }).then((data) => {
    //   const pagination = { ...this.state.pagination };
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   this.setState({
    //     loading: false,
    //     data: data.results,
    //     pagination,
    //   });
    // });
  }

  render() {
    return (
      <Table size="middle"
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        style={{ width: '100%'}}
      />
    );
  }
}
