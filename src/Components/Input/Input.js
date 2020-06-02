import React from 'react';
import './Input.css';
import Dial from '../Dial/Dial';
import Button from '../Button/Button'



class Input extends React.Component {
  
  constructor() {
    super()
    this.inputOpenFileRef = React.createRef()
  }

    render(props) {

    const {data, dispatch, startHyperbolation} = this.props; 

    let zoneClass = 'drag-drop-zone'
  

    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.className = zoneClass;

      let files = e.dataTransfer.files
      const formData = new FormData()
      formData.append('file', files[0])
      
      return fetch("http://localhost:3001/upload", {
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(obj => data.fileList.push(obj))
    }
      

    const handleDragOver = e => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true})
    }

    const handleDragEnter = e => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
      e.target.className += '_dragged'
    }


    const handleDragLeave = e => {
      e.stopPropagation();
      if (e.target.id === 'box'){
        e.target.className = zoneClass;}
        
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1});
      if (data.dropDepth > 0) return;
      dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: false})
    }

    const openFileDlg = () => {
      this.inputOpenFileRef.current.click()

    }

    const onChangeFile = (e) => {
      e.stopPropagation();
      e.preventDefault();
      var file = e.target.files[0];
      console.log(file);
      const formData = new FormData()
      formData.append('file', file)
      
      return fetch("http://localhost:3001/upload", {
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(obj => data.fileList.push(obj))
  }

      

        return (
          <div className = "box_holder">

              <div id = 'box' className={zoneClass}
              onDrop={e => handleDrop(e)}
              onDragOver={e => handleDragOver(e)}
              onDragEnter={e => handleDragEnter(e)}
              onDragLeave={e => handleDragLeave(e)}
            >

              <div class = "button_holder">
              <input ref={this.inputOpenFileRef} type="file"
              onChange = {onChangeFile} 
              style={{display:"none"}}/>

              <button class = "upload_button"
              onClick = {openFileDlg}>Choose a File</button>
              </div>

              
              <img alt = "download arrow" src = "./assets/dl_icon.png"></img>
              <p class = "drag_prompt">
                Or drag files here to upload
              </p>
            </div>
            <Dial data = {data} dispatch = {dispatch}/>
            <div class = "break"></div>
            <Button data = {data} dispatch = {dispatch} startHyperbolation = {startHyperbolation}/>
          </div>
        )


    }
}

export default Input

