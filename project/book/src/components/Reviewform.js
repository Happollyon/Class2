import React from "react";

class Reviewform extends React.Component{
    constructor(props)
    {
        super(props);

    }


    render() {

        if(this.props.star_value==='')
        {
             var content=  <div className="rating"><span onClick={this.props.handleStar} data-value='5'>☆</span><span  onClick={this.props.handleStar} data-value='4'>☆</span><span  onClick={this.props.handleStar} data-value='3'>☆</span><span  onClick={this.props.handleStar} data-value='2'>☆</span><span data-value='1'>☆</span> </div>

         }else {var i=1
             var content=[]
             var remaing=[]
            while (i<=this.props.star_value)
            {
                 content.push(<span onClick={this.props.handleStar} data-value={i}>★</span>)
                i++
            }

            while(i<=5){
             remaing.push(<span onClick={this.props.handleStar} data-value={i}>☆</span>)
                i++
            }

            content= <div className='rating'>{remaing}{content}n</div>

        }
        return (
            <div id='review-form-cont'>
                <input type='text' onChange={this.props.handleChange} name='review_posted'/>
                <div id='review-form-right'>


                    {content}

                    <input type='submit' onClick={this.props.sendReview}/>
                </div>

            </div>
        );
    }


}
export default Reviewform