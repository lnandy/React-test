import React, { Component } from 'react'
import '../styl/slidebar.css'

class Slidebar extends Component {
    componentDidMount(){
        let me = this;
        setTimeout(() => {
            me.refs.logo.style.left = '0';
        }, 100);
    }
    render(){
        return (
            <div className="slidebar_container">
                <div className="logo" ref="logo"></div>
            </div>
        )
    }
}
export default Slidebar