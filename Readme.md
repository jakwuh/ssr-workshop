# ssr-workshop

## Prerequisites

#### `node@10.7.0`

1. Install [nvm](https://github.com/creationix/nvm#install-script)
2. Enable nvm:
    ```bash
    > source ~/.nvm/nvm.sh
    ```
3. Install node:
    ```bash
    > nvm install 10.7.0
    > nvm use 10.7.0
    > node -v
    v10.7.0
    ```

## Steps

1. Simple SPA application   
2. Simple SSR application  
2.1. `Critical dependency: the request of a dependency is an expression`  
2.2. `ReferenceError: regeneratorRuntime is not defined`  
2.3. Render empty document
2.4. Serve statics
2.5. Proxy API
2.6. Watching for changes on server side

## Additional
2.1 [SSR Workshop build time comparison](https://gist.github.com/jakwuh/6638344023ea17a1863a899dacdf686c)  
2.2 [webpack `node` configuration size comparison](https://gist.github.com/jakwuh/cb157f8dd5739006737e897e28b29707) 
