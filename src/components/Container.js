import { useEffect, useState } from 'react';
import initData from "../data.json";
import AddComment from './AddComment';
import Comment from './Comment';


function Container() {
    const [data, setData] = useState(initData.comments)
    const handleDelete = (id) => {
        setData(prevData => prevData.map(comment => {
            if (comment.replies.length > 0) {
                const prev = { ...comment, replies: [...comment.replies.filter(reply => reply.id !== id)] }
                return prev
            } else {
                return comment
            }

        }).filter(item => item.id !== id))
    }




    return (<div className="container">
        {data.map((comment, id) =>
            <Comment setData={setData} handleDelete={handleDelete} key={id} initComment={comment} user={initData.currentUser} />
        )}

        <AddComment user={initData.currentUser} setData={setData} text="SEND" />
    </div>);
}

export default Container;
