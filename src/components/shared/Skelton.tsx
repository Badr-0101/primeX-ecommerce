import React from 'react'

const Skelton = () => {
    const array = [1,2,3,4,5,6]
  return (
     array.map((_, index) => (
                <div key={index} className="relative flex flex-col items-center animate-pulse gap-2 w-full">
                  <div className="w-full aspect-square rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                  <div className="w-2/3 h-8 bg-gray-300 dark:bg-gray-600 absolute bottom-4 rounded"></div>
                </div>
     ))
    )
}

export default Skelton