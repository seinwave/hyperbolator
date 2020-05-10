import React from 'react';
import './Button.css'


class Button extends React.Component {
    render(props) {

        const {data, dispatch, startHyperbolation} = this.props;

        const level = data.hyperLevel;

    return (
        <button className = "button"
        onClick= {e => startHyperbolation(e)}>Hyperbolate at level {level}!</button>
    )
    }
}

export default Button;