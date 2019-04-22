import React, { Component } from 'react';
import { Progress } from 'antd';
import axios from 'axios';

export default class Progresswidget extends Component {
    constructor(props) {
        super(props);
        this.state={
            yesterdayRate: 0,
            todayRate: 0
        }
        this.timer = "";
    }
    componentDidMount(){
        this.refreshData()
        this.timer = setInterval(function(){
            this.refreshData()
        }.bind(this),10000)
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    refreshData(){
        let me = this;
        axios.post('/crm-rest-template/dailyPaper/queryComplateRate', {})
            .then(function (data) {
                me.setState({
                    yesterdayRate: Number(data.data.yesterdayRate),
                    todayRate: Number(data.data.todayRate)
                });
            })
    }
    render() {
        return (
            <div className="progress_widget" style={{width: '240px',position: 'relative',top: '10%',}}>
                <span>昨日任务完成百分比</span>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={this.state.yesterdayRate}
                    status="active"
                />
                <p></p>
                <span>今天日报填写百分比</span>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={this.state.todayRate}
                    status="active"
                />
            </div>
        )
    }
}