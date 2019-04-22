import React, { Component } from 'react';
import '../styl/main.scss'
import {
    Form, Row, Col, Input, Button, DatePicker
  } from 'antd';
import Dailylist from './Dailylist'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    componentDidMount(){
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.refs.list.handleTableChange({}, values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="app_main" id="app">
                <div className="header_container">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} className="login-form" autoComplete="off">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label="姓名">
                                    {getFieldDecorator('name')(
                                        <Input placeholder="姓名" allowClear />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="项目名">
                                    {getFieldDecorator('projectName')(
                                        <Input placeholder="项目名" allowClear />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="任务日期">
                                    {getFieldDecorator('date')(
                                        <DatePicker placeholder="选择任务日期" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right',right: '-80px',top: '-60px'}}>
                                Search
                            </Button>
                        </Row>
                    </Form>
                </div>
                <div className="content_container">
                    <Dailylist ref="list" history={this.props.history}/>
                </div>
            </div>
        );
    }
}
const MainForm = Form.create({ name: 'list' })(Main);
export default MainForm;