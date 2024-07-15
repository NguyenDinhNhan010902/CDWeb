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
    const [showAllComments, setShowAllComments] = useState(false);

    useEffect(() => {
        fetchUserInfoFromToken();
        fetchComments();
        // fetchData();
    }, [postId]); // Update when postId changes

    // const fetchData = () => {
    //     fetchUserInfoFromToken();
    //     fetchComments();
    // };
    const fetchUserInfoFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            setUsername('');
            setUserId('');
            return;
        }

        $.ajax({
            url: `${BASE_URL}/verify`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function(response) {
                setUsername(response.user.username);
                setUserId(response.user.id);
            },
            error: function(xhr, status, error) {
                console.error('Error verifying token:', error);
                setUsername('');
                setUserId('');
            }
        });
    };

    const fetchComments = () => {
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
    };

    const handleCommentSubmit = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Bạn cần đăng nhập để bình luận.');
            return;
        }
        if (!comment.trim()) {
            alert('Vui lòng nhập nội dung bình luận.');
            return;
        }

        // Kiểm tra token hợp lệ trước khi gửi bình luận
        $.ajax({
            url: `${BASE_URL}/verify`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function(response) {
                const currentTime = moment().tz('Asia/Ho_Chi_Minh').format();
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
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: JSON.stringify(commentData),
                    success: function(response) {
                        if (response.success) {
                            setShowAlert(true);
                            setComment('');
                            setTimeout(() => {
                                setShowAlert(false);
                                fetchComments();
                            }, 1000);
                        } else {
                            alert('Gửi bình luận thất bại');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Error submitting comment:', error);
                        alert('Lỗi khi gửi bình luận');
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error verifying token:', error);
                alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                // Xử lý khi token hết hạn, ví dụ chuyển hướng đến trang đăng nhập
            }
        });
    };

    const handleShowMoreToggle = () => {
        setShowAllComments(!showAllComments);
    };

    const commentsToDisplay = showAllComments ? comments : comments.slice(0, 3);

    return (
        <div className="comment-section">
            <h4>Bình luận ({comments.length})</h4>
            <textarea
                placeholder="Bạn nghĩ gì về tin này?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handleCommentSubmit}>Gửi bình luận</button>
            {showAlert && <div className="thongbao">Đã gửi bình luận</div>}
            <div className="username-display">
                {commentsToDisplay.map((comment) => (
                    <div key={comment.id} className="recomment">
                        <div className="comment">
                            <p className="comment-user">@{comment.username}:</p>
                            <p className="comment-time">{moment(comment.timed).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </div>
                        <p className="comment-com">{comment.comment}</p>
                    </div>
                ))}
                {!comments.length && (
                    <div className="no-comments">
                        <p>Hiện chưa có bình luận nào, hãy trở thành người đầu tiên bình luận cho bài viết này!</p>
                    </div>
                )}
            </div>
            {comments.length > 3 && (
                <button className="show-more-button" onClick={handleShowMoreToggle}>
                    {showAllComments ? 'Ẩn bớt' : 'Xem thêm'}
                </button>
            )}
        </div>
    );
}

export default CommentSection;
