import { Router } from 'express';
import * as Posts from './controllers/post_controller';
// our imports as usual
import * as UserController from './controllers/user_controller';
// eslint-disable-next-line no-unused-vars
import { requireAuth, requireSignin } from './services/passport';
import signS3 from './services/s3';

const router = Router();

router.get('/sign-s3', signS3);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

/// your routes will go here
router.route('/posts').post(requireAuth, (req, res) => {
  Posts.createPost(req, res);
});

router.route('/posts').get((req, res) => {
  Posts.getPosts(req, res);
});

router.route('/posts/:id').get((req, res) => {
  Posts.getPost(req, res);
});

router.route('/posts/:id').delete(requireAuth, (req, res) => {
  Posts.deletePost(req, res);
});

router.route('/posts/:id').put(requireAuth, (req, res) => {
  Posts.updatePost(req, res);
});

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

export default router;
