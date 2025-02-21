//추억(게시글) 관련 라우트

const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');
const { authenticatePassword } = require('../middlewares/auth');

// 게시글 등록
router.post('/register', memoryController.registerMemory);

// 게시글 수정
router.put('/update', authenticatePassword, memoryController.updateMemory);

// 게시글 삭제
router.delete('/delete', authenticatePassword, memoryController.deleteMemory);

// 게시글 목록 조회
router.get('/', memoryController.getMemories);

// 게시글 상세 조회
router.get('/:id/:password?', memoryController.getMemoryDetail);

// 게시글 공감 보내기
router.post('/:id/like', memoryController.likeMemory);

module.exports = router;
