//MP thumbnails in related MPs section
import React, {Component} from "react";
import img1 from "../assets/sample.jpg";
import RatingIndicatorNoText from "./RatingIndicatorNoText";
import { render } from "@testing-library/react";

import {connect} from 'react-redux';
import {addItem} from "../store/mpRedux";


import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


//----------Styling----------\\
const imgconf = {
  Width: "40px", //img is resizable but max-width is preserved
  height: "40px",
  borderRadius: "100%", //img border is circle
  display: "block",
  marginLeft: "auto", //center alignment
  marginRight: "auto",
  marginTop: "5px",
  marginBotton: "2.5px",
};
//----------------------------\\


class MPthumb extends Component {
  constructor(props) {
    super(props);
    

    this.passingId = this.passingId.bind(this);
  }

  state = {
    redirect:false
  }

  //----------- redirect to MP ------------------

  passingId = (id) => {
    cookies.set('mp-id',id,{path:'/',domain : 'kiyanna.world', secure:true});
    setTimeout(function(){ window.location.reload(true); }, 500);
    
    //this.setRedirectToMp();
    //this.props.addItem(id);
  };

  setRedirectToMp = () => {
    this.setState({redirect: true})
  }  
  
  renderRedirectToMP = () => {
    if (this.state.redirect) {
      return <Redirect to='/home/mp-profile'/>
    }
  }


  render(){
    const { mpFname, mpLname, rating, mpLink, mpImg, id } = this.props;
  return (
    <div
      style={{ marginTop: "10px", marginBottom: "10px", fontSize: "0.5rem" }}
    >
      {this.renderRedirectToMP()}
      <div className="d-flex justify-content-center">
        <Link onClick={()=>this.passingId(id)}>
          <img
            className="img-fluid rounded-circle"
            style={{ maxWidth: "50px", height: "50px" }} ///
            src={mpImg}
            alt="Card image cap"
          />
        </Link>
      </div>
      <div className="text-center">
        <div>{`${mpFname}`}</div>
        <div>{`${mpLname}`}</div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <RatingIndicatorNoText rating={rating} />
          </div>
        </div>
        <div className="d-flex justify-content-center p-0 flex-grow-0">
          <div>Rating {rating}</div>
        </div>
      </div>
    </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addItem:(item) => dispatch(addItem(item)),
  }
}

export default connect(null,mapDispatchToProps)(MPthumb);


