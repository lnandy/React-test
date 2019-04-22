import React, { Component } from 'react';
import Clock from '../common/Clock'
import Progresswidget from './Progresswidget'

export default class SlideWidget extends Component {
    render() {
        return (
            <div className="slide_widget" style={{
                position: 'relative',
                background: '#f1f1f1',
                width: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <Clock />
                <Progresswidget/>
            </div>
        );
    }
}