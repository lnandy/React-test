import React, { Component } from 'react'
import '../styl/footer.css'

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div className="footer_container" style={{ color: this.props.color ? this.props.color : ''}}>Copyright © 2019 - PPM. All Rights Reserved.</div>
        )
    }
}
export default Footer