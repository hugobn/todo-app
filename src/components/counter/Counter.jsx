import { render } from "@testing-library/react"
import React, {Component} from "react"
import './Counter.css'

class  Counter extends Component{

    //Define the initial state in a constructor
    //state => counter 0

    constructor(){
        super()  // Have to be used always
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this)
    }

    // Using the outfunction (callbackfn) avoid to use the binding in constructor example: /this.increment = this.increment.bind(this)
    //render = () => {
    render () {
        return(
            <div className="counter">
                <button onClick={this.increment}>+1</button>
                <span className="count">{this.state.counter}</span>
            </div>
        )
    }

    // Becuase we changed the render function into a outfunct we need to change the increment func into a outfucnt as well
    // increment = () => {  // Update the state - counter++
    increment () {  // Update the state - counter++
        //console.log('increment')
        //this.state.counter++    // BAD Practice
        // Best practice is call SetState method
        this.setState({
            counter: this.state.counter + 1
        })
    }
}



export default Counter