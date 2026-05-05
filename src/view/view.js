
exports.success = (res, data, status = 200) => {
    return res.status(status).json(data);
};

exports.noContent = (res) => {
    return res.status(204).send();
};

exports.error = (res, err) => {
    return res.status(400).json({
        error: err.message || "Erro interno"
    });
};