import React from 'react'
import EditorJs from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './EditorTools'

export default function RichEditor(props) {
  const { data } = props
  return (
    <EditorJs
      data={data}
      tools={EDITOR_JS_TOOLS}
      style={{
        minHeight: '200px',
        overflow: 'auto',
        overflowX: 'hidden',
        marginBottom: '10px',
      }}
    />
  )
}
