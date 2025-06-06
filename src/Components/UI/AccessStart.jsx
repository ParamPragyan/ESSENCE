import React from 'react'

const AccessStart = ({onClick, children}) => {
  return (
    <div className='z-40'>
      <button
        onClick={onClick}
        className=" buttonShadow1 w-20 bg-white rounded-full"
      >
       {children} 
      </button>
    </div>
  )
}

export default AccessStart