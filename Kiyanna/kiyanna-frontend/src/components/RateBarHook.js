import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './RateBar.css'
//Rate bar (as a functional component)
function RateBarHook() {

    const [rating, changeRating] = useState(0)
    const [tempVal, changeTemp] = useState(0)

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                let ratingValue = index + 1

                return (
                    // key is the unique key for list elements
                    <label key={index}>
                        <input
                            type='radio' name='rating'
                            onClick={() => changeRating(ratingValue)} />
                        <FaStar className='Star' size={15}
                            color={ratingValue <= (rating || tempVal) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => changeTemp(ratingValue)}
                            onMouseLeave={() => changeTemp(0)} />
                    </label>
                )
            })}
        </div>
    )
}

export default RateBarHook
