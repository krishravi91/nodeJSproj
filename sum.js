// const sum = (a,b) => a+b;

// const num1 = process.argv[2];
// const num2 = process.argv[3];

// console.log(sum(10, 20));
// console.log(process.argv);

// console.log(num1);
// console.log(num2);

// const { fstat } = require("fs");
// const os = require("os");

// console.log("version", os.version());
// console.log("processor",os.cpus());

const fs = require("fs");
const data = "Nature is the God";

// fs.readFile("./msg.txt", "utf-8", (err,data) => {
//     console.log(data);

// });
// const [, ,num1] = process.argv;

// // for(let i=1;i<=num1;i++){

// // fs.writeFile(`./backup/Test-${i}.html`, data, (err) =>{
// //         console.log("Completed Writing", i);
// //     });
// // }

// // fs.writeFile("./msg.html", data, (err)=>{
// //     console.log("Complete Writing");
// // });

fs.readFile("./msg.txt", "utf-8", (err,data) => {
    console.log(data);
    fs.writeFile("./cool.html", data, (err)=>{
        console.log("Complete Writing");
    });
});

// const os = require('os');
// console.log("free Memory", os.freemem());
// console.log("total Memory", os.totalmem());
// console.log("version", os.version());
// console.log("processor", os.cpus());