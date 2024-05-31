// CommentSection.js
import React from 'react';
import './CommentSection.css';

function CommentSection() {
    return (
        <div className="comment-section">
            <h4>Bình luận (0)</h4>
            <textarea placeholder="Bạn nghĩ gì về tin này?"></textarea>
            <button className="submit-button">Gửi bình luận</button>
            <div className="no-comments">
                <p>Hiện chưa có bình luận nào, hãy trở thành người đầu tiên bình luận cho bài viết này!</p>
            </div>
        </div>
    );
}

export default CommentSection;
