# Segs WebUI

## Introduction

This is the start of a Web-UI for [SEGS (Super Entity Game Server)](https://segs.io).

- [SEGS Github Repository](https://github.com/Segs/Segs)
- [SEGS WebUI Github Repository](https://github.com/Segs/WebUI)

See docs/README.md for more information.

**IMPORTANT** Please consider running this over HTTPS, as passwords are sent unencrypted.

## Requirements

* SEGS WebUI utilizes composer to install dependency modules. For information on installing and 
using composer, visit https://getcomposer.org.

## SEGS WebUI Installation

1. Download or clone to directory of your choice.
2. Set the document root of your web server to `<installation_directory>/public`
3. Configure settings as described in the [Configuration](#configuration) section.
4. Run `composer update` in installation directory to install required dependencies.

## Configuration

For initial configuration, copy the file `config/example_config.php` to `config/config.php` and edit
any necessary settings.

## Known Issues

Many, many, **many** issues. Among them:

- Extraneous code
- Not all actions return result to user



"The journey of a thousand miles, begins with that first step."
