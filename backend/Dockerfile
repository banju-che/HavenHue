# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Run migrations on container start
CMD python manage.py migrate && gunicorn havenhue_backend.wsgi:application --bind

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
