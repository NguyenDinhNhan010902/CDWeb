import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './CommentSection.css';

function CommentSection() {
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            setUsername(user.username);
        }
    }, []);

    const handleCommentSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Bạn cần đăng nhập để bình luận.');
            return; // Chặn người dùng khỏi việc gửi bình luận khi chưa đăng nhập
        }
        // const { username } = user;
        if (!comment.trim()) {
            alert('Vui lòng nhập nội dung bình luận.');
            return; // Chặn người dùng khỏi việc gửi bình luận khi nội dung trống
        }

        $.ajax({
            url: 'http://localhost:5000/comment/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, comment }),
            success: function(response) {
                if (response.success) {
                    alert('Đã gửi bình luận');
                    setComment('');
                } else {
                    alert('Gửi bình luận thất bại');
                }
            },
            error: function(xhr, status, error) {
                console.error('Lỗi khi gửi bình luận: ', error);
                alert('Lỗi khi gửi bình luận');
            }
        });
    };


    return (
        <div className="comment-section">
            <h4>Bình luận</h4>
            <textarea
                placeholder="Bạn nghĩ gì về tin này?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handleCommentSubmit}>Gửi bình luận</button>
            <div className="no-comments">
                <p>Hiện chưa có bình luận nào, hãy trở thành người đầu tiên bình luận cho bài viết này!</p>
            </div>
        </div>
    );
}

export default CommentSection;
