import React, { Component } from 'react'
import '../styl/customMenu.css'
import { Drawer, message } from 'antd';
class CustomMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        if(sessionStorage.getItem('session') === null && localStorage.getItem('session') === null){
            this.props.history.push('/');
        }
    }
    
    handleClick(){
        if(this.refs.button.className.includes('uac-close')){
            this.onClose();
            this.refs.button.className = "uac-toggle-barcircle"
        }else{
            this.showDrawer();
            this.refs.button.className = "uac-toggle-barcircle uac-close uac-dark";
            if(localStorage.getItem('session') === 'not login'){
                message.warning('免登陆用户无法操作其他菜单!')
            }
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    logout = () => {
        this.props.history.push('/');
        sessionStorage.removeItem('session')
        localStorage.removeItem('session')
    }

    render(){
        let content = "";
        if (localStorage.getItem('session') !== 'not login') {
            content = (
                <React.Fragment>
                    <p style={{
                        color: '#00b0da',
                        margin:'10px 0',
                        cursor: 'pointer'}}
                        onClick={() => this.props.history.push('/app/dailyInsert')}>日报填写</p>
                    <hr style={{
                        border: 'none',
                        borderBottom:'1px solid #d5d5d5'
                    }}></hr>
                    <p style={{
                        color: '#00b0da',
                        margin:'10px 0',
                        cursor: 'pointer'
                    }}  onClick={() => this.props.history.push('/app/list')}>日报查询</p>
                    <hr style={{
                        border: 'none',
                        borderBottom:'1px solid #d5d5d5'
                    }} />
                </React.Fragment>
            )
        }
        return (
            <div ref="button" onClick={this.handleClick.bind(this)} id="gf-nav-toggle" className="uac-toggle-barcircle">
                <div className="uac-top"></div>
                    <div>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64px" height="64px" 
                        viewBox="0 0 64 64" enableBackground="new 0 0 64 64" 
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve">
                            <path className="uac-circle" fill="none" strokeWidth="2" strokeMiterlimit="10" 
                            d="M16,32h32c0,0,11.723-0.306,10.75-11c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32">
                            </path>
                        </svg> 
                    </div>
                <div className="uac-bottom"></div>
                <Drawer
                    title="TMS Menu"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{color: '#00b0da'}}
                >
                    {content}
                    <p style={{
                        color: '#00b0da',
                        margin:'10px 0',
                        cursor: 'pointer'
                    }}  onClick={this.logout.bind(this)}>退出</p>
                </Drawer>
            </div>
        )
    }
}
export default CustomMenu