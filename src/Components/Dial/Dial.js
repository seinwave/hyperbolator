import React from 'react';
import './Dial.css';



class Dial extends React.Component {


    render(props) {

        const {data, dispatch} = this.props; 

        let orient;
        if (window.innerWidth > 1100) {
            orient = "vertical";}
        else orient = "horizontal"
        

        const handleSlider = (e) => {
            let levelSetter = Math.floor((e.target.value)/100)
            console.log("The hyperbolator is set to ", levelSetter);
            dispatch({ type: 'SET_HYPERBOLATION', hyperLevel: levelSetter})
          }

        return (
            
            
            <input type = "range" max = "500" orient = {orient}
                onChange ={e => handleSlider(e)}></input>
            
        )
    }
}

export default Dial
