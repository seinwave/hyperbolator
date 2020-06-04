import React, { Component }  from 'react'
import ReactAnimatedEllipsis from 'react-animated-ellipsis';
import Dial from '../Dial/Dial';
import Button from '../Button/Button'

class Uploader extends Component{

    constructor(props){
        super(props);
        this.state = { currentCount: 2,
                    dots: 0 }
    }

    

    countDown() {
        this.setState({
            currentCount: this.state.currentCount - .2,
            dots: this.state.dots + 1 
        })
        if(this.state.currentCount < 1) { 
            return this.props.dispatch({type: 'FILE_IS_READY', ready: 2})
        }
      }

    componentDidMount() {
    this.intervalId = setInterval(this.countDown.bind(this), 200);
        }

    componentWillUnmount(){
    clearInterval(this.intervalId);
        }

    render(props) {

        let dots = ['.', '..', '...', '..', '.', '..', '...']


        return (
            <div className = "box_holder">
            <div id = 'load-box' className="drag-drop-zone">
            <svg class="bi bi-file-earmark-check" width="4em" height="5.5em" viewBox="0 0 16 16" fill="#3399ff" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
            <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
            <h3 class = "load_dots"> {dots[this.state.dots]}
            </h3>
          </div>
        </div>
      )
                
            
    }
    }

export default Uploader