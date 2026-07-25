import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, timeout } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Enrollment, Student } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000';

  private mockStudents: Student[] = [
    { id: 101, name: 'Alice Smith', email: 'alice@university.edu', enrolledCourseId: 1 },
    { id: 102, name: 'Bob Johnson', email: 'bob@university.edu', enrolledCourseId: 1 },
    { id: 103, name: 'Charlie Davis', email: 'charlie@university.edu', enrolledCourseId: 2 }
  ];

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {}

  getStudentsByCourse(courseId$: Observable<number>): Observable<Student[]> {
    return courseId$.pipe(
      switchMap(id => {
        return this.http.get<Student[]>(`${this.apiUrl}/students?enrolledCourseId=${id}`).pipe(
          timeout(1200),
          catchError(() => {
            const filtered = this.mockStudents.filter(s => s.enrolledCourseId === id);
            return of(filtered);
          })
        );
      })
    );
  }

  submitEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/enrollments`, enrollment).pipe(
      timeout(1200),
      catchError(() => {
        const mockSaved = { ...enrollment, id: Date.now() };
        return of(mockSaved);
      })
    );
  }
}
