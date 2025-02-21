//추억(게시글) 관련 비즈니스 로직

const memoryModel = require('../models/memory');
const { v4: uuidv4 } = require('uuid');

const registerMemory = (req, res) => {
    const { nickname, title, image, content, tags, location, moment, isPublic, password } = req.body;
    const newMemory = {
        id: uuidv4(),
        nickname,
        title,
        image,
        content,
        tags,
        location,
        moment,
        isPublic,
        password,
        createdAt: new Date(),
        likes: 0,
        comments: []
    };
    memoryModel.addMemory(newMemory);
    res.status(201).json(newMemory);
};

const updateMemory = (req, res) => {
    const { id, title, image, content, tags, location, moment, isPublic } = req.body;
    memoryModel.updateMemory(id, { title, image, content, tags, location, moment, isPublic });
    res.status(200).json({ message: 'Memory updated successfully' });
};

const deleteMemory = (req, res) => {
    const { id } = req.body;
    memoryModel.deleteMemory(id);
    res.status(200).json({ message: 'Memory deleted successfully' });
};

const getMemories = (req, res) => {
    const { sort, search, isPublic } = req.query;
    let memories = memoryModel.getAllMemories();

    if (search) {
        memories = memories.filter(memory => memory.title.includes(search) || memory.tags.includes(search));
    }

    if (isPublic !== undefined) {
        memories = memories.filter(memory => memory.isPublic.toString() === isPublic);
    }

    if (sort) {
        switch (sort) {
            case 'latest':
                memories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'mostComments':
                memories.sort((a, b) => b.comments.length - a.comments.length);
                break;
            case 'mostLikes':
                memories.sort((a, b) => b.likes - a.likes);
                break;
            default:
                break;
        }
    }

    res.status(200).json(memories);
};

const getMemoryDetail = (req, res) => {
    const { id, password } = req.params;
    const memory = memoryModel.getMemoryById(id);

    if (!memory) {
        return res.status(404).json({ message: 'Memory not found' });
    }

    if (memory.isPublic || memory.password === password) {
        return res.status(200).json(memory);
    } else {
        return res.status(401).json({ message: 'Invalid password' });
    }
};

const likeMemory = (req, res) => {
    const { id } = req.params;
    const memory = memoryModel.getMemoryById(id);

    if (memory) {
        memory.likes += 1;
        memoryModel.updateMemory(id, { likes: memory.likes });
        res.status(200).json({ message: 'Memory liked successfully' });
    } else {
        res.status(404).json({ message: 'Memory not found' });
    }
};

module.exports = {
    registerMemory,
    updateMemory,
    deleteMemory,
    getMemories,
    getMemoryDetail,
    likeMemory
};
