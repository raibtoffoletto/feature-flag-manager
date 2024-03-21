# Feature Flag Manager [![All Tests](https://github.com/raibtoffoletto/feature-flag-manager/actions/workflows/run-tests.yml/badge.svg)](https://github.com/raibtoffoletto/feature-flag-manager/actions/workflows/run-tests.yml)

> This is a proof of concept for a multi tenant `key/value` flag manager in a multi environment set up.

## Description

The aim is to control all possible configurations for flags in your application at one place, and easily set them up (add/remove/change) across environments and tenants. This project uses `Vite`, `React` and `MaterialUI` for its modern interface and `MSW` to mock api calls. All data is saved locally and persists across page refreshes.

#### You can access a demo here: [https://feature-flag-manager-olive.vercel.app](https://feature-flag-manager-olive.vercel.app)
