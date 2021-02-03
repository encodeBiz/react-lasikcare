import logo from './logo.svg';
import './styles/App.css';
import { getClinicas, getHuecos } from "./services/appointments.service";
function App() {
  getClinicas()
  .then(res => {
    console.log('getClinicas', res)
  })
  .then(() => {
    const params = {
			keycli: 'GR021',
			date: new Date().toLocaleDateString(),
			type: 'BI'
    };
    
    getHuecos(params)
    .then(res => {
      console.log('getHuecos', res)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        Hola mundo
      </header>
    </div>
  );
}

export default App;
