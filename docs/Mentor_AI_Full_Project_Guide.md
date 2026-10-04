# Mentor AI Full Project Guide

## 1. What This Product Is

Mentor AI is a personalized career growth platform for students. The app should answer three core questions for every user:

1. Where am I today?
2. Where do I want to go?
3. What should I do next?

The product becomes valuable over weeks and months because it combines user profile data, resume data, progress tracking, roadmap planning, interview preparation, and AI chat into one system.

## 2. Current State Of This Repo

This repository is still at the scaffold stage.

### Backend status

- Register flow exists.
- Prisma is configured for PostgreSQL.
- JWT generation exists.
- Password hashing exists.
- Only one API route is implemented: auth register.
- Only one database model exists: User.

### Frontend status

- App routing exists.
- Layout shells exist.
- Pages are mostly placeholders.
- No real dashboard data flow exists yet.
- No real auth flow exists yet.

### Immediate gap to fix

- The client uses react-router-dom and now has it declared in the root package file, so the app can route correctly.

## 3. Product Modules

Build the system as separate modules so the code stays maintainable.

### Backend modules

- Auth
- User
- Profile
- Resume
- Skills
- Goals
- Roadmap
- Projects
- Interview
- Analytics
- AI
- Chat
- Admin
- Shared utilities

### Frontend pages

- Landing
- Login
- Register
- Dashboard
- Profile
- Resume
- Roadmap
- Projects
- Interview Prep
- AI Chat
- Analytics
- Settings
- Admin

## 4. Recommended Folder Structure

Use a clean modular structure.

### Backend folder structure

```text
server/
|-- prisma/
|   |-- schema.prisma
|   |-- migrations/
|
|-- src/
|   |-- app.js
|   |-- server.js
|   |
|   |-- config/
|   |   |-- db.js
|   |   |-- env.js
|   |   |-- cors.js
|   |
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   |-- user.controller.js
|   |   |-- profile.controller.js
|   |   |-- resume.controller.js
|   |   |-- goal.controller.js
|   |   |-- roadmap.controller.js
|   |   |-- project.controller.js
|   |   |-- interview.controller.js
|   |   |-- analytics.controller.js
|   |   |-- ai.controller.js
|   |   |-- chat.controller.js
|   |   |-- admin.controller.js
|   |
|   |-- routes/
|   |   |-- auth.routes.js
|   |   |-- user.routes.js
|   |   |-- profile.routes.js
|   |   |-- resume.routes.js
|   |   |-- goal.routes.js
|   |   |-- roadmap.routes.js
|   |   |-- project.routes.js
|   |   |-- interview.routes.js
|   |   |-- analytics.routes.js
|   |   |-- ai.routes.js
|   |   |-- chat.routes.js
|   |   |-- admin.routes.js
|   |
|   |-- services/
|   |   |-- auth.services.js
|   |   |-- user.services.js
|   |   |-- profile.services.js
|   |   |-- resume.services.js
|   |   |-- goal.services.js
|   |   |-- roadmap.services.js
|   |   |-- project.services.js
|   |   |-- interview.services.js
|   |   |-- analytics.services.js
|   |   |-- ai.services.js
|   |   |-- chat.services.js
|   |   |-- admin.services.js
|   |
|   |-- validators/
|   |   |-- auth.validator.js
|   |   |-- user.validator.js
|   |   |-- profile.validator.js
|   |   |-- resume.validator.js
|   |   |-- goal.validator.js
|   |   |-- roadmap.validator.js
|   |   |-- project.validator.js
|   |   |-- interview.validator.js
|   |   |-- analytics.validator.js
|   |   |-- ai.validator.js
|   |   |-- chat.validator.js
|   |   |-- admin.validator.js
|   |
|   |-- middleware/
|   |   |-- auth.middleware.js
|   |   |-- error.middleware.js
|   |   |-- async.middleware.js
|   |   |-- role.middleware.js
|   |   |-- rateLimit.middleware.js
|   |
|   |-- utils/
|   |   |-- generateToken.js
|   |   |-- hashToken.js
|   |   |-- apiResponse.js
|   |   |-- AppError.js
|   |   |-- constants.js
|   |   |-- logger.js
|   |
|   |-- jobs/
|   |   |-- resumeParse.job.js
|   |   |-- aiGenerate.job.js
|   |
|   |-- integrations/
|   |   |-- gemini.js
|   |   |-- cloudinary.js
|   |   |-- imagekit.js
|   |   |-- redis.js
|   |
|   |-- tests/
|       |-- auth.test.js
|       |-- profile.test.js
|       |-- resume.test.js
|       |-- roadmap.test.js
|       |-- ai.test.js
```

