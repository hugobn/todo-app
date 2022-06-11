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
        //const style = {fontSize: "50px"} 
        return(
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                <span className="count"
                // The best practice is to have all the css style into the independent css file
                //style={{fontSize: "50px"}} // We can use css here directly wit this structure
                //style={style}  // we can also use a variable(var, let, const, etc.) to apply the css style
                >{this.state.counter}</span>
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
            counter: this.state.counter + this.props.by
        })
    }
}



export default Counter