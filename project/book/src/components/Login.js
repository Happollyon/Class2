import React from "react";
import Circles from "./Circles";
import Form from "./Form";



class Login extends React.Component
{
constructor(props)
{
    super(props);

}


render() {
    return (
        <div id="login">

            <Form user={this.props.user} password={this.props.password}  loginCall={this.props.loginCall} handleChange={this.props.handleChange}/>
            <Circles/>

        </div>

    )
}
}
export default Login