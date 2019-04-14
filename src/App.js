import React, { Component } from 'react';
import { Home } from './Home/Home.js';
import { Play } from './Play/Play.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      score: null
    }
  }

  onPlayButtonClick = (settings) => {
    this.setState({
      isPlaying: true,
      settings: settings
    });
  }

  onGameComplete = (score) => {
    this.setState({
      isPlaying: false,
      score: score
    });
  }
  
  render() {
    if (!this.state.isPlaying) {
      return (
        <div>
          <div className="app-header">
            <a href="/">
              Trivia App
            </a>
          </div>
          <Home previousScore={this.state.score}
            onPlayButtonClick={this.onPlayButtonClick} />
        </div>
      )
    } else if (this.state.isPlaying && this.state.settings) {
      return (
        <div>
          <div className="app-header">
            <a href="/">
              Trivia App
            </a>
          </div>
          <Play settings={this.state.settings}
            onGameComplete={this.onGameComplete} />
        </div>
      )
    }
  }
}

export default App;
