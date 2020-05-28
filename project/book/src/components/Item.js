import React from "react";
import Details from "./Details";
class Item extends React.Component
{
    constructor(props) {
        super(props);


    }

    render() {
        return(
        <div id='item' className='show-item' data-id={this.props.id} data-year={this.props.year} data-author={this.props.author} data-isbn={this.props.isbn} onClick={this.props.details} data-title={this.props.title} >
            {this.props.title}
        </div>
    )    }

}
export default Item