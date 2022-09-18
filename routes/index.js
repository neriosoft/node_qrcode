const express = require('express');
const router = express.Router()
const { create, find, update, delete } = require('../controllers/index');

router.get('/profile', find);
router.post('/profile', create);
router.get('/profile:id', update);
router.get('/search?key=firstName&value=john', find);
router.post('profile/verify');
router.get('/profiles?sort=firstName:ASC&page=1&pageSize=10')
