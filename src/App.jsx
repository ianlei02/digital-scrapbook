import React from 'react'
import BookContainer from '@/components/BookContainer'
import paperTexture from '@/assets/paper-texture.jpg'
const App = () => {
  return (
    <div className="overflow-hidden min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${paperTexture})` }}>
      <BookContainer/>
    </div>
  )
}

export default App