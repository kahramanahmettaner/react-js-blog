import './index.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './routes/Home.js';
import NewPost from './routes/NewPost.js';
import PostPage from './routes/PostPage.js';

import EditPost from './routes/EditPost.js';
import About from './routes/About.js';
import Missing from './routes/Missing.js';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { Route, Switch } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from 'easy-peasy';
function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  const searchResults = useStoreState((state) => state.searchResults);
  const posts = useStoreState((state) => state.posts);

  useEffect(() => {
    setPosts(data);
  }, [data])

  return (
    <div className="App">
      <Header title="React JS Blog"/>
      <Nav/>
      <Switch>
        <Route exact path="/">
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
          />
        </Route> 
        <Route exact path="/post" component={NewPost}/>
        <Route path="/edit/:id" component={EditPost}/>  
        <Route path="/post/:id" component={PostPage}/>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
