import React from 'react';
import './App.css';

// Data defined directly in App.js
const books = [
  { id: 101, bname: 'Master React', price: 670 },
  { id: 102, bname: 'Deep Dive into Angular 11', price: 800 },
  { id: 103, bname: 'Mongo Essentials', price: 450 },
];

const courses = [
  { id: 1, cname: 'Angular', date: '4/5/2021' },
  { id: 2, cname: 'React', date: '6/3/2021' },
];

const blogs = [
  {
    id: 1,
    title: 'React Learning',
    author: 'Stephen Biz',
    content: 'Welcome to learning React!',
  },
  {
    id: 2,
    title: 'Installation',
    author: 'Schewzdenier',
    content: 'You can install React from npm.',
  },
];

function App() {
  // 1. Element Variable for Book Details
  const bookdet = (
    <ul>
      {books.map((book) => (
        <div key={book.id} className="item-card">
          <h3>{book.bname}</h3>
          <span className="badge price-badge">₹{book.price}</span>
        </div>
      ))}
    </ul>
  );

  // 2. Conditional Rendering logic for Blog Details
  let content;
  if (blogs && blogs.length > 0) {
    content = (
      <ul>
        {blogs.map((blog) => (
          <div key={blog.id} className="item-card">
            <h3>{blog.title}</h3>
            <span className="author-tag">✍️ {blog.author}</span>
            <p>{blog.content}</p>
          </div>
        ))}
      </ul>
    );
  } else {
    content = <p>No blog details available.</p>;
  }

  // 3. Element Variable for Course Details
  const coursedet = (
    <ul>
      {courses.map((course) => (
        <div key={course.id} className="item-card">
          <h3>{course.cname}</h3>
          <span className="badge date-badge">📅 {course.date}</span>
        </div>
      ))}
    </ul>
  );

  return (
    <div>
      <h1 className="main-title">🚀 Blogger & Learning Portal</h1>
      <div className="container">
        {/* Course Details Column */}
        <div className="mystyle1">
          <h1>Course Details</h1>
          {coursedet}
        </div>

        {/* Book Details Column */}
        <div className="st2">
          <h1>Book Details</h1>
          {bookdet}
        </div>

        {/* Blog Details Column */}
        <div className="v1">
          <h1>Blog Details</h1>
          {content}
        </div>
      </div>
    </div>
  );
}

export default App;