export const commentsQuery = {
    path: "comments",
    select: "comment",
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