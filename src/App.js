import React from 'react';
import './App.css';
import 'tachyons'; 
import Signature from './Components/Signature/Signature';
import Input from './Components/Input/Input';

function App() {
  

  const initialState = {ready: 0, innerWidth: 0, hyperLevel: 0, dropDepth: 0, inDropZone: false, fileList: []}

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
      case 'WINDOW_RESIZE':
        return {...state, innerWidth: action.innerWidth};
      case 'FILE_IS_READY':
        return {...state, ready: action.ready}
      case 'EMPTY':
        return {...state, fileList: []};
      case 'RESET':
        return {...state, state: initialState}
    };
  };

  const [data, dispatch] = React.useReducer(
    reducer, initialState
  );


  return (
    <div className="App">
      <header className="App-header">
        <h1>Truth is Dead.</h1>
        <h2>Use the <code> Hyperbolator</code> instead.</h2>
      <Input data = {data} 
      dispatch = {dispatch} 
      />
      </header>
      <Signature />
    </div>
  );
}

export default App;
