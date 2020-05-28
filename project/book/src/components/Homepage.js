import React from "react";
import Circles from "./Circles";
import Search from "./Search";
import Profile from "./Profile";
class Homepage extends React.Component
{
    constructor(props) {
        super(props);

    }
   render() {return(
       <div id='homepage'>

            <Profile user={this.props.user}/>
           <Search rate={this.props.rate} review_posted={this.props.review_posted} title_result={this.props.title_result} isbn_result={this.props.isbn_result} author_result={this.props.author_result} searchCall={this.props.searchCall} handleChange={this.props.handleChange}/>
           <Circles/>

       </div>
   )
   }
}
export default Homepage