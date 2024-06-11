const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts({start:req.query.start, limit:req.query.limit});
    const postsWithImages = await Promise.all(posts.map(async (post) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
      const photos = response.data;           
      const userData = await fetchUserById(post.userId);

      return {
        ...post,
        images: photos.map(photo => ({ url: photo.url })),
        user: userData
      };
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or photos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
