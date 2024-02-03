import React from 'react'

const AccessButtons = ({onClick, children}) => {
    return (
      <div className='z-40'>
        <button
          onClick={onClick}
          className="buttonShadow1 w-20 bg-white rounded-full z-30 "
        >
         {children} 
        </button>
      </div>
    )
  }
  


export default AccessButtons