import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const TOOLBAR_OPTIONS = [
  [{ 'font': [] }, { 'size': [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'script': 'super' }, { 'script': 'sub' }],
  [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  ['direction', { 'align': [] }],
  ['link', 'image', 'video', 'formula'],
  ['clean']
]

export default function TextEditor() {

  const [socket, setSocket] = useState()  // initializes a state variable socket that can be updated via setSocket from anywhere else.
  const [quill, setQuill] = useState()

  /* ========== Connect the Server to the Client ======= */
  useEffect(() => {
    const s = io('http://localhost:3001') // Establishing a socket connection when the component mounts : only 1st time []
    setSocket(s)

    // disconnect when the component unmounts
    return () => {
      s.disconnect()
    }
  }, [])


  /* ========= Detect changes whenever quill changes and emit it to Server ============ */
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;  // Ignore changes not initiated by the user

      socket.emit("send-changes", delta);  // Emit changes to the server via socket
    };

    quill.on('text-change', handler);  // Attach text-change event listener to Quill

    return () => {
      quill.off('text-change', handler);  // Clean up: Remove event listener when component unmounts
    };
  }, [socket, quill]) // Dependency array: Run effect when socket or quill changes


  /* ========= Detect whenever socket emits a change event and update text editor contents ============ */
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta)
    };

    socket.on('receive-changes', handler);  // Attach text-change event listener to Quill

    return () => {
      socket.off('text-change', handler);  // Clean up: Remove event listener when component unmounts
    };
  }, [socket, quill]) // Dependency array: Run effect when socket or quill changes


 /*  ========== Set Content according to Document ID ========= */
  const {documentId} = useParams()
  useEffect(() => {
    if(socket == null || socket == null) return

    // event listener
    socket.once('load-document', document => { 
      quill.setContents(document)
      quill.enable()
    })

    socket.emit('get-document', documentId)
  }, [socket, quill, documentId])

  /* ========= Render the Quill Text Editor ======== */

  /* we need to render the text editor only once, when we first render the page
  Empty dependency array []  -> makes sure its rendered only the first time the component mounts */

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
    q.disable()
    q.setText('Loading...')
    setQuill(q)
  }, [])

  return <div className="container" ref={wrapperRef}></div>

}