### Frontend folder structure

```text
client/
|-- src/
|   |-- main.jsx
|   |-- App.jsx
|   |-- routes/
|   |   |-- AppRoutes.jsx
|   |   |-- ProtectedRoute.jsx
|   |   |-- PublicRoute.jsx
|   |
|   |-- pages/
|   |   |-- Landing/
|   |   |-- Login/
|   |   |-- Register/
|   |   |-- Dashboard/
|   |   |-- Profile/
|   |   |-- Resume/
|   |   |-- Roadmap/
|   |   |-- Projects/
|   |   |-- Interview/
|   |   |-- AIChat/
|   |   |-- Analytics/
|   |   |-- Settings/
|   |   |-- Admin/
|   |
|   |-- components/
|   |   |-- auth/
|   |   |-- dashboard/
|   |   |-- profile/
|   |   |-- resume/
|   |   |-- roadmap/
|   |   |-- interview/
|   |   |-- analytics/
|   |   |-- chat/
|   |   |-- admin/
|   |   |-- common/
|   |
|   |-- context/
|   |-- hooks/
|   |-- layouts/
|   |-- services/
|   |-- styles/
|   |-- utils/
|   |-- assets/
```

## 5. Database Design

Use PostgreSQL with Prisma.

### Core entities

- User
- Profile
- Resume
- Skill
- Goal
- Roadmap
- RoadmapItem
- ProjectRecommendation
- InterviewSession
- InterviewAnswer
- ChatMessage
- ProgressEvent
- AnalyticsSnapshot
- ApiUsage
- AdminAuditLog
- RefreshToken or Session

### Suggested relationships

- User to Profile: one to one
- User to Resume: one to many
- User to Skill: one to many or many to many
- User to Goal: one to many
- User to Roadmap: one to many
- Roadmap to RoadmapItem: one to many
- User to ProjectRecommendation: one to many
- User to InterviewSession: one to many
- InterviewSession to InterviewAnswer: one to many
- User to ChatMessage: one to many
- User to ProgressEvent: one to many

### Important design rule

Do not put all user progress inside a single JSON blob. Use relational tables for production reporting, filtering, and analytics.

## 6. Authentication Plan

Build authentication first because every other feature depends on it.

### Required auth features

- Register
- Login
- Logout
- Refresh token
- Forgot password
- Reset password
- Email verification later

### Auth production rules

- Hash passwords with bcrypt.
- Store access tokens separately from refresh tokens.
- Use short-lived access tokens.
- Store refresh tokens in a revocable way.
- Add role-based authorization.
- Rate limit auth endpoints.
- Validate all inputs with Zod.

### Auth API examples

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- POST /api/v1/auth/refresh-token
- POST /api/v1/auth/forgot-password
- POST /api/v1/auth/reset-password
- GET /api/v1/auth/me

## 7. Profile Module

The profile is the foundation for personalization.

### Store these fields

- Name
- College
- Degree
- Graduation year
- Skills
- Interests
- Preferred role
- GitHub
- LinkedIn
- Resume reference

### Profile logic

- Add completion percentage.
- Track which fields are missing.
- Validate social URLs.
- Allow editing after onboarding.

### Profile API examples

- GET /api/v1/profile/me
- POST /api/v1/profile
- PATCH /api/v1/profile
- GET /api/v1/profile/completion

## 8. Resume Module

This feature must be reliable and asynchronous.

### Resume pipeline

1. User uploads PDF.
2. Server validates file type and size.
3. File is uploaded to Cloudinary or ImageKit.
4. Metadata is stored in PostgreSQL.
5. Text is extracted from the PDF.
6. Text is cleaned and normalized.
7. AI summaries and skill extraction are generated.
8. Structured fields are saved.

