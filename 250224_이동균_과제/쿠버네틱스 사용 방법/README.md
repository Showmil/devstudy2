# Docker Desktop과 쿠버네티스를 이용해 소스코드를 배포하기

## 1. 소스코드 작성
- 파이썬 Flask 프레임워크를 이용해 메세지를 출력하는 소스코드 작성
```
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
```

## 2. Dockerfile 작성
- 소스코드를 컨테이너 이미지로 빌드하기 위한 Dockerfile 작성
```
# Python 3.9 slim 베이스 이미지 사용
FROM python:3.9-slim

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 파일 복사
COPY app.py .

# Flask 설치
RUN pip install flask

# 컨테이너 시작 시 애플리케이션 실행
CMD ["python", "app.py"]
```

## 3. Docker 이미지 빌드
- Docker Desktop을 설치하고 아래 명령어로 이미지 빌드
```
docker build -t my-flask-app .
```

## 4. 쿠버네티스 메니페스트 작성
- 쿠버네티스에서 어플을 배포하기 위한 Deployment와 Service YAML  파일 작성
- deployment.yaml
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-flask-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-flask-app
  template:
    metadata:
      labels:
        app: my-flask-app
    spec:
      containers:
      - name: my-flask-container
        image: my-flask-app:latest
        ports:
        - containerPort: 80
```
- service.yaml
```
apiVersion: v1
kind: Service
metadata:
  name: my-flask-service
spec:
  type: NodePort
  selector:
    app: my-flask-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

## 5. 쿠버네티스에 어플 배포
- 터미널에서 명령어를 실행해 YAML 파일 적용
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```