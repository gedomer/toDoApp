import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component {
  
  constructor(props){
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  deleteTodo(){
    this.props.deleteTodo(this.props.id);
  }
  
  completeTodo(){
    this.props.completeTodo(this.props.id);
  }

  render() {
    var spanclasses = this.props.status === "C" ? 'span-completed' : 'span-all';
    return (
            <div>
              <span className={spanclasses}>{this.props.content}</span>
              <button onClick={this.completeTodo}>✔</button>
              <button onClick={this.deleteTodo}>✖</button>
            </div>
    );
  }
}

export default TodoItem;
