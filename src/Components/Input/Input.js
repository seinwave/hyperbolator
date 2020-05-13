import React from 'react';
import './Input.css'



class Input extends React.Component {
    render(props) {

    const {data, dispatch} = this.props; 

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
      
      //return setTimeout(handleUpload(file),1000);


    // const handleUpload = (file) => {
    //   fetch("http://localhost:3001/upload", {
    //   method: 'POST',
    //   body: JSON.stringify(file)
    //   })
    //   .then(response => response)
    //   .then(data => console.log("The data is", data));
    // }

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

      

        return (
              <div id = 'box' className={zoneClass}
              onDrop={e => handleDrop(e)}
              onDragOver={e => handleDragOver(e)}
              onDragEnter={e => handleDragEnter(e)}
              onDragLeave={e => handleDragLeave(e)}
            >
              <img alt = "download arrow" src = "./assets/dl_icon.png"></img>
              <p>
                Drag files here to upload
              </p>
            </div>
        )


    }
}

export default Input
