FROM python:3.12-slim

# Prevents Python from writing .pyc files and enables stdout/stderr flushing
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "hospital_management.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]