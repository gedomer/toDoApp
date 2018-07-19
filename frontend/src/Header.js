import React, { Component } from 'react';

class Header extends Component {
  constructor(props){
    super(props);
      this.showAll = this.showAll.bind(this);
      this.showCompleted = this.showCompleted.bind(this);
  }
    showCompleted(){
      this.props.showCompleted();
    }

    showAll(){
      this.props.showAll();
    }

  render() {
    return (
        <div>
          <h2>TodoApp</h2>
          <button onClick={this.showAll}>All</button>
          <button onClick={this.showCompleted}>Completed</button> 
        </div>
    );
  }
}

export default Header;
