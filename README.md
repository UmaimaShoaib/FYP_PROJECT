#FYP_PROJECT
```markdown
# FUI Course Intel – Backend

FUI Course Intel is a faculty-to-course allocation system developed as a Final Year Project at Foundation University Islamabad. This backend is built using Node.js with Express and uses PostgreSQL as the database. It supports rule-based, ML-based, and API-based course assignment methods.

## Project Members

- Umaima Shoaib  
- Iqra Azhar  
- Mukarmah Gull  

Supervisor: Dr. Arif Jamal

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- node-postgres (`pg`)
- Optional AI Integration (Manual Logic, Machine Learning, Pre-trained APIs)

## Folder Structure

```

backend/
├── controllers/        # Handles request logic
├── models/             # Interacts with the database
├── routes/             # API endpoints
├── services/           # Allocation logic (manual or AI)
├── utils/              # Helper functions
├── config/             # Configuration files
├── app.js              # Initializes Express app
└── server.js           # Starts the server

````

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fui-course-intel-backend.git
cd fui-course-intel-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=course_intel
OPENAI_API_KEY=your_openai_api_key_if_applicable
```

### 4. Start the Server

```bash
npm run dev
```

Server will be accessible at `http://localhost:5000`

## API Endpoints

| Method | Route                  | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/api/teachers`        | Retrieve all teacher records      |
| POST   | `/api/teachers`        | Add a new teacher                 |
| GET    | `/api/courses`         | Retrieve all course records       |
| POST   | `/api/courses`         | Add a new course                  |
| POST   | `/api/allocate/manual` | Perform rule-based allocation     |
| POST   | `/api/allocate/ai`     | Perform AI-based allocation       |
| GET    | `/api/allocations`     | Retrieve final allocation results |

## AI Allocation Methods

### Manual Rule-Based Allocation

Matches teacher qualifications, specialization, experience, and preferences using conditional logic and filters.

### Machine Learning Allocation

Uses historical data to train models such as Decision Tree, Random Forest, or SVM for predicting suitable course assignments.

### Pre-trained API Integration

Uses services such as OpenAI or Hugging Face to analyze structured prompts and return recommended courses.

Example prompt:

```json
{
  "prompt": "Assign a course to a teacher with MS in Computer Science, 5 years of experience, specialization in AI"
}
```

Response:
`Recommended Course: Artificial Intelligence`

## Future Scope

* Authentication for admin and faculty roles
* Feedback and historical performance-based allocation
* Timetable generation and workload balancing
* Allocation report export (CSV or PDF)

## License

This backend is developed as part of a Final Year Project at Foundation University Islamabad and is intended for academic use only.


```
```
