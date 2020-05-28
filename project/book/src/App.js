import React , {Component} from "react";
import Header from "./components/Header";


class App extends React.Component
{ constructor(props)
    {
    super(props);
    this.state=
        {
            password:'',
            user:'',
            search:'',
            title_result:[],
            isbn_result:[],
            author_result:[],
            logged:'',
            rate:'',
            review_posted:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginCall=this.loginCall.bind(this)
        this.searchCall=this.searchCall.bind(this)
        this.logged=this.logged.bind(this)
    }

     logged()
     {  alert('11')
         this.setState({logged:'true'})
     }

        handleChange(event) //function to handle forms inputs.
    {   let name =event.target.name
        this.setState({ [name]:event.target.value})
    }

    //checks database for book searched
    searchCall()
    {   let url='/api/search/'
        fetch(url+ this.state.search,{method:'post'}).then(
            response=>{if(response.status==200)
            {
                response.json().then(response=>{
                    this.setState({title_result:response.title_result,isbn_result:response.isbn_result,author_result:response.author_result})
                })
            }else alert('someting went wrong')}
        )

    }

    //checks database for user and password
    loginCall(){

        let user=this.state.user
        let pass=this.state.password
        let route= '/api/loginform/'+user+'/'+pass
        fetch(route,
            {method:'POST'}).then(response=>{if (response.status ==200)

        {
            response.json().then(response=>{this.setState({logged:response.login})})


        }
        else alert('someting whent wrong')
        })
    }
     render()
     {
         return(

             <div id='app'>
                <Header l={this.logged} rate={this.state.rate} review_posted={this.state.review_posted} title_result={this.state.title_result} isbn_result={this.state.isbn_result} author_result={this.state.author_result}  searchCall={this.searchCall}logged={this.state.logged} user={this.state.user} password={this.state.password} loginCall={this.loginCall} handleChange={this.handleChange} />
             </div>
         )
     }
}
export default App