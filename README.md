Zululami Eco Resort

A modern, responsive web application for Zululami Eco Resort built with Kotlin and contemporary web tooling to provide an exceptional user experience.

🏨 Project Overview

Zululami Eco Resort is a contemporary web application designed with performance, scalability, and user-friendly design at its core. It leverages Kotlin for server- and/or client-side logic and follows industry best practices to ensure smooth development and easy maintenance.

🚀 Features

Modern Design: Clean, responsive layout optimized for all devices

Fast Performance: Lightweight, idiomatic Kotlin server (Ktor) for efficient request handling

Type Safety: Full Kotlin + kotlinx.serialization for robust, compile-time safety

Beautiful UI: Tailwind CSS (optional) for consistent styling and fast layout work

User-Friendly: Intuitive navigation and booking experience

Production-ready: Gradle build, Docker-friendly, and database migrations supported

🛠️ Technologies Used

Kotlin — Primary language for backend (and optional frontend)

Ktor — Kotlin asynchronous web framework for API and server

Gradle (Kotlin DSL) — Build and dependency management

kotlinx.serialization — JSON serialization

Exposed / Hibernate / JPA — (pick one) database access layer

Flyway — Database migrations

Tailwind CSS — Styling (optional; can be replaced by any CSS approach)

PostgreSQL — Recommended production database

Docker & Docker Compose — Containerized development & production

Note: TypeScript, React, and Vite have been removed from this project because the team decided to use Kotlin for application logic.

📥 Installation & Setup
Prerequisites

Before you begin, ensure you have the following installed:

JDK 17 or later (Kotlin + Ktor are tested on JDK 17+)

Git

Docker & Docker Compose (optional but recommended for local stack)

(Optional) Node.js + npm — only required if you want to build Tailwind locally or use a node-based CSS toolchain

IntelliJ IDEA (Community or Ultimate) — recommended for Kotlin development

This repo uses the Gradle wrapper (./gradlew) so you don't need a separate Gradle install.
