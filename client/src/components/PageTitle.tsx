import React from 'react'

interface Props {
  title: string
}

export const PageTitle = ({ title }: Props) => {
  return (
    <div className="page-title">
      <h1 className="page-title__title">{title}</h1>
    </div>
  )
}
