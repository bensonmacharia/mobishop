# MobiShop

A mobile shopping application built on Flutter with a backend running on NodeJs, MySQL, Docker

## Getting Started

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Getting Set Up

### Backend and Frontend

Git clone the repo and then.

```bash
$ cd mobishop
$ cp .env.example .env # Edit the root folder .env file with your own values
$ cd frontend
$ cp .env.example .env # Edit the frontend .env file with your own values
$ cd ..
$ docker compose up -d
# Test the apis

```

### Flutter App

To get this running, git clone the repo and then.

```bash
$ cd mobishop/mobiapp
$ flutter packages get
$ flutter run

```
