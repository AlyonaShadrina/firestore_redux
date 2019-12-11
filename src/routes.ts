const ROUTES = {
    boards: '/boards',
    login: '/login',
    dynamic: {
        boardTasks: (boardId = ':boardId') => `/boards/${boardId}/tasks`,
    },
};

export default ROUTES;