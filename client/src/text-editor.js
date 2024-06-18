import React, { useCallback, useEffect } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";

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


  //we do this only once, when we first render the page
  //[] -> makes sure its rendered only the first time the component mounts
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
  }, [])
  return <div class="container" ref={wrapperRef}></div>
}