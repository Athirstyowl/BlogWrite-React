import React from 'react'

function Logo({width = '100px', src="https://image.similarpng.com/very-thumbnail/2021/05/Illustration-of-logo-design-template-on-transparent-background-PNG.png" , className}) {
  return (
    src ? <img width={width} src={src} alt='Not found' className={className}/> : <div>Logo</div>

  )
}

export default Logo