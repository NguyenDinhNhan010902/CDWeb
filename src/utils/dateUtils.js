
export const getCurrentFormattedDate = () => {
    const date = new Date();
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    // const day = String(date.getDate()).padStart(2, '0');
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    // const year = date.getFullYear();
    return `${dayOfWeek}`;
};
