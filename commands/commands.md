# COMMANDS

## Commands are created as a new Discord Collection

_the map type_
Each commands are identify by a unique key : is name.
His execute function is content in an object
with some other usefull {key: value} pair for controll and informations about it

**File Commands are Objects modules export dynamicaly**

_-by the readdir function from the **FileSystem** module of nodeJs-_

#### Each commands has keys :

- name
  _with content the name of the command & the command it-self & the title of the file_
- description
  _short description about the command purpose_
- execute
  the allocated function for the command

#### Keys about command's arguments :

- args
  <value>: true | number of arguments
- usage
  required arguments and if many their orders

#### Some other usefull keys :

- guildOnly
  _not available outside of servers_
- cooldown
  time in second to wait before using again this command _prevent Spam_
  The control is provided by the cooldowns Collection
