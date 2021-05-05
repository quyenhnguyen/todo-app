import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import CustomForm from './Components/CustomForm';

class  App  extends Component{
  render(){
    return (
      <CustomForm name="Login"></CustomForm>
        );
  }
}

export default App;
