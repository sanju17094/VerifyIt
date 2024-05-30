const initialColor = 'white';

const storedTheme = JSON.parse(localStorage.getItem("theme"));
const changeColor = (state=initialColor,action)=>{
    switch(action.type){
        case 'RED' : return "red";
        case 'GREEN':return "green";
        case 'BLACK':return "black";
        case 'WHITE':return "white"
        default : return storedTheme || 'white'
}
}
export default changeColor