import React from 'react'
import classes from './PageContent.module.scss';


interface PageContentProps {
    children:React.ReactNode
}

const PageContent = ({children}:PageContentProps) => {
  return (
    <div className={classes.__content_page}>
      {children}
    </div>
  )
}

export default PageContent