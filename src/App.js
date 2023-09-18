import './index.css';
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './routes/Home.js'
import NewPost from './routes/NewPost.js'
import PostPage from './routes/PostPage.js'
import EditPost from './routes/EditPost.js'
import About from './routes/About.js'
import Missing from './routes/Missing.js'
import { Route, Switch } from 'react-router-dom'
import { DataProvider } from './context/DataContext';


function App() {

  return (
    <div className="App">
      <Header title="React JS Blog"/>
        
      <DataProvider>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/> 
          <Route exact path="/post" component={NewPost}/>
          <Route path="/edit/:id" component={EditPost}/>  
          <Route path="/post/:id" component={PostPage}/>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      </DataProvider>
      
      <Footer/>
    </div>
  );
}

export default App;
