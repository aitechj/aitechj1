FROM openjdk:17-jdk-slim

ENV PATH="/usr/local/openjdk-17/bin:$PATH"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-8080}"]
