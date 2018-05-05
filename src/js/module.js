function hello(){
    console.log("Hello from JS module");
}

function sup(){
    console.log("Hello from JS sup from module.js checking automatic reloading");
}

export {hello, sup}