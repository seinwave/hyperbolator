import React from 'react';
import './App.css';
import 'tachyons'; 
import Signature from './Components/Signature/Signature';
import Input from './Components/Input/Input';
import Dial from './Components/Dial/Dial';
import Button from './Components/Button/Button';


function App() {
  
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
    };
  };

  const [data, dispatch] = React.useReducer(
    reducer, {hyperLevel: 0, dropDepth: 0, inDropZone: false, fileList: []}
  );

  const startHyperbolation = (level) => {
    console.log("You clicked hyperbolate at level ", data.hyperLevel)
    
    fetch(`http://localhost:3001/${data.hyperLevel}`, {
      method: 'POST'
  })
    .then(resp => resp.json)
    .then(data => console.log(data))

    fetch(`http://localhost:3001/download`, {
      method: 'GET'
  })
    .then(resp => resp.blob())
    .then(blob => URL.createObjectURL(blob))  // fires the save dialogue, but fucks up the filename
    .then(url => {
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    })
    
    
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
