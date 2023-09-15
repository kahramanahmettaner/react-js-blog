import './index.css';
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './routes/Home.js'
import NewPost from './routes/NewPost.js'
import PostPage from './routes/PostPage.js'
import About from './routes/About.js'
import Missing from './routes/Missing.js'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>

      <Switch>
        <Route exact path="/"> 
          <Home/>
        </Route> 
        <Route exact path="/post">
          <NewPost/>
        </Route>
        <Route path="/post/:id">
          <PostPage/>
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      
      <Footer/>
    </div>
  );
}

export default App;
