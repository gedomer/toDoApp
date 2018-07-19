import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import TodoList from './TodoList';

const API_URL = "http://127.0.0.1:8000/api/todolist/"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      visibility:'all',
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);

    this.showCompleted = this.showCompleted.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    axios.get(API_URL)
      .then(res => {
        const todos = res.data;
        this.setState({ todos });
      })
  }

  getTodos(){
    return this.state.todos;
  }

  completeTodo(id){
    var status;
    const filteredTodos = this.state.todos.filter(todos => {return todos.id === id });
    if (filteredTodos[0].status ==="A")
      status = "C";
    else 
      status= "A";
    filteredTodos[0].status = status;
    axios.put(API_URL+id, filteredTodos[0]).then(response => {console.log(response);})   
    this.setState({todos:this.getTodos()});   
  }
  
  deleteTodo(id){
    const todos_ = this.getTodos();
    const filteredTodos = todos_.filter(mtodos => {return mtodos.id !== id });
    
    axios.delete(API_URL+id)
        .then(response => {
          if (response.status === 200 || response.status === 204)
            this.setState({todos: filteredTodos});
          })
  }

  addTodo(content){
    const todos = this.getTodos();
    var id,status;
    axios.post(API_URL, {content: content})
          .then(response => {
                            if(response.status === 200 ||response.status === 201){
                              id=response.data.id;
                              status= response.data.status;
                              todos.push({id,content,status});
                              this.setState({todos});}
                            })
          .catch(e=> {console.log(e);})
  }

  showCompleted(){
    this.setState({visibility: 'completed'});
  }

  showAll(){
    this.setState({visibility: 'all'});
  }

  getCompleted(){
    return this.state.todos.filter(todos => {return todos.status !== "A" });
  }

  render() {
    var todos;
    switch (this.state.visibility) {
      case 'all':
        todos = this.state.todos;
        break;
      case 'completed':
        todos = this.getCompleted();
        break;
      default:
        todos = this.state.todos;
    }

    return (
        <div>
          <Header showCompleted={this.showCompleted} showAll={this.showAll}/>
          <Form addTodo={this.addTodo}/>
          <TodoList key={todos.id} items={todos} completeTodo={this.completeTodo} deleteTodo={this.deleteTodo}/>
        </div>
    );
  }
}

export default App;
