import React ,{Component}from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,Redirect,withRouter
} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Router>
                <nav>
                    <div id='nav-cont'>
                        <div><a href="/">BookAudit</a></div>
                        <div id="nav-cont-right">
                            <div><a href="/register">REGISTER</a></div>
                            <div><a  style={this.props.logged?{'display':'none'}:{'display':'flex'}} href="/login">LOGIN</a></div>
                            <div><a style={this.props.logged?{'display':'flex'}:{'display':'none'}} href="/">LOGOUT</a> </div>
                        </div>
                    </div>

                </nav>

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

                    <Switch>
                        <Route exact path="/" >
                            <Home/>
                        </Route>
                        <Route path="/register"render={()=>
                        {   // if user is logged in, he is directed to homepage
                            if (this.props.logged=='true')
                            {

                                return <Redirect to='/homepage'/>
                            }
                            else
                            {
                                return   <Register l={this.props.l}/>
                            }
                        }}>

                        </Route>

                        <Route path="/login" render={()=>
                        {   // if user is logged in, he is directed to homepage
                            if (this.props.logged=='true')
                            {

                                return <Redirect to='/homepage'/>
                            }
                            else
                            {
                                return <Login user={this.props.user} password={this.props.password} loginCall={this.props.loginCall} handleChange={this.props.handleChange}/>
                            }
                        }}>






                        </Route>
                        <Route path="/homepage">
                            <Homepage rate={this.props.rate} review_posted={this.props.review_posted} title_result={this.props.title_result} isbn_result={this.props.isbn_result} author_result={this.props.author_result} searchCall={this.props.searchCall} user={this.props.user} handleChange={this.props.handleChange}/>
                        </Route>
                    </Switch>


            </Router>

        )
    }
}
export default  Header