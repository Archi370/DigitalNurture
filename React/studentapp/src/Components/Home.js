import React, { Component } from 'react';

export class Home extends Component {
  state = {
    search: '',
    students: [
      { id: 'ST-1001', name: 'Aarav Sharma', course: 'Computer Science', status: 'Active' },
      { id: 'ST-1002', name: 'Priya Patel', course: 'Data Science', status: 'Active' },
      { id: 'ST-1003', name: 'Rohan Verma', course: 'AI & ML', status: 'Pending' },
      { id: 'ST-1004', name: 'Ananya Roy', course: 'Cybersecurity', status: 'Active' }
    ]
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const filtered = this.state.students.filter(s =>
      s.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.course.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div className="panel">
        <div className="panel-header">
          <h2>🏠 Welcome to Student Management Portal</h2>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search student or course..."
            value={this.state.search}
            onChange={this.handleSearch}
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Enrolled Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td><code>{s.id}</code></td>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.course}</td>
                  <td>
                    <span className={`badge ${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#64748b' }}>
                  No matching student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}