import React from 'react';
import './App.css';
import 'tachyons'; 
import Signature from './Components/Signature/Signature';
import Input from './Components/Input/Input';
import Dial from './Components/Dial/Dial';

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
    };
  };

  const [data, dispatch] = React.useReducer(
    reducer, {dropDepth: 0, inDropZone: false, fileList: []}
  );


  return (
    <div className="App">
      <header className="App-header">
        <h1>Truth is Dead.</h1>
        <h2>Use the Hyperbolator instead.</h2>
        <Dial /> 
      <Input data = {data} dispatch = {dispatch}/>
      </header>
      
      <Signature />
    </div>
  );
}

export default App;
