import React from "react";

class Profile extends React.Component
{constructor() {
    super();
}
    render() {
    return(
        <div id='profile'>
            <div id='profile-user'><div id="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1" d="M0,192L40,165.3C80,139,160,85,240,74.7C320,64,400,96,480,138.7C560,181,640,235,720,266.7C800,299,880,309,960,261.3C1040,213,1120,107,1200,74.7C1280,43,1360,85,1400,106.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg>
            </div>
            <div>{this.props.user}</div>
            </div>
            <div id='profile-image'>
                <img src={require('./imgs/brown-book-page-1112048.jpg')}/>
            </div>
        </div>
    )
    }
}
export default Profile