### Resume storage fields

- File URL
- Provider
- Original filename
- File size
- MIME type
- Extracted text
- Parsed skills
- Experience summary
- Project summary
- AI feedback status
- Processing status

### Resume API examples

- POST /api/v1/resumes/upload
- GET /api/v1/resumes/me
- GET /api/v1/resumes/:id
- DELETE /api/v1/resumes/:id
- POST /api/v1/resumes/:id/reprocess

## 9. AI Analysis Module

This is the main differentiator.

### What the AI should analyze

- Skills
- Resume
- Projects
- Experience
- Current role goal
- Roadmap progress
- Interview performance

### Expected AI output structure

- Current Level
- Strengths
- Weaknesses
- Missing Skills
- Resume Suggestions
- Projects to Build
- Interview Readiness
- Estimated Readiness Score

### Production AI rules

- Never send only the raw user prompt.
- Always send user context from the database.
- Force structured JSON output.
- Version prompts.
- Store model name and token usage.
- Cache repeatable summaries.
- Run long AI jobs in background workers.

### AI API examples

- POST /api/v1/ai/analyze-career
- POST /api/v1/ai/generate-roadmap
- POST /api/v1/ai/recommend-projects
- POST /api/v1/ai/review-interview-answer
- POST /api/v1/ai/mentor-chat

## 10. Roadmap Module

Roadmaps should be personalized and versioned.

### Roadmap behavior

- Use the user profile and skill gaps.
- Generate weekly learning blocks.
- Break goals into tasks.
- Track progress per task.
- Allow regeneration without deleting history.

### Example roadmap layout

- Week 1: React Router, Context API
- Week 2: Express, PostgreSQL
- Week 3: Authentication and JWT
- Week 4: Build project and deploy

### Roadmap API examples

- POST /api/v1/roadmaps/generate
- GET /api/v1/roadmaps/me
- GET /api/v1/roadmaps/:id
- PATCH /api/v1/roadmaps/items/:id/complete
- PATCH /api/v1/roadmaps/items/:id/reschedule

## 11. Goals Module

Weekly goals make the product sticky.

### Goal types

- Learning goals
- Interview goals
- Project goals
- Revision goals
- Habit goals

### Goal fields

- Title
- Description
- Due date
- Status
- Priority
- Completion date
- Source type
- Source module

### Goal API examples

- POST /api/v1/goals
- GET /api/v1/goals
- PATCH /api/v1/goals/:id
- PATCH /api/v1/goals/:id/complete
- DELETE /api/v1/goals/:id

## 12. Project Recommendation Module

Projects should depend on the chosen role and current gaps.

### Example backend developer projects

- URL Shortener
- Expense Tracker
- Chat App
- Auth API project
- Task manager

### Each recommendation should include

- Difficulty
- Estimated time
- Required skills
- Why it fits the user
- GitHub examples or inspiration links

### Project API examples

- GET /api/v1/projects/recommendations
- POST /api/v1/projects/generate
- GET /api/v1/projects/:id
- PATCH /api/v1/projects/:id/save

## 13. Interview Preparation Module

Track user improvement over time.

### Interview sections

- HR questions
- Technical questions
- Behavioral questions
- Role-specific questions

### Interview data to store

- Question
- User answer
- AI feedback
- Score
- Attempt date
- Topic category

### Interview API examples

- POST /api/v1/interviews/generate
- GET /api/v1/interviews
- GET /api/v1/interviews/:id
- POST /api/v1/interviews/:id/answer
- POST /api/v1/interviews/:id/review

## 14. Skill Tracker Module

The dashboard should show skill growth over time.

### Store

- Skill name
- Category
- Current level
- Target level
- Evidence source
- Last updated date

### Display examples

- React
- Node
- SQL
- DSA
- System design

### Skill API examples

- GET /api/v1/skills
- POST /api/v1/skills
- PATCH /api/v1/skills/:id
- DELETE /api/v1/skills/:id

## 15. Analytics Module

Analytics must be based on real database events.

### Analytics to show

- Weekly study hours
- Projects completed
- Interview score trend
- Goal completion rate
- Skill growth
- Roadmap progress
- AI usage
- Token usage

