const ROUTES = {
    boards: '/boards',
    boardsShared: '/shared',
    login: '/login',
    dynamic: {
        boardTasks: (boardId = ':boardId', shared = false) => `/boards${shared ? '/shared' : ''}/${boardId}/tasks`,
    },
};

export default ROUTES;
