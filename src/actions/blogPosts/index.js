import _ from 'lodash';
import jsonPlaceholder from '../../api/jsonplaceholder';

export const fetchPostsAndUsers = () => async(dispatch, getState) => {
    await dispatch(fetchPosts());
    //lodash unique methods filters array elements to have only unique ids
    //lodash map methods lets us to create array only from the chosen properties
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    //chain lodash method lets us join bunch of additional functions
    _.chain(getState().posts)
        //posts are provided by default as 1st parametr, need to provide only second
        .map('userId')
        //takes the result of map method
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        //.value() is a part of chain method to be executed
        .value();

}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({
        type: "FETCH_POSTS",
        payload: response.data
    })
}

export const fetchUser = userid => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${userid}`);
    dispatch({
        type: "FETCH_USER",
        payload: response.data
    })
}

// //function returns a function, which returns a functions, which calls a function
// export const fetchUser = userid => dispatch => _fetchUsers(userid, dispatch);
// //memoize function prevents us from making the same api call for the same user - it memorizes the response and returns it if we call same function twice
// const _fetchUsers = _.memoize(async(userid, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${userid}`);
//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     })
// })
