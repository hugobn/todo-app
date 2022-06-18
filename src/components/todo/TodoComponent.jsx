import React,{Component} from "react";

class TodoComponent extends Component {
    render() { 
        return (
            <div>Todo Component for id: {this.props.params.id}</div>
        )
    }
}
 
export default TodoComponent;