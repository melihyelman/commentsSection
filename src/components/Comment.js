import { useState } from 'react'
import AddComment from './AddComment'
import Delete from './Icon/Delete'
import Edit from './Icon/Edit'
import Reply from './Icon/Reply'


function Comment({ user, handleDelete, initComment, reply }) {
    const [showReply, setShowReply] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [comment, setComment] = useState(initComment)
    const [clickScore, setClickScore] = useState(0)
    const [editText, setEditText] = useState(comment.content)

    const handleScoreClick = (process) => {
        if (process && clickScore === 0) {
            setComment(prevComment => {
                return {
                    ...prevComment,
                    score: prevComment.score + 1
                }
            })
            setClickScore(1);
        } else if (!process && clickScore === 1) {
            setComment(prevComment => {
                return {
                    ...prevComment,
                    score: prevComment.score - 1
                }
            })
            setClickScore(0);
        }
    }

    const handleAddComment = (comment) => {
        setComment(prevComment => {
            return {
                ...prevComment,
                replies: [...prevComment.replies, comment]
            }
        })
        setShowReply(false)
    }


    return (
        <>
            <div className={`commentContainer `}>
                <div className="counter">
                    <button onClick={() => handleScoreClick("+")}>+</button>
                    <span>{comment.score}</span>
                    <button onClick={() => handleScoreClick()}>-</button>
                </div>
                <div className="main">
                    <div className="mainTop">
                        <div className="user">
                            <img src={comment.user.image.png} alt={comment.user.username} />
                            <p>{comment.user.username}</p>
                            {user.username === comment.user.username && <span style={{ "background": "hsl(238, 40%, 52%)", "color": "white", "padding": "3px 6px", "borderRadius": 3, "fontSize": 16, }}>you</span>}
                            <span>{comment.createdAt}</span>
                        </div>
                        <div className="events" >
                            {user.username !== comment.user.username ? !reply ? <span onClick={() => setShowReply(!showReply)}><Reply size={16} color="hsl(238, 40%, 52%)" />
                                Reply</span> : "" : <> <span onClick={() => handleDelete(comment.id)} style={{ "color": "hsl(358, 79%, 66%)" }}><Delete size={16} color={"hsl(358, 79%, 66%)"} />Delete</span> <span onClick={() => setShowEdit(!showEdit)}><Edit size={16} color="hsl(238, 40%, 52%)" />Edit</span></>}
                        </div>
                    </div>
                    <div className="mainBottom">
                        {!showEdit && <p>{reply && <span>@{reply} </span>}{comment.content}</p>}
                        {showEdit && <div className="edit">
                            <textarea className="text" placeholder='Edit your comment...'
                                value={editText}
                                onChange={e => setEditText(e.target.value)}></textarea>
                            <button onClick={() => setComment(prevState => {
                                setShowEdit(false)
                                return {
                                    ...prevState,
                                    content: editText
                                }
                            })}>Update</button></div>
                        }

                    </div>
                </div>
            </div>
            {showReply && <AddComment reply={true} handleAddComment={handleAddComment} replyingTo={initComment.user.username} user={user} text="REPLY" />}
            {
                comment.replies && <div className="replyCommentContainer">
                    <div className="list">
                        {comment.replies?.map((reply, id) => (
                            <Comment key={id} handleDelete={() => handleDelete(reply.id)} reply={reply.replyingTo} initComment={reply} user={user} />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default Comment
