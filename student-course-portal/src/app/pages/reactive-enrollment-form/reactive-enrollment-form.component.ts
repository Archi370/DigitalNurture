import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ComponentWithUnsavedChanges } from '../../guards/unsaved-changes.guard';
import { EnrollmentService } from '../../services/enrollment.service';

// Task 5: Custom Synchronous Validator
export function noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
  const val = control.value ? String(control.value).toUpperCase() : '';
  if (val.startsWith('XX')) {
    return { invalidCourseCode: 'Course code starting with XX is prohibited.' };
  }
  return null;
}

// Task 5: Custom Asynchronous Validator
export function simulateEmailCheckValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  if (!control.value) {
    return of(null);
  }
  const email = String(control.value).toLowerCase();
  // Simulates checking database with 500ms delay
  return of(email.includes('test@')).pipe(
    delay(500),
    map(isTaken => (isTaken ? { emailTaken: 'This email is reserved or already registered.' } : null))
  );
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h2>⚡ Advanced Course Registration (Reactive Form)</h2>
        <p>Dynamic reactive form with custom sync/async validators and FormArray.</p>
      </div>

      <form [formGroup]="enrollForm" (ngSubmit)="onSubmit()" novalidate>
        <!-- Student Name -->
        <div class="form-group">
          <label for="studentName">Student Full Name *</label>
          <input
            type="text"
            id="studentName"
            formControlName="studentName"
            class="form-control"
            placeholder="e.g. Jane Smith"
          />
          <div class="error-msg" *ngIf="f['studentName'].touched && f['studentName'].errors">
            <span *ngIf="f['studentName'].errors['required']">Full name is required.</span>
            <span *ngIf="f['studentName'].errors['minlength']">Minimum 3 characters required.</span>
          </div>
        </div>

        <!-- Student Email (with Async Validator) -->
        <div class="form-group">
          <label for="studentEmail">Student Email * (Async Validated)</label>
          <input
            type="email"
            id="studentEmail"
            formControlName="studentEmail"
            class="form-control"
            placeholder="e.g. jane@university.edu"
          />
          <div class="pending-msg" *ngIf="f['studentEmail'].pending">
            ⏳ Checking email availability...
          </div>
          <div class="error-msg" *ngIf="f['studentEmail'].touched && f['studentEmail'].errors">
            <span *ngIf="f['studentEmail'].errors['required']">Email address is required.</span>
            <span *ngIf="f['studentEmail'].errors['email']">Enter a valid email address.</span>
            <span *ngIf="f['studentEmail'].errors['emailTaken']">{{ f['studentEmail'].errors['emailTaken'] }}</span>
          </div>
        </div>

        <!-- Course Code (with Custom Sync Validator) -->
        <div class="form-group">
          <label for="courseCode">Course Code * (No 'XX' allowed)</label>
          <input
            type="text"
            id="courseCode"
            formControlName="courseCode"
            class="form-control"
            placeholder="e.g. CS101"
          />
          <div class="error-msg" *ngIf="f['courseCode'].touched && f['courseCode'].errors">
            <span *ngIf="f['courseCode'].errors['required']">Course code is required.</span>
            <span *ngIf="f['courseCode'].errors['invalidCourseCode']">{{ f['courseCode'].errors['invalidCourseCode'] }}</span>
          </div>
        </div>

        <!-- Preferred Semester -->
        <div class="form-group">
          <label for="preferredSemester">Preferred Semester</label>
          <select id="preferredSemester" formControlName="preferredSemester" class="form-control">
            <option value="Fall">Fall Semester</option>
            <option value="Spring">Spring Semester</option>
            <option value="Summer">Summer Semester</option>
          </select>
        </div>

        <!-- FormArray for Additional Elective Courses -->
        <div class="form-group form-array-group">
          <div class="form-array-header">
            <label>Additional Elective Courses (FormArray)</label>
            <button type="button" class="btn-add" (click)="addCourse()">+ Add Course</button>
          </div>

          <div formArrayName="additionalCourses" class="form-array-list">
            <div
              *ngFor="let ctrl of additionalCoursesControls.controls; let i = index"
              class="form-array-item"
            >
              <input
                type="text"
                [formControlName]="i"
                class="form-control"
                placeholder="Elective Course Code (e.g. MATH201)"
              />
              <button type="button" class="btn-remove" (click)="removeCourse(i)">✕</button>
            </div>
          </div>
        </div>

        <!-- Agree to Terms -->
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" formControlName="agreeToTerms" />
            I agree to the registration guidelines *
          </label>
          <div class="error-msg" *ngIf="f['agreeToTerms'].touched && f['agreeToTerms'].errors">
            You must agree to continue.
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn-reset" (click)="resetForm()">Reset</button>
          <button type="submit" class="btn-submit" [disabled]="enrollForm.invalid">
            Submit Reactive Form
          </button>
        </div>
      </form>

      <div class="submission-success" *ngIf="submitted">
        ✅ Reactive registration submitted successfully!
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 650px;
      margin: 0 auto;
      background: #1e293b;
      padding: 2rem;
      border-radius: 16px;
      color: #ffffff;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .form-header h2 { margin-top: 0; color: #a855f7; }
    .form-header p { color: #94a3b8; margin-bottom: 1.5rem; }
    .form-group {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .form-group label { font-size: 0.9rem; font-weight: 600; color: #cbd5e1; }
    .form-control {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #0f172a;
      color: #fff;
      font-size: 0.95rem;
    }
    .error-msg { color: #f87171; font-size: 0.8rem; }
    .pending-msg { color: #fbbf24; font-size: 0.8rem; }
    .form-array-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .btn-add {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.4);
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    .form-array-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-array-item {
      display: flex;
      gap: 0.5rem;
    }
    .form-array-item .form-control { flex: 1; }
    .btn-remove {
      background: #ef4444;
      color: #fff;
      border: none;
      padding: 0 0.8rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .checkbox-group { flex-direction: row; }
    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
    .form-actions { display: flex; justify-content: space-between; margin-top: 1.5rem; }
    .btn-reset {
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #cbd5e1;
      cursor: pointer;
    }
    .btn-submit {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .submission-success {
      margin-top: 1.5rem;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }
  `]
})
export class ReactiveEnrollmentFormComponent implements OnInit, ComponentWithUnsavedChanges {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheckValidator]],
      courseCode: ['', [Validators.required, noCourseCodeValidator]],
      preferredSemester: ['Fall'],
      additionalCourses: this.fb.array([]),
      agreeToTerms: [false, [Validators.requiredTrue]]
    });
  }

  get f() {
    return this.enrollForm.controls;
  }

  get additionalCoursesControls(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCoursesControls.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCoursesControls.removeAt(index);
  }

  resetForm(): void {
    this.enrollForm.reset({
      preferredSemester: 'Fall',
      agreeToTerms: false
    });
    this.additionalCoursesControls.clear();
  }

  // Implementation for CanDeactivate unsavedChangesGuard
  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty && !this.submitted;
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      const payload = {
        studentName: this.enrollForm.value.studentName,
        studentEmail: this.enrollForm.value.studentEmail,
        courseId: this.enrollForm.value.courseCode,
        preferredSemester: this.enrollForm.value.preferredSemester,
        agreeToTerms: this.enrollForm.value.agreeToTerms,
        additionalCourses: this.enrollForm.value.additionalCourses
      };

      this.enrollmentService.submitEnrollment(payload).subscribe(() => {
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 1500);
      });
    }
  }
}
