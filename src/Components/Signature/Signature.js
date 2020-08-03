import React from 'react';



class Signature extends React.Component {
    render() {

        return (
            <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <h4 className = "white">A nonsense project by <a 
                rel="noopener noreferrer"
                target = "_blank" 
                href ="https://mattseidholz.com" 
                className = ''>Matt Seidholz</a></h4>
                
            </div>
        )
    }
}

export default Signature
