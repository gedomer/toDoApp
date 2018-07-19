import React, { Component } from 'react';
import TodoItem from './TodoItem';
class TodoList extends Component{

	constructor(props){
		super(props);
    	this.deleteTodo = this.deleteTodo.bind(this);
    	this.completeTodo = this.completeTodo.bind(this);
	}

  	deleteTodo(x){
    	this.props.deleteTodo(x);
  	}

  	completeTodo(x){
  		this.props.completeTodo(x);
  	}

	render() {
	  	return(
	  		<ul>
	  			{this.props.items.map(i=><TodoItem key={i.id} id={i.id} status={i.status} content={i.content} 
	  												completeTodo={this.completeTodo} 
	  												deleteTodo={this.deleteTodo} />
	  								)}
	  		</ul>
	  	);
	  }
}

export default TodoList;