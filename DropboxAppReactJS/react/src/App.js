import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import NewerHomePage from "./components/NewerHomePage";


// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
                <div className="App">
                    {/*<HomePage/>*/}
                    {/*<NewHomePage/>*/}
                    <BrowserRouter>
                        <NewerHomePage/>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
