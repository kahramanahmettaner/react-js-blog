import { useEffect, useContext, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import api from '../api/posts'
import DataContext from '../context/DataContext';

const EditPost = () => {

    const { posts, setPosts } = useContext(DataContext);

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const history = useHistory();

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            // could use "patch" to update specific fields but here "put" to update the entire post
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map( post => post.id === id ? { ...response.data } : post ));
            setEditTitle('');
            setEditBody('');
            history.push('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        } 
    }

    useEffect( () => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [])
    // }, [post, setEditTitle, setEditBody])
    // if you use any functions or variables in a useeffect, you need to include them in the dependency array . That's just the rules otherwise you will get warnings
    // but now you do not get any errors?

    return (
        <main className="NewPost">
            {post &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={ (e) => setEditTitle(e.target.value) }
                    />

                    <label htmlFor="postBody">Post:</label>
                    <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={ (e) => setEditBody(e.target.value) }
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
                </>
            }
            {!post &&
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>
          }
        </main>
    )
}

export default EditPost;