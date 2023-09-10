

export const formatTime = (time) => {
    const date = new Date(time);
    // Получаем компоненты даты и времени
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // Форматируем дату и время в желаемый формат
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate
}