import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../models/course.model';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h2>📝 Student Course Registration (Template-Driven)</h2>
        <p>Fill out the form below to apply for upcoming course enrollment.</p>
      </div>

      <form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)" novalidate>
        <!-- Student Name -->
        <div class="form-group">
          <label for="studentName">Student Full Name *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            [(ngModel)]="formData.studentName"
            #nameCtrl="ngModel"
            required
            minlength="3"
            class="form-control"
            placeholder="e.g. John Doe"
          />
          <div class="error-msg" *ngIf="nameCtrl.invalid && nameCtrl.touched">
            <span *ngIf="nameCtrl.errors?.['required']">Full name is required.</span>
            <span *ngIf="nameCtrl.errors?.['minlength']">Name must be at least 3 characters.</span>
          </div>
        </div>

        <!-- Student Email -->
        <div class="form-group">
          <label for="studentEmail">Student Email *</label>
          <input
            type="email"
            id="studentEmail"
            name="studentEmail"
            [(ngModel)]="formData.studentEmail"
            #emailCtrl="ngModel"
            required
            email
            class="form-control"
            placeholder="e.g. john@university.edu"
          />
          <div class="error-msg" *ngIf="emailCtrl.invalid && emailCtrl.touched">
            <span *ngIf="emailCtrl.errors?.['required']">Email address is required.</span>
            <span *ngIf="emailCtrl.errors?.['email']">Please enter a valid email address.</span>
          </div>
        </div>

        <!-- Course ID -->
        <div class="form-group">
          <label for="courseId">Select Course *</label>
          <select
            id="courseId"
            name="courseId"
            [(ngModel)]="formData.courseId"
            #courseCtrl="ngModel"
            required
            class="form-control"
          >
            <option value="" disabled>-- Choose a course --</option>
            <option [ngValue]="1">CS101 - Data Structures & Algorithms</option>
            <option [ngValue]="2">WEB201 - Modern Web Development</option>
            <option [ngValue]="3">DB301 - Database Management Systems</option>
            <option [ngValue]="4">AI401 - Artificial Intelligence</option>
          </select>
          <div class="error-msg" *ngIf="courseCtrl.invalid && courseCtrl.touched">
            Please select a course.
          </div>
        </div>

        <!-- Preferred Semester -->
        <div class="form-group">
          <label for="preferredSemester">Preferred Semester</label>
          <select
            id="preferredSemester"
            name="preferredSemester"
            [(ngModel)]="formData.preferredSemester"
            class="form-control"
          >
            <option value="Fall">Fall Semester</option>
            <option value="Spring">Spring Semester</option>
            <option value="Summer">Summer Semester</option>
          </select>
        </div>

        <!-- Agree to Terms Checkbox -->
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              [(ngModel)]="formData.agreeToTerms"
              #termsCtrl="ngModel"
              required
            />
            I agree to the academic terms and conditions *
          </label>
          <div class="error-msg" *ngIf="termsCtrl.invalid && termsCtrl.touched">
            You must accept the terms before submitting.
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button
            type="button"
            class="btn-reset"
            (click)="enrollForm.resetForm()"
          >
            Reset Form
          </button>

          <button
            type="submit"
            class="btn-submit"
            [disabled]="enrollForm.invalid"
          >
            Submit Application
          </button>
        </div>
      </form>

      <div class="submission-success" *ngIf="submitted">
        ✅ Registration submitted successfully! Redirecting to courses...
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      background: #1e293b;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      color: #ffffff;
    }
    .form-header h2 {
      margin-top: 0;
      color: #818cf8;
    }
    .form-header p {
      color: #94a3b8;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .form-group label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #cbd5e1;
    }
    .form-control {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #0f172a;
      color: #fff;
      font-size: 0.95rem;
      transition: border-color 0.2s ease;
    }
    /* Validation CSS states required by Hands-On 4 */
    .form-control.ng-invalid.ng-touched {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.05);
    }
    .form-control.ng-valid.ng-touched {
      border-color: #10b981 !important;
    }
    .error-msg {
      color: #f87171;
      font-size: 0.8rem;
      margin-top: 0.2rem;
    }
    .checkbox-group {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }
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
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
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
export class EnrollmentFormComponent {
  formData: Enrollment = {
    studentName: '',
    studentEmail: '',
    courseId: '',
    preferredSemester: 'Fall',
    agreeToTerms: false
  };

  submitted = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.enrollmentService.submitEnrollment(this.formData).subscribe(() => {
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 1500);
      });
    }
  }
}
