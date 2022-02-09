const to = (promise) => {
    return promise
        .then((data) => [null, data])
        .catch((err) => [err, null]);
};

exports.to = to