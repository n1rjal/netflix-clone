import './App.css';
import NavBar from "./components/navbar/navbar";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import DetailTv from "./components/detailtv/detailtv";
import Footer from "./components/footer/footer";
import Search from "./components/search/search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            
            <Route path="/movie/:id" component={Detail}/>
            
            <Route path="/tv/:id" component={DetailTv} />
            <Route exact path="/search">
                <Search />
            </Route>

            <div className="lost404">
              <h1>404! Not found</h1>
              <img src="https://i.pinimg.com/originals/29/73/a3/2973a3e32fc5a487f171a877146801cd.jpg"  alt="are you lost" />
            </div>

          </Switch>
        </Router>
        <Footer />
      </header>
    </div>
  );
}

export default App;
