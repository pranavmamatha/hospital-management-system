# Hospital Management System

A backend REST API built with Django & Django REST Framework.

## Live URLs

| | URL |
|---|---|
| API Base | https://pranav-hospital-management.zeroreality.in/api |
| Swagger Docs | https://pranav-hospital-management.zeroreality.in/swagger |
| Admin Panel | https://pranav-hospital-management.zeroreality.in/admin |

## Tech Stack

- **Backend** — Django, Django REST Framework
- **Database** — PostgreSQL
- **Auth** — JWT (SimpleJWT)
- **Cache** — Redis
- **Deployment** — AWS

## API Endpoints

```
POST   /api/users/register/        Register new user
POST   /api/users/login/           Login & get JWT token
GET    /api/users/me/              Get current user
GET    /api/users/doctors/         List all doctors
GET    /api/users/patients/        List all patients

GET    /api/appointments/          List appointments
POST   /api/appointments/          Book appointment
GET    /api/appointments/:id/      Get appointment detail

GET    /api/prescriptions/         List prescriptions
POST   /api/prescriptions/         Create prescription

GET    /api/billing/               List invoices
POST   /api/billing/               Create invoice
```

## Roles & Permissions

| Action | Admin | Doctor | Patient |
|---|---|---|---|
| View Doctors | ✅ | ✅ | ❌ |
| View Patients | ✅ | ✅ | ❌ |
| Book Appointment | ✅ | ❌ | ✅ |
| Write Prescription | ✅ | ✅ | ❌ |
| Create Invoice | ✅ | ❌ | ❌ |

## Test Credentials

| Role | Username | Password |
|---|---|---|
| Admin | admin | admin123 |
| Doctor | dr_smith | doctor123 |
| Patient | patient_arjun | patient123 |

## Local Setup

```bash
git clone https://github.com/prudh-vi/hospital
cd hospital
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed
python manage.py runserver
```