import React from 'react';
import './App.css';
import 'tachyons'; 
import Signature from './Components/Signature/Signature';
import Input from './Components/Input/Input';
import Dial from './Components/Dial/Dial';
import Button from './Components/Button/Button';


function App() {
  

  const initialState = {hyperLevel: 0, dropDepth: 0, inDropZone: false, fileList: []}

  const reducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
      case 'SET_DROP_DEPTH':
        return {...state, dropDepth: action.dropDepth};
      case 'SET_IN_DROP_ZONE':
        return {...state, inDropZone: action.inDropZone};
      case 'ADD_FILE_TO_LIST':
        return {...state, fileList: state.fileList.concat(action.files)}
      case 'SET_HYPERBOLATION':
        return {...state, hyperLevel: action.hyperLevel};
      case 'EMPTY':
        return {...state, fileList: []};
    };
  };

  const [data, dispatch] = React.useReducer(
    reducer, initialState
  );

  

  const startHyperbolation = () => {
    console.log("You clicked hyperbolate at level ", data.hyperLevel)
    const file = data.fileList[0]  // this just keeps adding stuff to the fileList...need to purge it every upload...

    console.log("File is ", file)
    
    fetch(`http://localhost:3001/${data.hyperLevel}`, {
      method: 'POST'
  })
    .then(resp => resp.json)
    .then(data => console.log(data))

    fetch("http://localhost:3001/download", {
      headers: { 'Accept': 'application/json',
      "Content-Type": 'application/json'},
      method: 'POST',
      body: JSON.stringify({file:file})
  })
    .then(resp => resp.blob())
    .then(blob => {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style = "display: none"
      a.href = url;
      a.download = "Your Hyperbolation.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    )
    
    dispatch({type: 'EMPTY'})
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Truth is Dead.</h1>
        <h2>Use the Hyperbolator instead.</h2>
      <Input data = {data} dispatch = {dispatch}/>
      <Dial data = {data} dispatch = {dispatch}/>
      <Button data = {data} dispatch = {dispatch} startHyperbolation = {startHyperbolation}/>
      </header>
      <Signature />
    </div>
  );
}

export default App;
