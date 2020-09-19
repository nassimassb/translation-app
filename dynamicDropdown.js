
// function func(){
//     console.log(data.length);
//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i].questions);
//         console.log(data[i].description);
//         console.log(data[i].id);
//     }   
// }
// func();
// console.log("text");

//adds the dropdown with needed elements
let x=document.createElement("option");


function liste(){
	let x;

    for(let i = 0; i<data.length; i++){
        x = document.createElement("option");
        x.value = i;
        x.id = data[i].id;
        x.innerHTML = data[i].description;
        document.getElementById("list").append(x);
    }
}

setTimeout(liste,2);




