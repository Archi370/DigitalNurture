import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap, timeout } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    {
      id: 1,
      code: 'CS101',
      title: 'Data Structures & Algorithms',
      description: 'Fundamental data structures including arrays, linked lists, trees, graphs, and algorithmic complexity analysis.',
      instructor: 'Dr. Sarah Jenkins',
      credits: 4,
      gradeStatus: 'passed',
      department: 'Computer Science'
    },
    {
      id: 2,
      code: 'WEB201',
      title: 'Modern Web Development with Angular',
      description: 'Comprehensive guide to building enterprise SPA applications using Angular standalone components, RxJS, and NgRx.',
      instructor: 'Prof. Alex Rivera',
      credits: 3,
      gradeStatus: 'pending',
      department: 'Software Engineering'
    },
    {
      id: 3,
      code: 'DB301',
      title: 'Database Management Systems',
      description: 'Relational database concepts, SQL query optimization, normalization, indexing, and ACID transactions.',
      instructor: 'Dr. Michael Chang',
      credits: 4,
      gradeStatus: 'passed',
      department: 'Information Systems'
    },
    {
      id: 4,
      code: 'AI401',
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Introduction to neural networks, supervised and unsupervised learning algorithms, and deep learning models.',
      instructor: 'Dr. Emily Watson',
      credits: 4,
      gradeStatus: 'failed',
      department: 'Computer Science'
    },
    {
      id: 5,
      code: 'SE102',
      title: 'Software Architecture & Design Patterns',
      description: 'Design patterns, clean code principles, SOLID concepts, and microservices architecture.',
      instructor: 'Prof. David Miller',
      credits: 2,
      gradeStatus: 'pending',
      department: 'Software Engineering'
    }
  ];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Timeout after 1200ms to immediately fall back if json-server is not running
      timeout(1200),
      // Task 86: retry strategy - retries failed HTTP requests 1 time
      retry(1),
      // Task 83: RxJS map operator to filter courses with credits > 0
      map(courses => courses.filter(c => c.credits > 0)),
      // Task 85: tap operator for side effects (logging)
      tap(courses => console.log('Courses loaded:', courses.length)),
      catchError(err => {
        console.warn('API connection timed out or offline, serving fallback courses:', err);
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      timeout(1200),
      catchError(() => {
        const found = this.initialCourses.find(c => c.id === id) || this.initialCourses[0];
        return of(found);
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      timeout(1200),
      tap(newCourse => {
        this.initialCourses.push(newCourse);
      }),
      catchError(() => {
        const created: Course = { ...course, id: Date.now() };
        this.initialCourses.push(created);
        return of(created);
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      timeout(1200),
      catchError(() => of(course))
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      timeout(1200),
      tap(() => {
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
      }),
      catchError(() => {
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
        return of({ success: true });
      })
    );
  }
}
