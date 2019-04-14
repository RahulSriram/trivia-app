import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      settings: {
        amount: '10',
        category: '9',
        difficulty: 'easy',
        type: 'multiple'
      }
    };
  }

  handlePlayButtonClick = () => {
    this.setState({
      isLoading: true
    });
    this.props.onPlayButtonClick(this.state.settings);
  }

  onInputChanged = (event) => {
    let name = event.target.name;
    var value = event.target.value;
    this.setState((state) => ({
      settings: {
        ...state.settings,
        [name]: value
      }
    }));
  }

  render() {
    console.log(this.state.settings);
    
    return (
      <div className="home">
        <div>
          <h2 className="form-signin-heading">Choose your game</h2>
        </div>
        <div>
          <label htmlFor="amount">Number of Questions:</label>
          <input type="number" name="amount" id="trivia_amount" className="form-control" min="1" max="50" value={this.state.settings.amount} onChange={this.onInputChanged} />
        </div>
        <div>
          <label htmlFor="category">Select Category: </label>
          <select name="category" className="form-control" value={this.state.settings.category} onChange={this.onInputChanged}>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select name="difficulty" className="form-control" value={this.state.settings.difficulty} onChange={this.onInputChanged}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="type">Select Type: </label>
          <select name="type" className="form-control" value={this.state.settings.type} onChange={this.onInputChanged}>
          <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <div>
          <button className="btn btn-outline-success" onClick={this.handlePlayButtonClick} disabled={this.isLoading}>
            {(this.props.previousScore === null) ? 'Play!' : 'Play again!'}
          </button>
        </div>
      </div>
    )
  }
}