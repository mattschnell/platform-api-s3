import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  post.save().then((result) => {
    res.json({ message: 'Post created!' });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  Post.find({}).then((result) => {
    res.json({ message: result });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((result) => {
    res.json({ message: result });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }).then((result) => {
    res.json({ message: result });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body).then((result) => {
    res.json({ message: result });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
