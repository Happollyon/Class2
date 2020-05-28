import React from "react";
import RegisterForm from "./RegisterForm";
import Circles from "./Circles";

class Register extends React.Component{
    constructor(props)
    {
        super(props);
    }

render()
{
    return(
        <div id="Register">
            <RegisterForm l={this.props.l}/>
            <Circles/>

        </div>
    )
}
}


export default Register