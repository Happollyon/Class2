import React from "react";

class RegisterForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                user:'',
                email:'',
                password:''
            }
            this.handleChange=this.handleChange.bind(this)
            this.register=this.register.bind(this)
        this.keyDown=this.keyDown.bind(this)
    }
    //whenever user presses Enter register call is made
    keyDown(event) {
        if (event.key === 'Enter') {
            return this.register()

        }
    }

    // used to handle form inputs
     handleChange(event)
     {
        let name = event.target.name
        this.setState({[name]: event.target.value})
     }

     //makes call to register user
     register()
     {
        let user= this.state.user
        let password= this.state.password
        let url = '/api/register2/'+user+'/'+password
        fetch(url,{method:'POST'}).then(response=>{if(response.status===200)
        {

                     return this.props.l()



        }else alert('something went wrong')
        })
     }

    render() {
        return (
            <div id='register-forms'>
                <div id='register-form-cont'>

                    <input type='text' autoComplete='off' placeholder='user' onChange={this.handleChange}  name='user'/>
                    <input type='text' autoComplete='off' placeholder='email' onChange={this.handleChange} name='email'/>
                    <input type='password' placeholder='******' onChange={this.handleChange} name='password'/>
                    <input type='password' placeholder='******'/>
                    <input type='submit' onClick={this.register}/>

                </div>
                <div id='register-form-img'>
                    <img src={require('./imgs/close-up-of-heart-shape-320266.jpg')}/>
                </div>
            </div>
        );
    }
}
export default RegisterForm