import React from 'react';
import './Input.css';
import Dial from '../Dial/Dial';
import Button from '../Button/Button'
import Uploader from '../Uploader/Uploader'



class Input extends React.Component {
  
  constructor() {
    super()
    this.inputOpenFileRef = React.createRef()
  }

    render(props) {

    const {data, dispatch, startHyperbolation, reset} = this.props; 

    let zoneClass = 'drag-drop-zone'

    let fileName
  
    const filePreparer = (file) => {
      console.log('File[0].name is', file[0].name)
      console.log('FileList is', data.fileList[0])
      fileName = data.fileList[0]
      return dispatch({type: 'FILE_IS_READY', ready: 1})
    }

    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.className = zoneClass;

      let file = e.dataTransfer.files
      filePreparer(file);

      const formData = new FormData()
      formData.append('file', file[0])
      
      return fetch("http://localhost:3001/upload", {
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(obj => data.fileList.push(obj))
      .then(filePreparer(file))
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
      var file = e.target.files;
      
      
      const formData = new FormData()
      formData.append('file', file[0])

      
      return fetch("http://localhost:3001/upload", {
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(obj => data.fileList.push(obj))
      .then(filePreparer(file))
  }

  if (data.ready === 1) {
    return (
      <Uploader data = {data} dispatch = {dispatch} startHyperbolation = {startHyperbolation} /> 
    )
  }
  
  else if (data.ready === 2) {
    return (
    <div className = "box_holder">
          <div id = 'box' className = "drag-drop-zone">  
        <svg class="bi bi-file-earmark-check" width="4em" height="5.5em" viewBox="0 0 16 16" fill="#3399ff" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"/>
          <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      <p class = "finale">{`Your file is ready for Hyperbolation`}</p>
      </div>
      <Dial data = {data} dispatch = {dispatch}/>
            <div class = "break"></div>
            <Button data = {data} dispatch = {dispatch} 
            startHyperbolation = {startHyperbolation}/>
    </div>
    )}

  else 
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
          </div>
        )


    }
}

export default Input

