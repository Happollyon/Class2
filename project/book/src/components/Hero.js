import React from "react";

function Hero(){

    return(
        <div id='hero'>
            <div id='img1'>
                <div id="heading-cont"><h1>BOOKAUDIT</h1><div id='quote'> The more that you read, the more things you will know.<br/> The more that you learn, the more places you’ll go.<br/> —Dr. Seuss</div></div>
              <img src={require("./imgs/my-secret-plan-to-rule-the-world-book-1765033.JPEG")}/>
            </div>
            <div id='hero-cont'>
                <div id='img2'><img src={require("./imgs/golden-cup-and-basket-with-books-6332.jpg")}/></div>
                <div id='img3'><img src={require('./imgs/unknown-celebrity-holding-blue-book-2253753.jpg')}/></div>
            </div>

        </div>
    )
}
export default Hero