import React, { Component } from 'react'
import '../styl/clock.scss'
class CustomButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount(){
        var secondsNode = document.getElementById("seconds");
        var miniteNode = document.getElementById("minite");
        var timeNode = document.getElementById("time");

        setInterval(function () {
            var nowDate = new Date();//每次读取当前时间
            var hour = nowDate.getHours();
            var minute = nowDate.getMinutes();
            var second = nowDate.getSeconds();

            var circleHour = hour % 12 * 30;
            timeNode.style.transform = "rotate(" + circleHour + "deg)";//读取到的时间为24小时制，转换为12小时
            miniteNode.style.transform = "rotate(" + minute * 6 + "deg)";
            secondsNode.style.transform = "rotate(" + second * 6 + "deg)";
        }, 1000);
    }

    render(){
        return (
            <div id="clock">
                {/* <div className="t2"> */}
                    {/* <div className="t3"> */}
                        <div className="container">
                            <i className="hour hour3">3</i>
                            <i className="hour hour6">6</i>
                            <i className="hour hour9">9</i>
                            <i className="hour hour12">12</i>
                            <div id="seconds"></div>
                            <div id="minite"></div>
                            <div id="time"></div>
                            <div id="point"></div>
                        </div>
                    {/* </div> */}
                {/* </div>  */}
            </div>
        )
    }
}
export default CustomButton