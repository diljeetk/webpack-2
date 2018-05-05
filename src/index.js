import './css/main.css';
import './scss/main.scss';
import {hello, sup} from './js/module';
import {welcome}from './js/welcome';

console.log("Webpack 2");
hello();
sup();
console.log("Hello from index.js");
console.log("watch files");
welcome();
console.log("watch files2");

