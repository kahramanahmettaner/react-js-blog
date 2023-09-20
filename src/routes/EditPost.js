import { useEffect, useContext, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
    const history = useHistory();
    const { id } = useParams();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
  
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        history.push(`/post/${id}`);
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
                    <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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