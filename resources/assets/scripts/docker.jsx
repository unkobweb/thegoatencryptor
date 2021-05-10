import React from 'react';
import ReactDOM from 'react-dom';

class DockerInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {docker_ip: null, destroy_at: null, remaningTime: "XX:XX:XX", fetched: false, slug: document.querySelector("#exercice").dataset.slug}
        this.callADocker = this.callADocker.bind(this)
        this.parseDate = this.parseDate.bind(this)
        this.killADocker = this.killADocker.bind(this)
    }

    componentDidMount(){
        fetch("/docker/getActualDocker/"+this.state.slug).then(res => res.json()).then(data => {
            if (data.state){
                this.setState({
                    docker_ip: data.ip,
                    destroy_at: data.destroyAt,
                    fetched: true,
                    remaningTime: this.parseDate(data.destroyAt)
                })
            } else {
                this.setState({fetched: true})
            }
        })
        setInterval(() => {
            this.setState({
                remaningTime: this.parseDate(this.state.destroy_at)
            })
        },1000)
    }

    parseDate(date) {
        if (!date) {
            return "XX:XX:XX"
        }
        const now = new Date()
        const old = new Date(date)

        const difference = new Date((old.getTime() - now.getTime()))
        const resultString = difference.toUTCString().split(" ")[4]

        return resultString
    }

    callADocker(){
        fetch("/docker/start/"+this.state.slug).then(res => res.json()).then(data => {
            this.setState({docker_ip: data.ip, destroy_at: data.destroyAt, remaningTime: this.parseDate(data.destroyAt)})
        })
    }

    killADocker(){
        fetch("/docker/kill").then(res => {
            this.setState({docker_ip: null, destroy_at: null})
        })
    }

    render(){
        if (!this.state.fetched){
            return (
                <p>Récupération des informations en cours..</p>
            )
        }
        else if (!this.state.docker_ip){
            return (
                <button id="launchDocker" onClick={this.callADocker}>Lancer le conteneur</button>
            )
        } else {
            return(
                <div>
                    <p>IP de votre cible : {this.state.docker_ip}</p>
                    <p>Temps restant : {this.state.remaningTime}</p>
                    <button id='stopDocker' onClick={this.killADocker}>Stopper le conteneur</button>
                </div>
            )
        }
    }
}

ReactDOM.render(<DockerInfo/>,document.querySelector('#docker'))