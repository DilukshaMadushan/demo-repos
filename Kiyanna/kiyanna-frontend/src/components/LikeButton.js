// Like button in comment cards - (class component)
import React, { Component } from 'react'
import { FaThumbsUp } from 'react-icons/fa'  //like symbol
import '../Likebutton.css'

export class LikeButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLiked: false,
            temp: false
        }
        this.toggleLike = this.toggleLike.bind(this)
        this.toggleTemp = this.toggleTemp.bind(this)
    }

    toggleLike() {
        this.setState({
            isLiked: ~this.state.isLiked       ////need to check this !!!
        })
    }

    toggleTemp() {
        this.setState({
            temp: ~this.state.temp
        })
    }

    render() {
        return (
            <div>
                <label>
                    <input type='radio' name="like" onClick={this.toggleLike} />
                    <FaThumbsUp className='Like-button' size={20}
                        color={(this.state.temp || this.state.isLiked) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={this.toggleTemp}
                        onMouseLeave={this.toggleTemp} />
                </label>
            </div>
        )
    }
}

export default LikeButton
