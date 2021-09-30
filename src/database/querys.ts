export const commentsQuery = {
    path: "comments",
    select: "comment -_id",
    options: {
        sort: { "dateCreated": -1 }
    },
    populate: [
        {
            path: "dateCreated"
        },
        {
            path: "likeCount"
        },
        {
            path: "user",
            select: "username -_id"
        },
        {
            path: "likes",
            select: "username -_id"
        }
    ]
}

export const userQuery = {
    path: "user",
    select: "username -_id"
}

export const likesQuery = {
    path: "likes",
    select: "username -_id"
}

export const postQuery = {
    path: "post",
    select: "username -_id"
}