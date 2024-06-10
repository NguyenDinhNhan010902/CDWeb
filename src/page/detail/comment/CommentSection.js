import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './CommentSection.css';
import BASE_URL from "../../../database/Config";
import moment from 'moment-timezone';

function CommentSection({ postId }) {
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [comments, setComments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username && user.id) {
            setUsername(user.username);
            setUserId(user.id);
        }
        $.ajax({
            url: `${BASE_URL}/comment/getcomment?postId=${postId}`,
            type: 'GET',
            success: function(response) {
                setComments(response);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching comments:', error);
            }
        });
    }, [postId]);

    const handleCommentSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Bạn cần đăng nhập để bình luận.');
            return;
        }
        if (!comment.trim()) {
            alert('Vui lòng nhập nội dung bình luận.');
            return;
        }

        const currentTime = moment().tz('Asia/Ho_Chi_Minh').format(); // Lấy thời gian hiện tại theo múi giờ Việt Nam
        const commentData = {
            postId,
            username,
            userId,
            comment,
            timed: currentTime
        };

        $.ajax({
            url: `${BASE_URL}/comment/add`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(commentData),
            success: function(response) {
                if (response.success) {
                    setShowAlert("true");
                    setComment('');
                    // refreshComments();
                    window.location.reload();
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000); // Ẩn thông báo sau 3 giây

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

    // const refreshComments = () => {
    //     $.ajax({
    //         url: `${BASE_URL}/comment/getcomment?postId=${postId}`,
    //         type: 'GET',
    //         success: function(response) {
    //             setComments(response);
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Error refreshing comments:', error);
    //         }
    //     });
    // };

    return (
        <div className="comment-section">
            <h4>Bình luận ({comments.length })</h4>
            <textarea
                placeholder="Bạn nghĩ gì về tin này?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handleCommentSubmit}>Gửi bình luận</button>
            {showAlert && <div className="thongbao">Đã gửi bình luận</div>}
            <div className="username-display">
                {comments.map((comment) => (
                    <div key={comment.id} className="recomment">
                        <div className="comment">
                            <p className="comment-user" >@{comment.username}  :</p>
                            <p className="comment-time" >{moment(comment.timed).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </div>
                        <p className="comment-com">{comment.comment}</p>
                    </div>
                ))}
                {!comments.length &&  <div className="no-comments">
                    <p>Hiện chưa có bình luận nào, hãy trở thành người đầu tiên bình luận cho bài viết này!</p>
                </div>}
            </div>
        </div>
    );
}

export default CommentSection;
