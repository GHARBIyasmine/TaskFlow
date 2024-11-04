# Use slim-buster or slim-bullseye for enhanced security and stability
FROM python:3.9-slim-buster

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

# Install dependencies
COPY requirements.txt .
RUN python -m venv /opt/venv && \
    pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose only the necessary port
EXPOSE 8000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "60", "djangoProject.wsgi:application"]
