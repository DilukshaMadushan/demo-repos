//Panel containing the MP profile and related MPs component
import React from 'react'
import img1 from '../assets/sample.jpg'
import RatingIndicator from './RatingIndicator';
import CommentIndicator from './CommentIndicator';
import InputRating from './InputRating'

//----------Styling----------\\
const imgconf = {
    maxWidth: '50%',  //img is resizable but max-width is preserved
    height: 'auto',
    borderRadius: '100%', //img border is circle
    display: 'block',
    marginLeft: 'auto',   //center alignment
    marginRight: 'auto',
    marginTop: '10px',
    marginBotton: '5px'
}

const ministerName = {
    fontSize: "24px",
    fontWeight: "500",
    textAlign: "right",
    margin: "5px"
}

const bulletPoints = {
    textAlign: "left",
    fontSize: "14px",
    padding: "0px",
    margin: "1px",
    boxSizing: "border-box"
}
//---------------------------\\

const Cardsample = ({ mpfName, mplName, ratings, nComments }) => {
    return (
        <div className="Panel-left">
            <div>
                <span style={ministerName}> {`${mpfName} ${mplName}`} </span>
            </div>
            <div>
                <img src={img1} alt="MP image" style={imgconf} />
            </div>
            <div style={bulletPoints}>
                <ul>
                    <li>Minister of Economics</li>
                    <li>Podujana Peramuna</li>
                    <li>Rajapakshe Regime</li>
                </ul>
            </div>
            <div>
                <RatingIndicator rating={ratings} />
                <CommentIndicator nComments={nComments} />
                <InputRating mpfName={mpfName} mplName={mplName} />
            </div>

            <a href="#">
                {/* Include MPs profile's URL */}
                <button className="My-button"> Follow </button>
            </a>
        </div>
    )
}

export default Cardsample;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// Morbi tristique sapien ac erat tincidunt, sit amet dignissim
// lectus vulputate.Donec id iaculis velit.Aliquam vel
// malesuada erat.Praesent non magna ac massa aliquet tincidunt
// vel in massa.Phasellus feugiat est vel leo finibus congue.