### Production analytics rules

- Store raw events.
- Precompute summaries if needed.
- Index query columns.
- Keep expensive queries out of request paths.

### Analytics API examples

- GET /api/v1/analytics/dashboard
- GET /api/v1/analytics/study-hours
- GET /api/v1/analytics/goals
- GET /api/v1/analytics/interview-score
- GET /api/v1/analytics/skills

## 16. AI Chat Mentor

This should not be generic chat.

### Chat behavior

Before answering, the system should read:

- Profile
- Resume summary
- Roadmap progress
- Goal state
- Skill gaps
- Recent interviews

### Chat storage

- User message
- Assistant message
- Context snapshot
- Model name
- Token usage
- Prompt version

### Chat API examples

- POST /api/v1/chat/message
- GET /api/v1/chat/history
- DELETE /api/v1/chat/history/:id

## 17. Admin Module

Admin features should be isolated and protected.

### Admin dashboard should show

- Users
- Daily active users
- API usage
- Reports generated
- AI token usage
- Failed jobs
- Audit logs

### Admin API examples

- GET /api/v1/admin/overview
- GET /api/v1/admin/users
- GET /api/v1/admin/usage
- GET /api/v1/admin/reports
- GET /api/v1/admin/audit-logs

## 18. Shared Production Infrastructure

### Environment variables

- DATABASE_URL
- JWT_SECRET
- JWT_REFRESH_SECRET
- CLIENT_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- IMAGEKIT_PUBLIC_KEY
- IMAGEKIT_PRIVATE_KEY
- GEMINI_API_KEY
- REDIS_URL
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- NODE_ENV
- PORT

### Infrastructure recommendations

- Use Redis for caching and rate limits.
- Use a background queue for PDF parsing and AI generation.
- Use Cloudinary or ImageKit for file storage.
- Use PostgreSQL as the source of truth.
- Use structured logs and request IDs.
- Use separate environments for development, staging, and production.

## 19. Validation And Testing

### What to test

- Validation schemas
- Auth flows
- Resume upload
- AI JSON parsing
- Roadmap generation
- Goal completion
- Interview scoring
- Role-based access
- Admin protection

### Testing layers

- Unit tests for services
- Integration tests for controllers and routes
- Schema validation tests
- E2E tests for key user journeys

## 20. Deployment Plan

### Minimum production setup

- Dockerize backend and frontend
- Use a managed PostgreSQL database
- Use managed object storage or media storage
- Use environment-based secrets
- Add CI checks for lint and tests
- Add migration execution in deploy pipeline

### Recommended release stages

1. Local development
2. Auth MVP
3. Profile and resume
4. AI analysis
5. Roadmap and goals
6. Interview and analytics
7. Admin and hardening
8. Production deploy

## 21. Step-By-Step Build Order For A New Developer

### Phase 1

- Set up env validation.
- Fix auth completely.
- Add error handling.
- Add versioned routes.

### Phase 2

- Add profile and resume schemas.
- Add upload and extraction flow.
- Store extracted data.

### Phase 3

- Add AI service layer.
- Generate structured career analysis.
- Store AI outputs.

### Phase 4

- Add roadmap, goals, and progress tracking.
- Make dashboards data-driven.

### Phase 5

- Add project recommendations.
- Add interview preparation.
- Add chat mentor.

### Phase 6

- Add analytics.
- Add admin.
- Add tests, observability, queueing, and deployment.

## 22. Notes For The Current Repo

The current codebase already gives you:

- Express server bootstrap
- Prisma client setup
- JWT helper
- Password hashing
- Auth registration skeleton
- Frontend routing skeleton
- Placeholder UI components

The current codebase does not yet give you:

- Login
- Refresh tokens
- Password reset
- Profile data model
- Resume upload pipeline
- AI analysis service
- Roadmap engine
- Goal tracking
- Analytics backend
- Admin dashboard

## 23. Final Advice

Build this as a product platform, not a collection of AI prompts.

The database should be the memory layer.
The AI should be a service that reads from that memory layer.
The dashboard should visualize progress over time.
The roadmap should update from user behavior.
The chat should be personalized from stored state.

That is what turns Mentor AI from a demo into a production system.
