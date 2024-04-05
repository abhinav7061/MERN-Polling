import React, { useState, useEffect, useContext } from 'react';
import { toast } from "sonner";
import { UserContext } from '../../UserContext';
import UserDescription from '../UserDescription';
import { Spinner } from '../Loader/SpinLoader';
import styles from '../../styles';
import { login } from '../../assets';

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;
const limit = 3;

const Comments = ({ pollId }) => {

  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [checkComments, setCheckComments] = useState(true)
  const [inputComment, setInputComment] = useState('');

  // Access user information from the context
  const { userInfo } = useContext(UserContext);

  // Function to handle posting a comment
  const handleCommentPost = async (e) => {
    e.preventDefault();
    if (inputComment.length < 3) return toast.warning("The comment should contain 3 characters")
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/comment/postComment/${pollId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: inputComment }),
        credentials: 'include',
      })
      const data = await res.json();
      if (res.ok) {
        setComments([]);
        if (page == 1) {
          getComments();
        } else {
          setPage(1);
        }
        setInputComment('');
        toast(data.message, { type: "info" });
      } else {
        toast(data.message, { type: 'warning' })
      }
    } catch (error) {
      console.log('Error while posting your comment', error);
    } finally {
      setLoading(false);
    }
  }

  const getComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/comment/getComments/${pollId}?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setComments(prevItems => [...new Set([...prevItems, ...data.comments])]);
        if (data.comments.length < limit) setHasMore(false);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching comment count:', error.message);
    } finally {
      setLoading(false);
      setCheckComments(false);
    }
  };

  const editComment = (commentText) => {
    setInputComment(commentText);
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
      commentInput.focus();
    }
  }

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
      })
      const data = await res.json();
      if (res.ok) {
        setComments([]);
        if (page == 1) {
          getComments();
        } else {
          setPage(1);
        }
        setInputComment('');
        toast(data.message, { type: "info" });
      } else {
        toast(data.message, { type: 'warning' })
      }
    } catch (error) {
      console.log('Error while posting your comment', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasMore) {
      getComments();
    }
  }, [page, hasMore]);

  return (
    <>
      {/* form for taking comments inputs */}
      <form className={`flex ${styles.heading5}`} onSubmit={handleCommentPost}>
        <input
          id="commentInput"
          type="text"
          name="comment"
          value={inputComment}
          onChange={(e) => { setInputComment(e.target.value) }}
          className={`w-full border-2 border-slate-400 px-3 sm:px-5 py-1 outline-none focus:border-slate-600 rounded-3xl`}
          placeholder="Enter your comment here"
          autoComplete="off"
          required />
        <input
          type="submit"
          value="Post"
          className="md:ml-6 sm:ml-4 ml-2 px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors cursor-pointer" />
      </form>
      { // showing all the comment for this poll if present
        checkComments ? <div className=' w-full flex justify-center items-center'><Spinner /></div> : (comments.length > 0) ? (
          <div className="my-3 border border-slate-800 rounded-lg py-3 px-5">
            <div className={`flex justify-between mb-4 ${styles.heading5}`}><p>Comments</p> <p className="cursor-pointer">Most Relevent</p></div>
            {comments.map((comment, index) => (
              <div className={`rounded-md bg-slate-100 p-3 ${comments.length - 1 === index ? '' : "mb-5"}`} key={comment._id}>
                <div className="flex items-center">
                  <div className="flex-1">
                    <UserDescription userId={comment.commentedBy} />
                  </div>
                  {/* Display edit and delete buttons for the poll owner */}
                  {(userInfo && userInfo._id === comment.commentedBy) && (<>
                    <button
                      className=" hover:text-blue-600"
                      title="Edit Comment"
                      onClick={() => editComment(comment.comment)}>
                      <ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button
                      className="md:ml-3 lg:ml-5 ml-1 hover:text-red-500"
                      title="Delete Comment"
                      onClick={() => deleteComment(comment._id)}>
                      <ion-icon name="trash-outline">
                      </ion-icon>
                    </button>
                  </>)}
                </div>

                <h1 className={`${styles.heading5} mt-1 px-2`}>{comment.comment}</h1>
              </div>
            ))}
            <div className='flex justify-center items-center'>
              {loading && <Spinner />}
            </div>
            <div className='mt-8 flex justify-center items-center font-bold'>
              {hasMore ? <div className='cursor-pointer px-3 py-2 rounded-lg duration-500 hover:bg-sky-300 transition-colors' onClick={() => setPage(prevPage => prevPage + 1)}>loadMore</div> : <div className=''>End Comments</div>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center my-3 py-3 px-5">
            <img src={login} alt="comment" className="lg:h-44 md:h-40 sm:h-36 h-28" />
            <h1 className={`font-semibold ${styles.heading5}`}>Be the first to comment</h1>
          </div>)
      }
    </>
  )
}

export default Comments