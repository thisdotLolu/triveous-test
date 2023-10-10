/* eslint-disable react-hooks/exhaustive-deps */
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import {FaBold,FaItalic,FaStrikethrough,FaHeading,FaYoutube, FaListOl, FaListUl,FaCode, FaParagraph, FaUndoAlt,FaRedoAlt, FaImage, FaUpload} from 'react-icons/fa'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'


const MenuBar = ({editor}) => {

  const widthRef = React.useRef(null)
  const heightRef = React.useRef(null)

  React.useEffect(() => {
    if (widthRef.current && heightRef.current) {
      widthRef.current.value = 640
      heightRef.current.value = 480
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthRef.current, heightRef.current])

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
        height: Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
      })
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState('')
  const[imageUrl, setImageUrl] = useState('')

  useEffect(()=>{
    if(imageUrl){
      editor.chain().focus().setImage({ src: imageUrl }).run()
    }
  },[imageUrl])



  if (!editor) {
    return null
  }

  const handleChange =(e)=>{
    const file = e.target.files?.[0];
        console.log(file)
        setFile(file);
    
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            const dataUrl = reader.result;
            setImageUrl(dataUrl);
          };
          reader.readAsDataURL(file)
      }
  }




  const addImage = () => {
    const url = window.prompt('URL')

    // console.log(url)
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  


  return (
    <div className='edit-options'>
      <button
      title='Bold text'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold/>
      </button>
      <button
      title='Italic text'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic/>
      </button>
      <button
      title='Strikethrough'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough/>
      </button>
      <button
      title='Code'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <FaCode/>
      </button>
     
      <button
      title='Paragraph'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
      <FaParagraph/>
      </button>
      <button
      title='Heading 1'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <FaHeading/>1
      </button>
      <button
      title='Heading 2'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <FaHeading/>2
      </button>
      <button
      title='Heading 3'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <FaHeading/>3
      </button>
      <button
      title='Heading 4'
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <FaHeading/>4
      </button>
      <button
      title='Heading 5'
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <FaHeading/>5
      </button>
      <button
      title='Heading 6'
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <FaHeading/>6
      </button>
      <button
      title='Bullet List'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FaListUl/>
      </button>
      <button
      title='Unordered List'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FaListOl/>
      </button>
      <button 
      title='Upload image with link'
      onClick={addImage}><FaImage/></button>

      <label 
      title='Upload image from device'
      className='imageUpload'
      htmlFor="img">
        <FaUpload/>   
      </label>
      <input
              onChange={(e) => handleChange(e)}
              style={{display:"none"}}
              id="img"
              type="file"

      />

<button id="add" onClick={addYoutubeVideo}><FaYoutube/></button>
      <input id="width" type="number" min="320" max="1024" ref={widthRef} placeholder="width" />
      <input id="height" type="number" min="180" max="720" ref={heightRef} placeholder="height" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <FaRedoAlt/>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <FaUndoAlt/>
      </button>

     

      
    </div>
  )
}






export const EditorPage = ()=>{
  const editor = useEditor({
    extensions:[
      StarterKit,
      Image,
      Youtube.configure({
        controls: false,
      }),
    ],
    editorProps:{
      handleDrop: function(view, event, slice, moved){
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) { // if dropping external files
          let file = event.dataTransfer.files[0]; 
          let filesize = ((file.size/1024)/1024).toFixed(4);
          if ((file.type === "image/jpeg" || file.type === "image/png") && filesize < 10) { // check valid image type under 10MB
          
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.src = _URL.createObjectURL(file);
            img.onload = function () {
              if (this.width > 5000 || this.height > 5000) {
                window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
              } else {
               
              }
            };
          } else {
            window.alert("Images need to be in jpg or png format and less than 10mb in size.");
          }
          return true;
        }
        return false; 
      
      }
    },
    content:``,
    onUpdate:({editor})=>{
       
    }
  })
  
  return(
    <div
    className='editor-container'
    >
      <MenuBar
      
      editor={editor}/>
      <EditorContent editor={editor}/>
    </div>
  )
}





