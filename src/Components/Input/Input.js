import React from 'react';
import './Input.css';
import Dial from '../Dial/Dial';
import Button from '../Button/Button'
import Uploader from '../Uploader/Uploader'
import Rejected from '../Rejected/Rejected'


class Input extends React.Component {
  
  constructor() {
    super()
    this.inputOpenFileRef = React.createRef()
  }

    render(props) {

    const {data, dispatch} = this.props; 

    let zoneClass = 'drag-drop-zone'


    const doc = /doc/
    const txt = /txt/
    const docx = /docx/

  
    const filePreparer = (file) => {
      if (doc.test(file[0].name) || txt.test(file[0].name) || docx.test(file[0].name)) {
        return dispatch({type: 'FILE_IS_READY', ready: 1})
        
    }

      else {console.log('wrong!')
      return dispatch({type: 'FILE_IS_READY', ready: 4})
  }
    }

    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.className = zoneClass;

      let file = e.dataTransfer.files

      const formData = new FormData()
      
      formData.append('file', file[0])
      
      return fetch("https://hyperbolator.herokuapp.com/upload", {
      headers: {"Access-Control-Allow-Origin": "*"},
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

      return fetch("https://hyperbolator.herokuapp.com/upload", {
      headers: {"Access-Control-Allow-Origin": "*"},
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(obj => data.fileList.push(obj))
      .then(filePreparer(file))
  }


  const startHyperbolation = () => {
    fetch(`https://hyperbolator.herokuapp.com/${data.hyperLevel}`, {
      headers: { 'Accept': 'application/json',
      "Content-Type": 'application/json'},
      method: 'POST',
      body: JSON.stringify({file: data.fileList[0]}) // this is an empty object, now. Wtf.
  })
    .then(resp => resp.blob())
    .then(blob => {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style = "display: none"
      a.href = url;
      a.download = "Your Hyperbolation";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    )
  }

  if (data.ready === 1) {
    return (
      <Uploader data = {data} 
      dispatch = {dispatch} 
      startHyperbolation = {startHyperbolation} /> 
    )
  }
  
  else if (data.ready === 2) {
    return (
    <div className = "box_holder">
          <div id = 'box' className = "drag-drop-zone">  
            <svg className="bi bi-file-earmark-check" width="4em" height="5.5em" viewBox="0 0 16 16" fill="#3399ff" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"/>
              <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z"/>
            </svg>
      <p className = "finale">{`Your file is ready for Hyperbolation`}</p>
      </div>
      <Dial data = {data} dispatch = {dispatch}/>
            <div className = "break"></div>
            <Button data = {data} dispatch = {dispatch} 
            startHyperbolation = {startHyperbolation}/>
    </div>
    )}

    else if (data.ready === 4) {
      return (
        <div className = "box_holder">
            <div id = 'load-box' className="drag-drop-zone">
              <svg className ="bi bi-x-circle-fill" width="4em" height="5.5em" viewBox="0 0 16 16" fill="#ff7f7f" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
              </svg>
            <h2>Rejected. 
            </h2>
            <h4>The Hyperbolator only accepts .txt, .doc, or .docx files</h4>
          </div>
          <div class = "break"></div>
        <Rejected dispatch = {dispatch} />
      </div>
      )
    }

  else 
        return (

          
          <div className = "box_holder">
              <div id = 'box' className={zoneClass}
              onDrop={e => handleDrop(e)}
              onDragOver={e => handleDragOver(e)}
              onDragEnter={e => handleDragEnter(e)}
              onDragLeave={e => handleDragLeave(e)}
            >

              <div className = "button_holder">
              <input ref={this.inputOpenFileRef} type="file"
              accept = '.docx, .txt, .doc'
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

