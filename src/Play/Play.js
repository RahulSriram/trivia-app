import React, { Component } from 'react';
import { Question } from './Question/Question.js';

export class Play extends Component {
  constructor(props) {
    super(props);

    if (!this.state) {
      this.state = {
        isLoading: true,
        isCurrentQuestionAnswered: false,
        currentQuestionIndex: 0,
        questions: [],
        score: 0
      };
    }
  }

  componentDidMount() {
    let settings = this.props.settings;
    fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoading: false,
          questions: result.results.map((result, index) => ({
            id: index,
            ...result
          }))
        });
      }, (error) => {
        this.setState({
          isLoading: false,
          error
        });
      })
  }

  onQuestionAnswered = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      this.setState((state) => ({
        score: state.score + 1,
        isCurrentQuestionAnswered: true
      }));
    } else {
      this.setState({
        isCurrentQuestionAnswered: true
      });
    }
  }

  onNextButtonClick = () => {
    let isLastQuestion = (this.state.currentQuestionIndex === (this.state.questions.length - 1));
    if (isLastQuestion) {
      this.props.onGameComplete(this.state.score);
    } else {
      this.setState((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        isCurrentQuestionAnswered: false
      }));
    }
  }

  render() {
    const { currentQuestionIndex, questions, isCurrentQuestionAnswered } = this.state;
    let isLastQuestion = (currentQuestionIndex === (questions.length - 1));
    
    if (questions.length) {
      return (
        <div>
          <div>
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>
              Score: {this.state.score}
            </span>
          </div>
          <div>
            <Question question={questions[currentQuestionIndex]}
              onQuestionAnswered={this.onQuestionAnswered} />
          </div>
          <div>
            <button disabled={!isCurrentQuestionAnswered} onClick={this.onNextButtonClick}>
              {(isLastQuestion) ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}