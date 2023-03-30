import React from 'react'

export default function Modal({isCorrect,turn,solution}) {
  return (
    <div className='modal'>
        {isCorrect &&
            <div>
                <h1>You Win !!</h1>
                <p className='solution'>Correct answer is {solution}</p>
                <p>You have won in {turn} attempt :)</p>
            </div>
        }
        {!isCorrect &&
            <div>
                <h1>You Lost !!</h1>
                <p className='solution'>Correct answer is {solution}</p>
                <p>Better luck next time :)</p>
            </div>
        }
    </div>
  )
}
