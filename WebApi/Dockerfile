# Stage 1: Build the application using .NET 8 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build release DLLs
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Run the application using lightweight .NET 8 Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expose ports for communication
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebApiHandson.dll"]