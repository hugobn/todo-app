import { render } from "@testing-library/react"
import PropTypes from 'prop-types'
import React, {Component} from "react"
import './Counter.css'

class Counter extends Component{
    //Define the initial state in a constructor, state => counter 0
    constructor(){
        super() 
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render(){
        return(
          <div className="counter">
            <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div>
                <button className="reset" onClick={this.reset}>Reset</button>
            </div>
          </div>
        )
      }

    reset(){
        this.setState({counter: 0})
      }

    increment (by) {
        //console.log(`increment from child - ${by}`)
        this.setState(
            // Best practice is to make an callbackfn for state
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        )
    }

    decrement (by) {
        this.setState(
            (prevState) => {
                return {counter: prevState.counter - by}
            }
        )
    }

}

class  CounterButton extends Component{
    //Define the initial state in a constructor, state => counter 0
    constructor(){
        super()  // Have to be used always
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

    }

    // Using the outfunction (callbackfn) avoid to use the binding in constructor example: /this.increment = this.increment.bind(this), render = () => {
    render () {
        //const style = {fontSize: "50px"} 
        return(
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
                {/*<span className="count"
                // The best practice is to have all the css style into the independent css file, style={{fontSize: "50px"}} // We can use css here directly wit this structure
                //style={style}  // we can also use a variable(var, let, const, etc.) to apply the css style
                >{this.state.counter}</span>*/}
            </div>
        )
    }

    // Becuase we changed the render function into a outfunct we need to change the increment func into a outfucnt as well, increment = () => {  // Update the state - counter++
    increment () {  // Update the state - counter++
        //console.log('increment')
        //this.state.counter++    // BAD Practice
        // Best practice is call SetState method
        this.setState({
            counter: this.state.counter + this.props.by
        })
        this.props.incrementMethod(this.props.by)
    }

    decrement () {
        this.setState({
            counter: this.state.counter - this.props.by
        })
        this.props.decrementMethod(this.props.by)
    }

}

// Define a default value for props
CounterButton.defaultProps = {
    by: 1,   // This by default prop value will be taken by the counter without specify the props into it
}

// Definning this object we show and error message when we pass a String in by props instead of number
CounterButton.propTypes = {
    by: PropTypes.number
}


export default Counter