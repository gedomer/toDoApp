import React, { Component } from 'react';

class Form extends Component{
	constructor(props){
		super(props);
		this.addTodo=this.addTodo.bind(this);
		this.keyPress = this.keyPress.bind(this);
	}

	addTodo(){
		this.props.addTodo(this.refs.input.value)
		this.refs.input.value='';
	}

	keyPress(e){
		if(e.key==='Enter'){
			e.preventDefault();
			this.addTodo();
		}
	}

	render() {
	  	return(
	  		<div>
            <input ref="input" placeholder="..." onKeyPress={this.keyPress}/>
            <button onClick={this.addTodo}>Add</button>
            </div>
	  	);
	  }
}

export default Form;