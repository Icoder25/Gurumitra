# Use Python base image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy app code
COPY . .

# Start the server using gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
