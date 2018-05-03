import React, { Component } from 'react';
import ShowList from './components/showList';

class App extends Component {
    render() {
        return (
            <div className="app" style={{backgroundColor: "lightblue"}}>
                <ShowList />
            </div>
        );
    }
}

export default App;
