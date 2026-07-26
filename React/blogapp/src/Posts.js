// src/Posts.js
import React from 'react';
import Post from './Post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasError: false
    };
  }

  // Fetch API method requested in the lab
  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        // Map raw objects to instances of our Post class
        const postList = data.slice(0, 10).map(
          (item) => new Post(item.id, item.title, item.body)
        );
        this.setState({ posts: postList });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  // Lifecycle hook to trigger fetching after mounting
  componentDidMount() {
    this.loadPosts();
  }

  // Error boundary lifecycle hook to catch errors
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    alert(`An error occurred in Posts component: ${error}`);
    console.error('Error Info:', info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-banner">
          <h2>Something went wrong displaying the posts.</h2>
        </div>
      );
    }

    return (
      <div className="posts-container">
        <div className="posts-header">
          <h2>Featured Articles</h2>
          <span className="post-count">{this.state.posts.length} Posts</span>
        </div>

        <div className="posts-grid">
          {this.state.posts.map((post) => (
            <div key={post.id} className="post-card">
              <span className="post-id">#{post.id}</span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;