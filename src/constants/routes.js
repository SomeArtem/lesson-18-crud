const ROUTES={
    TODOS:'/todos',
    BOOKS:'/books',
    TODOS_ID:'/todos/:id',
    SIGNIN:'/signin',
    SIGNUP:'/signup',
    INDEX:'/',
}

const PUBLIC_PAGES =[ROUTES.INDEX, ROUTES.SIGNIN, ROUTES.SIGNUP];
export {PUBLIC_PAGES};

export default ROUTES;