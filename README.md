# fluffy-penguins
`> npm install`
`> node index.js`
Serveren kjører nå på localhost:3002

Installer ngrok
`./ngrok http 3002 --host-header="localhost:3002"`

Du får nå en url type http://603b4ba1.ngrok.io som kan brukes i battle

For testing:
https://gist.github.com/caengen/ce2667241d26b210d77a0ab7e616d0f7


```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/index.js",
            "url": "localhost:3002"
        }
    ]
}
```
