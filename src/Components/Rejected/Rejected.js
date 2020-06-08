import React, { Component }  from 'react'


class Rejected extends Component{

    render(props) {

        const {dispatch} = this.props;

        const reset = () => {
            dispatch({type: 'EMPTY'})
            dispatch({type: 'FILE_IS_READY', ready: 0})
          }

        return (
        <div>
          <button className = "cancel_button"
            onClick= {e => reset(e)}>Start Over</button>
        </div>
      )
                
            
    }
    }

export default Rejected