# DMS - Dormitory Management System
[![Build Status](https://travis-ci.com/gerpo/DMS.svg?branch=master)](https://travis-ci.com/gerpo/DMS)

Table of Contents

- [DMS - Dormitory Management System](#dms---dormitory-management-system)
    - [Introduction](#introduction)
    - [System](#system)
    - [Basic Functionality](#basic-functionality)

## Introduction

DMS is a [Laravel](https://github.com/laravel/laravel) based extendable management system for dormitories. It provides basic functionalities to manage tenants and roles. It can also be used as a base for a [Laravel](https://github.com/laravel/laravel) application that needs user and roles management.

It can easily be extended through composer packages, so that it only provides functions that are useful for your specific situation. DMS is not supposed to be a complete solution for every possible situation but more a base to build upon and a hub for extensions that fit your needs.

## System

DMS is build with [Laravel](https://github.com/laravel/laravel), so you can use all the possibilities that come with [Laravel](https://github.com/laravel/laravel) to customize and/or extend the application.

[Vue.js](https://github.com/vuejs/vue) is utilized for frontend components in order to provide reusable components and a nice user experience.

The Role and Permission system is created with the [Bouncer](https://github.com/JosephSilber/bouncer) package, which allows a easy and fine grained control for authorization.

Easy plugin management is provided by the Plugisto packages. It allows the extension of functionality through composer packages.

## Basic Functionality

DMS provides following functions that we think are always needed:

- Login-System with email verification.
- Role and permission system for user groups.
- Mail system in order to allow a easy way to write emails to tenants.
- Control for the plugin system to switch on and off specific extensions through the web interface.
- Full support for multiple languages. All user facing string are within language files and therefore can be easily translated.

As all the functions are very basic, they can, without much effort, be customized and changed so that they fit your needs.
