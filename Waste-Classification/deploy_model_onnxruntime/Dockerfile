FROM python:3.8-slim-buster
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install flask
RUN pip install onnxruntime
RUN pip install flask_cors
RUN pip install pillow
COPY . .
CMD ["python","app.py"]