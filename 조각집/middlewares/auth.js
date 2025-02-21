//비밀번호 인증 미들웨어

const memoryModel = require('../models/memory');

const authenticatePassword = (req, res, next) => {
    const { id, password } = req.body;
    const memory = memoryModel.getMemoryById(id);

    if (!memory) {
        return res.status(404).json({ message: 'Memory not found' });
    }

    if (memory.password === password) {
        next();
    } else {
        return res.status(401).json({ message: 'Invalid password' });
    }
};

module.exports = { authenticatePassword };
