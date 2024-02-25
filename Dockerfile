FROM openjdk:17-jdk-slim
EXPOSE 8080

ARG JAR_FILE=target/*.jar

# JAR 파일 메인 디렉토리에 복사
COPY ${JAR_FILE} app.jar

# 시스템 진입점 정의
ENTRYPOINT ["java","-jar","/app.jar"]