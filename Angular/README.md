# 🎓 Student Course Portal

A unified, enterprise-grade Single Page Application (SPA) built with **Angular (v22)**, **RxJS**, and **NgRx State Management** as part of the **Digital Nurture 5.0 Angular Hands-On Exercise Book**.

---

## 🚀 Quick Start — How to Run

### Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Mock Backend API (JSON Server)
In your terminal, launch `json-server` to serve the mock API dataset at `http://localhost:3000`:
```bash
npx json-server --watch db.json --port 3000
```
> **Note:** If `json-server` is not running, the application includes automatic fallback mechanisms to seamlessly serve data from memory.

### 3. Start Angular Development Server
In a second terminal window, start the Angular dev server:
```bash
npm start
```
*Or alternatively:*
```bash
npx ng serve
```

### 4. Open Application
Navigate to **[http://localhost:4200](http://localhost:4200)** in your browser.

---

## 🧪 Running Unit Tests & Building

### Run Unit Tests
To execute Jasmine/Karma unit tests covering components, services, and NgRx store integration:
```bash
npm test
```

### Build for Production
To compile and generate production build artifacts in `dist/student-course-portal`:
```bash
npm run build
```

---

## 📚 Hands-On Exercise Implementation Guide

| Hands-On | Topic | Key Files & Implementation |
| :--- | :--- | :--- |
| **Hands-On 1** | **Core Architecture & Setup** | • `notes.txt` explaining key configuration files<br>• Standalone components: `HeaderComponent`, `HomeComponent`, `CourseListComponent`, `StudentProfileComponent` |
| **Hands-On 2** | **Data Binding & Components** | • `portalName`, `isPortalActive`, `searchTerm` with `[(ngModel)]`<br>• `ngOnInit` & `ngOnDestroy` lifecycle hooks<br>• `CourseCardComponent` with `@Input() course`, `@Output() enrollRequested`, and `ngOnChanges` |
| **Hands-On 3** | **Directives, Pipes & Styles** | • `isLoading` delay spinner & `trackBy` function<br>• `*ngSwitch` for status badges & `*ngIf` `#noCourses` template<br>• `HighlightDirective` (`[appHighlight]`) with `@HostListener('mouseenter')`<br>• `CreditLabelPipe` (`creditLabel`) formatting credits<br>• `[ngClass]` and dynamic `[ngStyle]` left border status colors |
| **Hands-On 4** | **Template-Driven Forms** | • `EnrollmentFormComponent` using `#enrollForm="ngForm"`<br>• Real-time error messages, `.ng-invalid.ng-touched` validation states, reset & disabled submit |
| **Hands-On 5** | **Reactive Forms & Validation** | • `ReactiveEnrollmentFormComponent` using `FormBuilder`<br>• Custom sync validator `noCourseCodeValidator` (disallowing 'XX')<br>• Custom async validator `simulateEmailCheckValidator` (email availability)<br>• `FormArray` for dynamic elective course controls (`addCourse()`, `removeCourse()`) |
| **Hands-On 6** | **Services & Hierarchical DI** | • Data models in `models/course.model.ts`<br>• Singleton `CourseService` and `EnrollmentService` (`providedIn: 'root'`)<br>• Hierarchical DI: `NotificationService` scoped to `NotificationComponent` (`providers: [NotificationService]`)<br>• `CourseSummaryWidgetComponent` injecting `CourseService` |
| **Hands-On 7** | **Routing, Guards & Resolvers** | • Route configuration in `app.routes.ts` with lazy loading<br>• `authGuard` guarding `/profile` & `/enroll`<br>• `unsavedChangesGuard` (`canDeactivate` with `window.confirm`) for dirty forms<br>• `courseResolver` pre-fetching course details for `/courses/:id`<br>• `NotFoundComponent` for 404 wildcard routes |
| **Hands-On 8** | **HTTP Client & Interceptors** | • `db.json` backend dataset<br>• `CourseService` HTTP methods (`getCourses`, `getCourseById`, `createCourse`, `updateCourse`, `deleteCourse`)<br>• RxJS operators: `map`, `tap`, `catchError`, `retry(2)`, and `switchMap`<br>• Interceptors: `authInterceptor` (Bearer token), `errorHandlerInterceptor` (401 & 500 handling), `loadingInterceptor` & `LoadingService` |
| **Hands-On 9** | **State Management (NgRx)** | • Store Actions (`loadCourses`, `enrollInCourse`, `unenrollFromCourse`)<br>• Reducer (`courseReducer`) managing courses, loading, error, & enrolled IDs<br>• Selectors (`selectAllCourses`, `selectEnrolledCourses` cross-slice selector)<br>• Effects (`CourseEffects`) executing async API calls |
| **Hands-On 10** | **Unit Testing** | • `course-card.component.spec.ts`: testing `@Input`, `@Output`, and `ngOnChanges`<br>• `course.service.spec.ts`: testing `HttpTestingController` and `retry(2)` HTTP 500 error fallback<br>• `app.spec.ts`: testing root application creation with `provideMockStore` |

---

## 📁 Directory & File Structure

```
student-course-portal/
├── notes.txt                             # Architecture notes for Hands-On 1
├── db.json                                # Mock JSON Server database for Hands-On 8
├── package.json                           # Workspace dependencies and task scripts
├── src/
│   ├── main.ts                            # App entry point (standalone bootstrap + zone.js)
│   ├── app/
│   │   ├── app.ts                         # Root App component layout shell
│   │   ├── app.html                       # HTML template with router-outlet
│   │   ├── app.css                        # App layout styles
│   │   ├── app.config.ts                  # AppConfig (Routing, HTTP Interceptors, NgRx Store)
│   │   ├── app.routes.ts                  # Application route registry
│   │   ├── models/
│   │   │   └── course.model.ts            # Course, Student, and Enrollment interfaces
│   │   ├── directives/
│   │   │   └── highlight.directive.ts     # Custom highlight directive (mouseenter/mouseleave)
│   │   ├── pipes/
│   │   │   └── credit-label.pipe.ts       # Custom credit label formatting pipe
│   │   ├── services/
│   │   │   ├── course.service.ts          # Course HTTP CRUD service with RxJS operators
│   │   │   ├── enrollment.service.ts      # Enrollment service with switchMap
│   │   │   ├── notification.service.ts    # Hierarchical notification service
│   │   │   ├── loading.service.ts         # Global loading spinner state service
│   │   │   └── auth.service.ts            # Authentication state service
│   │   ├── guards/
│   │   │   ├── auth.guard.ts              # CanActivate auth route guard
│   │   │   └── unsaved-changes.guard.ts   # CanDeactivate form guard with window.confirm
│   │   ├── resolvers/
│   │   │   └── course.resolver.ts         # Route resolver for course detail
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts        # HTTP Bearer token interceptor
│   │   │   ├── error-handler.interceptor.ts # Global HTTP 401/500 error interceptor
│   │   │   └── loading.interceptor.ts     # Global HTTP loading spinner interceptor
│   │   ├── store/
│   │   │   └── course/
│   │   │       ├── course.actions.ts      # NgRx Store actions
│   │   │       ├── course.reducer.ts      # NgRx Store reducers
│   │   │       ├── course.selectors.ts    # NgRx Store selectors
│   │   │       └── course.effects.ts      # NgRx Store effects
│   │   ├── components/
│   │   │   ├── header/                    # Main navigation header
│   │   │   ├── course-card/               # Reusable course card component
│   │   │   ├── course-summary-widget/     # Course overview stats widget
│   │   │   ├── loading-spinner/           # Global HTTP loading spinner
│   │   │   └── notification/              # Toast notification component
│   │   └── pages/
│   │       ├── home/                      # Home landing page
│   │       ├── course-list/               # Course catalog list page
│   │       ├── course-detail/             # Detailed course page with resolved data
│   │       ├── enrollment-form/           # Template-driven enrollment form
│   │       ├── reactive-enrollment-form/  # Advanced reactive form with FormArray
│   │       ├── student-profile/           # Student profile page
│   │       └── not-found/                 # 404 wildcard fallback page
```

---

## 🎨 Design & Aesthetic Features
- **Modern Dark Mode UI:** Tailored color palette using slate dark tones (`#0f172a`, `#1e293b`), glassmorphism, and accent gradients (`#6366f1` to `#a855f7`).
- **Typography:** Configured Google Font `Inter` with custom scrollbar styling.
- **Interactive Micro-Animations:** Smooth hover transitions, card lift effects, and animated loading indicators.

---

## 📜 License
Developed for Digital Nurture 5.0 Angular Hands-On Training.
