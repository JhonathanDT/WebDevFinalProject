import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login.jsx'
import Dashboard from './dashboard.jsx';

//this gets us the uri param that is labeled code aka our access token
const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dashboard code = {code} /> : <Login/>
  // return <Login/>
}

export default App
