import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//const value1 = Math.floor(Math.random() * 100);
//const value2 = Math.floor(Math.random() * 100);
//const value3 = Math.floor(Math.random() * 100);
//const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;
//const numQuestions = 0;
//const numCorrect = 0;

function generateRandomNumber() {
	return Math.floor(Math.random() * 100)
}

function loopToMutateBy(repeatNumber, makeMutation, inTarget) {
	if (repeatNumber > 0) {
		const index = repeatNumber
		makeMutation(inTarget, index)
		loopToMutateBy(repeatNumber - 1, makeMutation, inTarget)
	}
}

function makeAscendingRandomValueIn(target, index) {
	return target[`value${index}`] = generateRandomNumber();
}

function generateRandomNumbersOf(maxAmount, numbers={}) {
	loopToMutateBy(maxAmount, makeAscendingRandomValueIn, numbers)
	return numbers
}

function toGetEachValueAndSumOf(previousValue, currentValue) {
	return previousValue + currentValue
}

function calculateInValuesTheSumOf(randomNumbers) {
	const randomNamberValues = Object.values(randomNumbers)

    return randomNamberValues.reduce(toGetEachValueAndSumOf)
}

function getAnswers(randomNumbers) {
	const sum = calculateInValuesTheSumOf(randomNumbers)

    return {
    	correctAnswer: sum,
      	proposedAnswer: Math.floor(Math.random() * 3) + sum
    }
}

function OR(...conditions) {
	return conditions.some(condition => condition === true)
}

function getEqualityOf(firstValue) {
	return { and: (secondValue) => {
			return firstValue === secondValue
		}
	}
}

function getEachComparisonBetween(first, second) {
	return (condition) => ({
		'true': getEqualityOf(first).and(second),
		'false': !getEqualityOf(first).and(second)
	}[condition])
}

class App extends Component {

  state = {
  	randomNumbers: generateRandomNumbersOf(3),
    results: {},
    numCorrect: 0,
    numQuestions: 0
  }

  componentDidMount() {
  	this.setState({results: getAnswers(this.state.randomNumbers)})
  }

  checkUserAnswer = (value) => () => {
    const { results: { proposedAnswer, correctAnswer } } = this.state
	const userAnswerIs = getEqualityOf(value).and
	const proposedAnswerIs = getEachComparisonBetween(proposedAnswer, correctAnswer)

  	if (OR((userAnswerIs('true') && proposedAnswerIs('true')),
		   (userAnswerIs('false') && proposedAnswerIs('false')))) {

      	this.incrementUserAnswersCountIn('numCorrect')
    }

    this.incrementUserAnswersCountIn('numQuestions')
	this.generateNextRound()
  }

  incrementUserAnswersCountIn = (target) => {
  	this.setState((previousState) => ({[target]: previousState[`${target}`] + 1}))
  }

  generateNextRound = () => {
    this.setState((previousState) => ({
      randomNumbers: generateRandomNumbersOf(3),
      results: getAnswers(this.state.randomNumbers)
    }))
  }

  render() {

    const { randomNumbers: { value1, value2, value3 },
			results: { proposedAnswer, correctAnswer },
			numCorrect,
			numQuestions } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
            <p className="text">{`Correct = ${correctAnswer}`}</p>
          </div>
          <button onClick={this.checkUserAnswer('true')}>True</button>
          <button onClick={this.checkUserAnswer('false')}>False</button>
          <p className="text">
            Your Score: {numCorrect}/{numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
