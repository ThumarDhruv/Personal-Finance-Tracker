// import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function RichTextEditor({ value, onChange, className }: Props) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className={className}
    />
  )
}