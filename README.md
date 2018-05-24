![Presentacion de CLI Hosty](https://firebasestorage.googleapis.com/v0/b/myweb-19046.appspot.com/o/Presentacion%20para%20GITHUB.png?alt=media&token=d04d0ecd-ecd8-4186-8de9-805946d57850)

# Hosty - Generator Virtual Server

It is a Command Line Interface Application (CLI) that creates virtual servers for [xampp](https://www.apachefriends.org/en/index.html "xampp")

What is XAMPP? XAMPP is a development environment with PHP. XAMPP is a completely free and easy to install Apache distribution that contains MariaDB, PHP and Perl. The XAMPP installation package has been designed to be incredibly easy to install and use.

What is Hosty? Hosty is a command line application built in node.js, you will need to install both xampp and nodejs to be able to use this application

## Installation
We will need to install the package from the npm dependency distributor globally

```js
$ npm install -g virtualhosty
```
## Usage
Please run Git BASH with Admin rights if you need Admin rights to access specific folders.

## Commands and rules
Hosty manages a registry where all your projects and preferences will be stored locally, it is a file that is generated after starting the basic configuration called config.json

### Setting up Hosty for the first time
If you installed xampp with the default parameters, the hosty configuration will take those parameters and use them to configure the virtualhost, the program will understand the version of the operating system that you are using and where possibly all the dependencies that we need, for that you must enter the command:

```js
$ hosty -config --default
```

### Create the first virtual server
By default the first virtual host will be **localhost**, now that we know that we will create our first project with the command:

```js
$ hosty -c 'name' 'url' 'folder'
```

The program handles * conditions * to avoid errors, that is why the fields of this command are obligatory, we explain to you. To create a virtual server at least we need a **name**, a **url** and a **folder** where your project will be.

The name of the project can be of your preference, if you have more than one word you should use simple quotes for example `$hosty -c 'My Great Project'`

The url of the project must end or have the suffix .dev to be valid but if you do not have it, do not worry it will be added automatically. `$hosty -c 'My Great Project' mygreatproject.dev`, remember that there should be no spaces or complex signs.

It is important to remember that we are working on the default folder of xampp in the case of windows would be C: / xampp / htdocs / then by entering the command `$hosty -c 'My Great Project' mygreatproject.dev mygreatproject` the place where it will be created the project will remain this way C: / xampp / htdocs / mygreatproject.

If you are working with an API for example Laravel you need to point the virtualhost to the public directory is as easy as adding / public to the directory where you point your project, for example `$hosty -c 'My Laravel API' api.laravel.dev laravelapi / public `

### Update the host
This command is only for when there is the possibility of wanting to edit the file config.json on your own, this file contains your preferences and projects listed for use in Hosty. You can use:

```js
$ hosty -u 
//or 
$ hosty -update
```

### List the projects
This command is fundamental to eliminate and edit projects, basically it makes a list of registered projects with an index which you must choose to do some other operation.

```js
$ hosty -l 
//or 
$ hosty -list
```
Departure:
```js
$ 0 <- Project Cero
$ 1 <- Project One
$ 2 <- Project Two
```

### Edit a project

In case you want to update the information of a project you must use the command and the index of the project, to know what the index uses `-l` or `-list`

```js
$ hosty -e 'name' 'url' 'folder' 'INDEX'
```

### Delete a project

In case you want to delete the information of a project you must use the command and the index of the project, to know what the index uses `-l` or `-list`, the directory where the project is

```js
$ hosty -d 'INDEX'
```

### Settings or preferences

Before we had seen the command to configure the default environment but in case you want to change any of the usual preferences, here is the list of options


```js
$ hosty -config xampp_apache_port 'Example:3000'
$ hosty -config conf_file 'path'
$ hosty -config hosts_ip_address 'Example:127.0.0.1'
$ hosty -config hosts_directory 'Example:C:/Windows/System64/drivers/etc/hosts'
$ hosty -config xampp_files_directory 'Example: C:/wonderland/'
$ hosty -config xampp_vhost_directory 'Example: C:/apache/conf/extra/httpd-vhosts.conf'
```
