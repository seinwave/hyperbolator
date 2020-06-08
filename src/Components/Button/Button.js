import React from 'react';
import './Button.css'


class Button extends React.Component {
    render(props) {

        const {data, startHyperbolation, dispatch} = this.props;

        const level = data.hyperLevel;

        const reset = () => {
            dispatch({type: 'EMPTY'})
            fetch(`http://localhost:3001/delete`, {
                headers: { 'Accept': 'application/json',
                "Content-Type": 'application/json'},
                method: 'POST'
        })
                .then(resp => resp.json())

                .then(dispatch({type: 'FILE_IS_READY', ready: 0}))
        }

          

    return (
        <div>
        <button className = "hyper_button"
        onClick= {e => startHyperbolation(e)}>Hyperbolate at level {level}</button>
        <div class = "line_break">
            <h3>- Or -</h3>
        </div>
        <button className = "cancel_button"
        onClick= {e => reset(e)}>Remove & Start Over</button>
         </div>
    )
    
    }
}

export default Button;