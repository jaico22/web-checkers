import React from 'react'
import './ScoreBoard.css'
import figlet from "figlet"
import jquery from "jquery"

class ScoreBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: "" 
        }
    }

    render(){
        return(
            <div class="scoreboard-container">
            <div class="marquee">
                <div>
                    <span>
                        <h2>
                            {this.props.turnIndicatorText}
                        </h2>
                    </span>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <h4>
                # Red Chips : {this.props.numberRedChips}<br></br>
                # Blue Chips : {this.props.numberBlueChips}
            </h4>
            </div>
        )
        
    }
}

export default ScoreBoard;