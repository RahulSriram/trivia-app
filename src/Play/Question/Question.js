import React, { Component } from 'react';
import './Question.css';

export class Question extends Component {
  constructor(props) {
    super(props);
    
    if (!this.state) {
      this.state = {
        isAnswered: false,
        correctAnswerIndex: 0,
        numberOfAnswers: 0,
        answers: [],
        questionId: 0
      };
    }
  }

  setupAnswers() {
    let numberOfAnswers = this.props.question.incorrect_answers.length + 1;
    let correctAnswerIndex = Math.floor(Math.random() * numberOfAnswers);
    let answers = [];

    for (let i = 0, j = 0; i < numberOfAnswers; i++) {
      if (i === correctAnswerIndex) {
        answers.push({
          index: i,
          answer: this.props.question.correct_answer,
          checked: false
        });
      } else {
        answers.push({
          index: i,
          answer: this.props.question.incorrect_answers[j++],
          checked: false
        });
      }
    }

    this.setState({
      answers: answers,
      isAnswered: false,
      correctAnswerIndex: correctAnswerIndex,
      numberOfAnswers: numberOfAnswers,
      questionId: this.props.question.id
    });
  }

  componentDidMount() {
    this.setupAnswers();
  }

  componentDidUpdate() {
    if (this.state.questionId !== this.props.question.id) {
      this.setupAnswers();
    }
  }

  onAnswerChosen = (index) => {
    let isCorrectAnswer = (index === this.state.correctAnswerIndex);
    let answers = [...this.state.answers];
    answers[index].checked = true;

    this.setState({
      answers: answers,
      isAnswered: true
    });
    this.props.onQuestionAnswered(isCorrectAnswer);
  }

  render() {
    let answerChoiceWrapperClasses = ["answer-choice-wrapper"];
    if (this.state.isAnswered) {
      answerChoiceWrapperClasses.push("disabled-answer-choice-wrapper");
    }
    
    let answerOptions = this.state.answers.map(answer =>
      <label className={answerChoiceWrapperClasses.join(' ')} key={answer.index} disabled={this.state.isAnswered}>
        <span className="answer-choice-text">
          {htmlDecode(answer.answer)}
        </span>
        <input type='radio' name='answers' value={answer.index} disabled={this.state.isAnswered} checked={answer.checked} onChange={e => this.onAnswerChosen(answer.index)} />
        <span className="answer-choice-radio" />
      </label>
    );
    return (
      <div className="question-container">
        <div className="question-component question-header">
          {htmlDecode(this.props.question.question)}
        </div>
        <div>
          {answerOptions}
        </div>
      </div>
    )
  }
}

function htmlDecode(input)
{
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}