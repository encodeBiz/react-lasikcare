import React from "react"
import { connect } from "react-redux";
import './styles/App.scss';

function App({store, errors}) {
  console.log(store, errors)
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

const mapStateToProps = ( state )=> ({
  errors: state.errors
})

export default connect(mapStateToProps)(App);
