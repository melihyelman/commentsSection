import React from 'react'
import { useState } from 'react'

function AddComment({ handleAddComment, replyingTo, user, setData, text, reply }) {
    const [comment, setComment] = useState('')
    const handleClick = () => {
        if (reply) {
            handleAddComment({
                id: 10,
                user: user,
                content: comment,
                createdAt: "1 min ago",
                score: 0,
                replies: [],
                replyingTo: replyingTo
            })
        } else if (text === "SEND") {
            console.log("girdi");
            setData(prevData => {
                return [
                    ...prevData,
                    {
                        id: prevData.length + 1,
                        user: user,
                        content: comment,
                        score: 0,
                        createdAt: "1 min ago",
                        replies: [],
                    }
                ]
            });
        }
    }
    return (
        <div className="addComment">
            <div className="user">
                <img src={user.image.png} alt={user.username} />
            </div>
            <textarea className="text" placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)}></textarea>
            <button className="sendBtn" onClick={handleClick}>{text}</button>
        </div>
    )
}

export default AddComment
