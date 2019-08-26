import React from 'react';
import './Game.css';
import Board from '../Board/Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 0,
    }
  }
  render(){
    return (
      <div class="container">
          <div class="row Header">
              <div class="col-sm-12">Header</div>
          </div>
          <div class="row">
              <div class="col-sm-8">
                <Board/>
              </div>
              <div class="col-sm-4">
                <center>Players</center>
              </div>
          </div>
      </div>
    );
  };

}

export default Game;
