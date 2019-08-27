import React from 'react'
import './Header.css'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headerDisplay: ""
        }
    }
    
    processWarningText(){
        if(this.props.gameState.warningText===""){
                // If no warning text exists, display the default message
                this.state.headerDisplay = <h1>CHECKERS MY DUDE</h1>
        }else{
            this.state.headerDisplay = <div class="annoying-animation"><h1>{this.props.gameState.warningText}</h1></div>
            // After warning timeout has reached
            if(this.props.gameState.warningTextTimeout < Date.now()){
                // Clear warning text and pass value back up
                this.props.gameState.warningText = "";
            }
        }
    }
    
    render(){
        this.processWarningText();
        return(
            <div>
                {this.state.headerDisplay}
            </div>
        )
    }
}

export default Header;