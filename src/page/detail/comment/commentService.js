import $ from 'jquery';
import BASE_URL from "../../../database/Config";
const fetchComments = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${BASE_URL}/comment`,
            type: 'GET',
            success: function(response) {
                resolve(response.comments);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching comments:', error);
                reject(error);
            }
        });
    });
};

export { fetchComments };