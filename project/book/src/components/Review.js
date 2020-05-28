import React from "react";

class Review extends React.Component
{
    constructor(props) {
        super(props);

    }

    render() {
        var i =0
        var stars=[]

        //prints number of stars according to users review
       while (i<this.props.vote)
        {
                i = i+1
              stars.push(<div id='star'><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 31.5 29.25"><path id="Icon_ionic-ios-star2" data-name="Icon ionic-ios-star" d="M32.555,13.5H22.212L19.069,4.12a1.139,1.139,0,0,0-2.138,0L13.788,13.5H3.375A1.128,1.128,0,0,0,2.25,14.625a.827.827,0,0,0,.021.19,1.081,1.081,0,0,0,.471.795l8.5,5.991L7.98,31.085a1.128,1.128,0,0,0,.387,1.266A1.088,1.088,0,0,0,9,32.625a1.378,1.378,0,0,0,.7-.253L18,26.459l8.3,5.913a1.318,1.318,0,0,0,.7.253,1.01,1.01,0,0,0,.626-.274,1.114,1.114,0,0,0,.387-1.266L24.75,21.6l8.43-6.047.2-.176a1.18,1.18,0,0,0,.366-.752A1.191,1.191,0,0,0,32.555,13.5Z" transform="translate(-2.25 -3.375)" fill="#bf625a"/></svg></div>)

        }
        return (
            <div id='review-container'>

                <div id='votes'>

                    {stars}

                </div>
                   <div id='review'>
                       {this.props.review}
                   </div>


            </div>
        );
    }


}
export default Review