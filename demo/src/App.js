import React from 'react';
import './App.css';
import FORM from './formpg';

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";


function App() {
  return (
    <Container className="p-3">
        <Jumbotron>
          <div className="App">
            <FORM />
          </div>
        </Jumbotron>
    </Container>  
  );
}

export default App;
