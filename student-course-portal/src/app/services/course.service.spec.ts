import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    {
      id: 1,
      code: 'CS101',
      title: 'Data Structures',
      instructor: 'Dr. Smith',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      code: 'WEB201',
      title: 'Web Dev',
      instructor: 'Prof. Rivera',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses via GET request', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].code).toBe('CS101');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP error gracefully with retry(1) and return fallback courses', () => {
    service.getCourses().subscribe(courses => {
      expect(courses).toBeDefined();
      expect(courses.length).toBeGreaterThan(0);
    });

    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Server Error', { status: 500, statusText: 'Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });
});
