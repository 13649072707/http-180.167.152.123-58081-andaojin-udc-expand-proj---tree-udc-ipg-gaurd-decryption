#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["nacos/EDoc2.Web/EDoc2.Web.csproj", "nacos/EDoc2.Web/"]
RUN dotnet restore "nacos/EDoc2.Web/EDoc2.Web.csproj"
COPY . .
WORKDIR "/src/nacos/EDoc2.Web"
RUN dotnet build "EDoc2.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EDoc2.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EDoc2.Web.dll"]