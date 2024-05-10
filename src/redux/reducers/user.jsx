import { createReducer } from '@reduxjs/toolkit'
import { LoginUserReq, LoginUserSuc, LoginUserFai, LoadUserReq, LoadUserSuc, LoadUserFai, LogoutUserFai, LogoutUserReq, LogoutUserSuc, ClearMessage, ClearError, RegisterUserReq, RegisterUserSuc, RegisterUserFai,allpostsreq, allusername } from '../ActionType';

const initialstate = {
    loading: false,
    user: null,
    isAuth: undefined,
    message: null,
    error: null,
    posts: [],
    usernames: [],
    change: false,
    userPosts: {},
    open: false
}

const userReducer = createReducer(
    initialstate,
    (builder) => {
        // login 
        builder.addCase(LoginUserReq, (state, payload) => {
            state.loading = true;
        })
        builder.addCase(LoginUserSuc, (state, payload) => {
            state.message = payload.message;
            state.loading = false;
            state.user = payload.user
            state.isAuth = true;
            
        })
        builder.addCase(LoginUserFai, (state, payload) => {
            state.user = null;
            state.isAuth = false,
            state.error = payload;
            state.loading = false;
            state.error = payload.message
        })

        

        // register 
        builder.addCase(RegisterUserReq, (state, payload) => {
            state.loading = true;
        })
        builder.addCase(RegisterUserSuc, (state, payload) => {
            state.message = payload.message;
            state.loading = false;
        })
        builder.addCase(RegisterUserFai, (state, payload) => {
            state.user = null;
            state.isAuth = false,
                state.error = payload;
            state.loading = false;
            state.error = payload.message
        })


        // load user 
        builder.addCase(LoadUserReq, (state, payload) => {
            state.loading = true;
        })
        builder.addCase(LoadUserSuc, (state, payload) => {
            state.user = payload.user;
            state.isAuth = true,
                state.loading = false;
        })
        builder.addCase(LoadUserFai, (state, payload) => {
            state.user = null;
            state.isAuth = false,
                state.loading = false;
        })

        // logout user 
        builder.addCase(LogoutUserReq, (state, payload) => {
            state.loading = true;
        })
        builder.addCase(LogoutUserSuc, (state, payload) => {
            state.user = null;
            state.isAuth = false,
                state.loading = false;
            state.message = payload.message
        })
        builder.addCase(LogoutUserFai, (state, payload) => {
            state.loading = false;
            state.error = payload.message;
        })

        // 
        builder.addCase(allpostsreq, (state, payload) => {
            state.posts = payload.posts;
        })

        builder.addCase("userposts", (state, payload) => {
            state.userPosts[payload.id] = payload.posts;
        })

        builder.addCase(allusername, (state, payload) => {
            state.usernames = payload.usernames;
        })

        builder.addCase("pagechange", (state) => {
            state.change = !state.change;
        })


        // clear message and error 
        builder.addCase(ClearMessage, (state, payload) => {
            state.message = null;
        })
        builder.addCase(ClearError, (state, payload) => {
            state.error = null;
        })


        builder.addCase("setOpen", (state, payload) => {
            state.open = payload.open;
        })


    }
)

export default userReducer;