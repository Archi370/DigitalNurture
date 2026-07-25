import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    code: 'CS101',
    title: 'Data Structures',
    instructor: 'Dr. Smith',
    credits: 4,
    gradeStatus: 'passed',
    department: 'Computer Science'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course title in card title element', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(titleEl.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested when enroll button is clicked', () => {
    component.course = { ...mockCourse, isEnrolled: false };
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const btn = fixture.debugElement.query(By.css('.btn-enroll')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(component.course);
  });

  it('should trigger ngOnChanges and log changes', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });

    expect(console.log).toHaveBeenCalled();
  });
});
