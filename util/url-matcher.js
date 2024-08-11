module.exports = {
    usersMatch: (url) => {
        return url.match(/^\/users$/);
    },

    usersWithNameMatch: (url) => {
        return url.match(/^\/users\/[a-zA-Z0-9 ]+$/);
    },

    paintsMatch: (url) => {
        return url.match(/^\/paints$/);
    },

    paintsWithColourMatch: (url) => {
        return url.match(/^\/paints\/[a-zA-Z0-9 ]+$/);
    },
};