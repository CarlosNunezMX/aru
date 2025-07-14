# How session tokens works
We have a sessionID, so we want to build a sessionToken from this
so we found 3 functions witch are executed for build a sessionToken
## Transform
  **Located in: **n[9988]->nc****
  **Argumets:** _sessionID: string_
  Converts sessionID to an moved string by a random generated number.
  
  ### Steps
    * Gets sessionID lenght and a random number to move the string
    * Build a magic number using formula **(n) => 122 - n + 1**
    * Declare a text variable (transformed sessionID)
    * Enter a loop with sessionID lenght iterations:
      * acc takes the value of sum of **char in sessionID at i - toMove** and **char in MAGIC_STR at i - toMove**
      * Using acc, build a string fromCharCode of (acc % magic) + toMove, add it to text variable
    * Return text + "~" (is a separator) + String.fromCharCode of toMove and repeat the text
