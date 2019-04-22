import React, { Component } from 'react';
import {
    Form, Input, Button, Checkbox, Row, Col, DatePicker, message
  } from 'antd';
import moment from 'moment';
import axios from 'axios';

class DailyFrom extends Component {
    constructor(props){
        super(props);
        let temp = JSON.parse(sessionStorage.getItem("values")) || {};
        if(!temp || !temp.plannedDate) {
            temp.plannedDate = moment(new Date(), 'YYYY-MM-DD');
        }else {
            temp.plannedDate = moment(temp.plannedDate, 'YYYY-MM-DD');
        }
        this.state = Object.assign({},{
            "date":"",
            "name":"",
            "projectName":"",
            "taskDesc":"",
            "plannedDate": moment(new Date(), 'YYYY-MM-DD'),
            "manHour":"",
            "complateRate":"",
            "delayReason":""
        }, temp)
    }
    componentDidMount(){
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.error(values)
                axios.post('/crm-rest-template/dailyPaper/createDailyPaper', values)
                .then(response=>{
                    message.success('提交成功');
                    if(values.remember){
                        sessionStorage.setItem("values", JSON.stringify(values));
                    }else{
                        sessionStorage.removeItem("values");
                    }
                }).catch(function (error) {
                    message.error(error);
                });
            }
        });
    }

  render() {
    const { TextArea } = Input;
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
        <div className="daily_insert" style={{
            background: '#f1f1f1',
            flex: '1',
        }}>
            <div style={{
                marginTop: '60px',
                marginRight: '20px',
                padding: '20px',
                border: '1px solid #d5d5d5',
                borderRadius: '8px',
                background: '#FFF'
            }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form" autoComplete="off">
                    <Row gutter={24}>
                        <Col span={11}>
                            <Form.Item label="姓名">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请填写姓名!' }],
                                    initialValue: this.state.name
                                })(
                                    <Input placeholder="姓名" allowClear />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="项目名">
                                {getFieldDecorator('projectName', {
                                    rules: [{ required: true, message: '请填写项目名!' }],
                                    initialValue: this.state.projectName
                                })(
                                    <Input placeholder="项目名" allowClear/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="当天任务时间">
                                {getFieldDecorator('manHour', {
                                rules: [{ required: true, message: '请填写当天任务时间!' }],
                                initialValue: this.state.manHour
                            })(
                                <Input placeholder="当天任务时间" allowClear/>
                            )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="计划完成时间">
                                {getFieldDecorator('plannedDate', {
                                    rules: [{ required: true, message: '请填写计划完成时间!' }],
                                    initialValue: this.state.plannedDate
                                })(
                                    <DatePicker style={{width:'100%'}} placeholder="计划完成时间" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="完成任务百分比">
                                {getFieldDecorator('complateRate', {
                                    rules: [{ required: true, message: '请填写完成任务百分比!' }],
                                    initialValue: this.state.complateRate
                                })(
                                    <Input placeholder="完成任务百分比" allowClear/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="任务描述" className="child_node_15">
                        {getFieldDecorator('taskDesc', {
                            rules: [{ required: true, message: '请填写任务描述!' }],
                            initialValue: this.state.taskDesc
                        })(
                            <TextArea placeholder="任务描述" autosize={{ minRows: 3, maxRows: 6 }}/>
                        )}
                    </Form.Item>
                    <Form.Item label="任务延期原因" className="child_node_15">
                        {getFieldDecorator('delayReason', {
                            initialValue: this.state.delayReason
                        })(
                            <TextArea placeholder="任务延期原因" autosize={{ minRows: 3, maxRows: 6 }}/>
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={24} style={{ textAlign: 'right',paddingRight: '100px'}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox style={{ marginRight: '47px' }}>Remember</Checkbox>
                            )}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
  }
}

const DailyInsert = Form.create({ name: 'daily_insert' })(DailyFrom);
export default DailyInsert;