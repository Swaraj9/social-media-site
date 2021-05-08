import './Styles/App.css';
import Navbar from './Components/Navbar';
import { AuthContextProvider } from './authContext';

function App() {

  return (
      <AuthContextProvider>
        <div className="App">
          <Navbar/>
        </div>
      </AuthContextProvider> 
  );
}

export default App;
