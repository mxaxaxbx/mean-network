const express   = require('express');
const router    = express.Router();
// controller
const { create, list, postsByStatus } = require('../controllers/posts.controller');
// middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring auth routing /api/posts');

console.log('[POST] /create ');
router.post('/create', auth, validateUser, create);

console.log('[GET] /list ');
router.get('/list', auth, validateUser, list);

console.log('[GET] /list/status/:status_id');
router.get('/list/status/:status_id', auth, validateUser, postsByStatus);

module.exports = router;
