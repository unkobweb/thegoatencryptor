import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

class Navigator extends React.Component{
    constructor(props){
        super(props)
        this.state = {categories : []}
    }
    
    componentDidMount(){
        axios.get("/challenges").then(res => this.setState({categories: res.data})).then(() => {
            $('.sub-menu ul').hide(); 
            $(".sub-menu a").click(function () {
                $(this).parent(".sub-menu").children("ul").slideToggle("100");
                $(this).find(".right").toggleClass("fa-caret-right fa-caret-down");
            });
        })
    }

    render() {
        const categories = this.state.categories.map(category => {
            const challenges = category.challenge.map(chal => (
                <li key={chal.id}><a href={"/challenge/"+chal.id}>{chal.label}</a></li>
            ))
            return (
                <li key={category.id} className="sub-menu"><a>{category.label}<div className="fa fa-caret-right right"></div></a>
                    <ul>
                        {challenges}
                    </ul>
                </li>
            )
        })
        return (
            <div>
                <nav>
                    <ul>
                        <li><a href='/'>Accueil</a></li>
                        {categories}
                        <li><a href='#account'>Mon compte</a></li>
                        <li><a href='/logout'>Deconnexion</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

ReactDOM.render(<Navigator />,document.querySelector("#navbar"))