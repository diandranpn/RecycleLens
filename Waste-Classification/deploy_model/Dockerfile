FROM python:3.8-slim-buster
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install flask
RUN pip install torch torchvision
COPY . .
EXPOSE 5000
CMD ["python","app.py"]