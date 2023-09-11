export const checkDeadlines = (globalTodos) => {
    const currentTime = new Date();
    globalTodos.forEach(todo => {
        const timeDifference = new Date(todo.time) - currentTime;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        if (minutesDifference >= 0 && minutesDifference <= 30) {
            const notificationOptions = {
                body: `Task "${todo.name}" deadline is ${minutesDifference} min`,
            };
            console.log('go')    
            const notification = new Notification("Task deadline", notificationOptions);
                    
        }
    });
}

