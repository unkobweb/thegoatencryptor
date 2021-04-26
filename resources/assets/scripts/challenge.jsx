import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';

class Input extends React.Component{
    constructor(props){
        super(props)
        this.state = { flag: '', message: null, finished: false, fetched: false }
        this.handleChange = this.handleChange.bind(this)
        this.submitFlag = this.submitFlag.bind(this)
        this.challengeId = document.querySelector("#exercice").dataset.id
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        fetch("/isAlreadyFinished/"+this.challengeId).then(res => res.json()).then(data => {
            if (data.state == true){
                this.setState({message: {message: "Vous avez terminé cet exerice", type: "success"},finished: data.state, fetched: true})
            } else {
                this.setState({finished: data.state, fetched: true})
            }
        })
    }

    submitFlag(){
        fetch("/submitFlag",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.challengeId,
                flag: this.state.flag
            })
        }).then(res => res.json()).then(data => {
            this.setState({message:data, finished: data.type == "success" ? true : false})
            if (data.type == "success"){
                toast.success('👏 Exercice réussi !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        })
    }
    
    render(){
        if (this.state.fetched){
            return (
                <div id='submiter'>
                    <ToastContainer/>
                    { (this.state.message !== null || this.state.finished) &&
                        <span className={this.state.message.type}>{this.state.message.message}</span>
                    }
                    { !this.state.finished && 
                        <div>
                            <input type="text" placeholder="Réponse du challenge" name="flag" value={this.state.flag} onChange={this.handleChange} />
                            <button onClick={this.submitFlag} id="submitbtn">Envoyer le flag</button>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

ReactDOM.render(<Input />,document.querySelector("#input"))