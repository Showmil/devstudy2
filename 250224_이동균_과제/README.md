## 쿠버네티스 소개
- 여러 대의 서버에 분산되어 있는 컨테이너를 자동으로 배포, 확장, 운영, 관리하는 컨테이너를 자동으로 배포, 확장, 운영, 관리하는 플랫폼

## 쿠버네티스 기본 개념
- Pod : 쿠버네티스에서 가장 작은 배포 단위로 하나 이상의 컨테이너를 포함하고, 같은 네트워크 네임스페이스를 공유
- Deployment : 업데이트/롤백 등 버전 관리 기능을 제공하고, 실제 어플 배포 시 가장 자주 사용

## 쿠버네티스 배포 전략
- 롤링 업데이트 : 새로운 버전을 배포할 때 기존 파드를 하나씩 교체하면서 무중단 배포를 시도
- 블루-그린 배포 : 기존 버전(Blue)와 새 버전(Green)을 동시에 띄워놓고, 새 버전으로 트래픽을 전환한 뒤 문제가 없으면 Blue를 없애고 문제가 있으면 Blue로 되돌림

## Deployment
- maxSurge 등 파라미터로 업데이트 시 동시에 몇 개의 파드를 내려도 되는 지 등을 제어 가능

## YAML
- YAML 파일에 어떤 리소스를 어떻게 할지 적어두고, kubectl apply -f 명령을 통해 적용하면 클러스터 상태가 YAML 파일에 적힌 대로 동잃해진다.