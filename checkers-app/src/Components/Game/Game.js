import React from 'react';
import './Game.css';
import Board from '../Board/Board';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Header from '../Header/Header'
import Overlay from '../Overlay/Overlay'

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 0,
      turnIndicatorText: "Blue Goes First!",
      warningText: "",
      numberBlueChips: 8,
      numberRedChips: 8,
      warningTextTimeout: 0,
    }
  }
  componentDidMount(){
    this.interval = setInterval(()=>this.setState({time: Date.now()}), 10);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
      return (
      <div>
        <Overlay gameState={this.state} />
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <Header gameState={this.state} />
            </div>
            </div>
            <div class="row">
              <div class="col-sm-8">
                <Board gameCommunication={this.state}/>
              </div>
              <div class="col-sm-4">
                <ScoreBoard turnIndicatorText={this.state.turnIndicatorText} 
                  transition={this.state.transition}
                  numberRedChips={this.state.numberRedChips}
                  numberBlueChips={this.state.numberBlueChips}/>
            </div>
          </div>
        </div>
      </div>
    );
  };

}

export default Game;
