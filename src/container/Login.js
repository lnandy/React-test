import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
  } from 'antd';
import '../styl/login.css'
import axios from 'axios';

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        let me = this;
        setTimeout(() => {
            me.refs.con.style.right = '100px';
        }, 100);
    }
    handleSubmit = (e) => {
        let me = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/crm-rest-template/dailyPaper/login', values)
                .then(function (data) {
                    if(!data.data || data.data.actType === '0'){
                        message.error('登陆失败');
                        return;
                    }
                    sessionStorage.setItem('session', JSON.stringify(data.data));
                    me.props.history.push("/app/dailyInsert");
                });
            }
        });
    }
    insert(){
        this.props.history.push("/app/dailyInsert");
        localStorage.setItem('session', 'not login');
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login_container" ref="con">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox style={{ marginRight: '47px' }}>Remember me</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: '42px'}}>
                        Log in
                    </Button>
                    <Button type="primary" onClick={ this.insert.bind(this)} className="login-form-button">
                        免登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;