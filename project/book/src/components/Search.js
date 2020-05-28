import React from "react";
import Item from "./Item";
import Details from "./Details";
import Homepage from "./Homepage";

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:'',
            author:'',
            details_class:'',
            isbn:'',
            title:'',
            year:'',
            show:'',

        }
        this.keyDown=this.keyDown.bind(this)
        this.details=this.details.bind(this)
        this.close = this.close.bind(this)
    }
    close()
    {
        this.setState({show:''})
        this.setState({details_class:'hide_details'})

    }
    details(event)
    {   this.setState(({details_class:'show_details'}))
        this.setState({show:'true'})
        var id = event.target.dataset.id
        var title= event.target.dataset.title
        var isbn = event.target.dataset.isbn
        var year = event.target.dataset.year
        var author= event.target.dataset.author
        this.setState({id:id})
        this.setState({isbn:isbn})
        this.setState({author:author})
        this.setState({title:title})
        this.setState({year:year})

    }
    keyDown(event){
        if(event.key==='Enter')
        {
            return  this.props.searchCall()

        }
    }
    render() {
        let detais = ''
        if(this.state.show=='true')
        {
            detais=<Details  details_class={this.state.details_class} close={this.close} rate={this.props.rate} review_posted={this.props.review_posted} id={this.state.id} author={this.state.author } handleChange={this.props.handleChange} isbn={this.state.isbn} author={this.state.author} title={this.state.title} year={this.state.year} />
        }
        return(

            <div id='search'>
                <div id='search-cont'>
                <input type='text' autoComplete="off" name='search' onChange={this.props.handleChange} onKeyDown={this.keyDown} placeholder='search'/>
                <div id='search-icon' onClick={this.props.searchCall}><svg xmlns="http://www.w3.org/2000/svg" id="Symbol_209_1" data-name="Symbol 209 – 1" width="16" height="16" viewBox="0 0 16 16">
                    <rect id="Rectangle_693" data-name="Rectangle 693" width="16" height="16" fill="none"/>
                    <path id="Path_208" data-name="Path 208" d="M15.9,14.5l-3.3-3.3A6.847,6.847,0,0,0,14,7,6.957,6.957,0,0,0,7,0,6.957,6.957,0,0,0,0,7a6.957,6.957,0,0,0,7,7,6.847,6.847,0,0,0,4.2-1.4l3.3,3.3ZM2,7A4.951,4.951,0,0,1,7,2a4.951,4.951,0,0,1,5,5,4.951,4.951,0,0,1-5,5A4.951,4.951,0,0,1,2,7Z" fill="#fff"/>
                </svg></div>
                </div>
                <div id={'display-itens'}>

                    {this.props.title_result.map(value => <Item details={this.details} onclick={this.details} show={this.state.show} key={value.id} id={value.id} year={value.year} isbn={value.isbn} author={value.author} title={value.title}/>)}

                    {this.props.author_result.map(value=><Item onClick={this.details} onclick={this.details} id={value.id}isbn={value.isbn} year={value.year} author={value.author} show={this.state.show}key={value.id}title={value.title}/>)}

                    {this.props.isbn_result.map(value=><Item onClick={this.details} onclick={this.details} id={value.id} isbn={value.isbn} year={value.year} author={value.author} show={this.state.show}key={value.id} title={value.title}/>)}
                    {detais}
                </div>
            </div>
        )
    }


}
export default Search