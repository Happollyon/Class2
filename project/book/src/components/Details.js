import React from "react";
import Reviewform from "./Reviewform";
import Review from "./Review";
class Details extends React.Component
{
    constructor() {
        super();
        this.state={

            reviews:[],
            avg_rating:'',
            votes:'',
            star_value:''
        }
        this.sendReview=this.sendReview.bind(this)
        this.handleStars=this.handleStars.bind(this)
    }
    //requestes book data from database before deatails component starts mounting
    componentWillMount() {

        let url='/api/search2/'+ this.props.id+'/'+this.props.isbn
        fetch(url,
            {method:'GET'}).then(response=>{if (response.status==200)
        {
            response.json().then(response=>{

                this.setState({reviews:response.reviews})
                this.setState({avg_rating:response.avg_rating})
                this.setState({votes:response.votes})
            })
        }})
    }

    // gets the how many stars user is giving to book
    handleStars(event)
    {
       let start_value = event.currentTarget.dataset.value
        this.setState({star_value:start_value})

    }

    // sends user review to database and fetchs reviews again in order to update screen
    sendReview()
    {   let rate = this.state.star_value
        let review_posted= this.props.review_posted
        let book_id=this.props.id
        let url='/api/review/'+rate+'/'+book_id+'/'+ review_posted

        fetch(url,
            {method:'POST'}).then(response=>{
                if(response.status==200){
                    let url='/api/search2/'+ this.props.id+'/'+this.props.isbn
                    fetch(url,
                        {method:'GET'}).then(response=>{if (response.status==200)
                    {
                        response.json().then(response=>
                        {
                            this.setState({reviews:response.reviews})
                            this.setState({avg_rating:response.avg_rating})
                            this.setState({votes:response.votes})
                        })
                    }})
                }
        })

    }


        render() {
        return(
            <div id='details' className={this.props.details_class} >
                <div id='details-container' >
                    <div id='close' onClick={this.props.close}>
                        <img src={require('./imgs/Icon ionic-ios-close-circle-outline.svg')}/>
                    </div>

                    <div id='book-detials-rating'>
                    <div id='book-details'>
                        <div> Title: {this.props.title}</div>
                        <div> Author: {this.props.author}</div>
                        <div> Year: {this.props.year}</div>
                        <div> ISBN: {this.props.isbn}</div>
                    </div>
                        <div id='rating'>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="29.25" viewBox="0 0 31.5 29.25">
                                <path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M32.555,13.5H22.212L19.069,4.12a1.139,1.139,0,0,0-2.138,0L13.788,13.5H3.375A1.128,1.128,0,0,0,2.25,14.625a.827.827,0,0,0,.021.19,1.081,1.081,0,0,0,.471.795l8.5,5.991L7.98,31.085a1.128,1.128,0,0,0,.387,1.266A1.088,1.088,0,0,0,9,32.625a1.378,1.378,0,0,0,.7-.253L18,26.459l8.3,5.913a1.318,1.318,0,0,0,.7.253,1.01,1.01,0,0,0,.626-.274,1.114,1.114,0,0,0,.387-1.266L24.75,21.6l8.43-6.047.2-.176a1.18,1.18,0,0,0,.366-.752A1.191,1.191,0,0,0,32.555,13.5Z" transform="translate(-2.25 -3.375)" fill="#bf625a"/>
                                </svg>
                                {this.state.avg_rating}
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="31.5" viewBox="0 0 45 31.5">
                                    <path id="Icon_awesome-vote-yea" data-name="Icon awesome-vote-yea" d="M42.75,22.5h-4.5V27h1.575a.627.627,0,0,1,.675.563v1.125a.627.627,0,0,1-.675.563H5.175a.627.627,0,0,1-.675-.562V27.563A.627.627,0,0,1,5.175,27H6.75V22.5H2.25A2.248,2.248,0,0,0,0,24.75V31.5a2.248,2.248,0,0,0,2.25,2.25h40.5A2.248,2.248,0,0,0,45,31.5V24.75A2.248,2.248,0,0,0,42.75,22.5ZM36,27V4.521A2.27,2.27,0,0,0,33.729,2.25H11.278A2.276,2.276,0,0,0,9,4.521V27ZM14.85,14.2l1.793-1.779a.749.749,0,0,1,1.069.007l2.9,2.925,6.694-6.637a.749.749,0,0,1,1.069.007l1.779,1.793a.749.749,0,0,1-.007,1.069l-9.021,8.944a.749.749,0,0,1-1.069-.007l-5.21-5.252a.749.749,0,0,1,0-1.069Z" transform="translate(0 -2.25)" fill="#bf625a"/>
                                </svg>

                                {this.state.votes}
                            </div>
                        </div>
                    </div>


                         <Reviewform handleStar={this.handleStars}sendReview={this.sendReview} star_value={this.state.star_value}handleChange={this.props.handleChange} rate={this.props.rate} review_posted={this.props.review_posted}/>

                       <div id='review-display'>
                           {this.state.reviews.map(value=><Review key={value.id} review={value.review_text} vote={value.review_vote}/>)}
                       </div>


                </div>
                            </div>
        )
    }
}
export default Details