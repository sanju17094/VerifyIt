const initialColor = 'white';
const changeColor = (state=initialColor,action)=>{
    switch(action.type){
        case 'RED' : return "red";
        case 'GREEN':return "green";
        case 'BLACK':return "black";
        default : return 'white'
}
}
export default changeColor