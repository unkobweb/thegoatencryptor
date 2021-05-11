function getInviteCode(){
    fetch("/getInviteCode").then(res => res.json()).then(data => console.log(data))
}