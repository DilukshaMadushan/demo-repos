//Rate bar (as a class component)
import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import '../RateBar.css'

class RateBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            tempVal: 0
        }
    }

    changeRating(val) { //method to change rating state
        this.setState({
            rating: val
        }, () => console.log(this.state.rating))   //callback to log state change
    }

    changeTemp(val) { //method to change temp rating state 
        this.setState({
            tempVal: val
        })
    }
    //Should we get rid of value in <input>

    render() {
        return (
            <div>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1

                    return (
                        // key is the unique key for list elements
                        <label key={index}>
                            <input
                                type='radio' name='rating'
                                onClick={() => this.changeRating(ratingValue)} />
                            <FaStar className='Star' size={50}
                                color={ratingValue <= (this.state.rating || this.state.tempVal) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => this.changeTemp(ratingValue)}
                                onMouseLeave={() => this.changeTemp(0)} />
                        </label>
                    )
                })}
            </div>
        )
    }
}

export default RateBar


// const RateBar = () => {
//     return (
//         <div>
//             {[...Array(5)].map((star, index) => {
//                 const ratingValue = index

//                 return (
//                     <label>
//                         <input type='radio' name='rating' value={ratingValue} onClick={this.changeRating} />
//                         <FaStar className='Star' size={50} />
//                     </label>
//                 )
//             })}
//         </div>
//     )
// }
// // https://www.youtube.com/watch?v=eDw46GYAIDQ
// export default RateBar