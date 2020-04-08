
function func(){
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].questions);
        console.log(data[i].description);
        console.log(data[i].id);
    }   
}
func();
console.log("text");


let x=document.createElement("option");
/**
 * La fonction créer des balises option avec certaines valeurs et elle l'affiche dans la page
 */
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




