import $ from "jquery";
import BASE_URL from "../database/Config";

const HandleNewsClick = (newsId) => {
    const token = sessionStorage.getItem('token');

    if (token) {
        $.ajax({
            url: `${BASE_URL}/verify`,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function(response) {
                const userId = response.user.id;

                $.ajax({
                    url: `${BASE_URL}/addhistory`,
                    type: 'POST',
                    data: JSON.stringify({ newsId, userId }),
                    contentType: 'application/json',
                    success: function(response) {
                        console.log('Tin tức đã được thêm vào lịch sử:', response);
                    },
                    error: function(error) {
                        console.error('Lỗi khi thêm tin tức vào lịch sử: ', error);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error verifying token:', error);
            }
        });
    } else {
        console.error('Không tìm thấy token trong sessionStorage');
    }
};

export default HandleNewsClick;
