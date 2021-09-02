import './App.css';
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Tiles from './Components/Tiles'

function App() {
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboard-content">

      <Header/>
      <Tiles/>
      </div>
    </div>
  );
}

export default App;
