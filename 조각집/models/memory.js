//추억(게시글) 모델

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/memories.json');

let memories = [];

const loadMemories = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        memories = JSON.parse(data);
    }
};

const saveMemories = () => {
    fs.writeFileSync(filePath, JSON.stringify(memories, null, 2));
};

const getAllMemories = () => {
    return memories;
};

const getMemoryById = (id) => {
    return memories.find(memory => memory.id === id);
};

const addMemory = (memory) => {
    memories.push(memory);
    saveMemories();
};

const updateMemory = (id, updatedMemory) => {
    const index = memories.findIndex(memory => memory.id === id);
    if (index !== -1) {
        memories[index] = { ...memories[index], ...updatedMemory };
        saveMemories();
    }
};

const deleteMemory = (id) => {
    memories = memories.filter(memory => memory.id !== id);
    saveMemories();
};

loadMemories();

module.exports = {
    getAllMemories,
    getMemoryById,
    addMemory,
    updateMemory,
    deleteMemory
};
