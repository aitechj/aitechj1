FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["/usr/local/openjdk-17/bin/java", "-jar", "app.jar", "--server.port=${PORT:-8080}"]
