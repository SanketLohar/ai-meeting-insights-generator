# Use a standard Java 17 base image
# (You can change '17' to match your project's Java version, e.g., 21)
FROM eclipse-temurin:17-jdk-jammy

# Set a working directory inside the container
WORKDIR /app

# Copy the built .jar file from your 'target' folder into the container
# This assumes you have already run 'mvn package' locally or in a build script
COPY target/*.jar app.jar

# Tell Docker that your application will run on port 8080
EXPOSE 8080

# The command to run your application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]