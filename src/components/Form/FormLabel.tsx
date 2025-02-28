import React from 'react'

type FormLabel = {
  text: string,
  className: string
}

function FormLabel({ className, text }: FormLabel) {
  return (
    <p className={`${className}`}>{text}</p>
  )
}

export default FormLabel