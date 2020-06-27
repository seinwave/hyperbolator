import React from 'react';
import './Dial.css';



class Dial extends React.Component {


    render(props) {

        const {dispatch} = this.props; 



        const handleSlider = (e) => {
            let levelSetter = Math.floor((e.target.value)/100)
            console.log("The hyperbolator is set to ", levelSetter);
            dispatch({ type: 'SET_HYPERBOLATION', hyperLevel: levelSetter})
          }

        return (
            
            
            <input type = "range" max = "500" 
                onChange ={e => handleSlider(e)}></input>
            
        )
    }
}

export default Dial
