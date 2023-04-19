//1
async function fetchData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = ` 
        <ul>
            ${Object.keys(breedList).map(function (breed){
        return `<li>${breed}</li>`
    }).join('')}
        </ul>
`;
}
// fetchData();

//2
async function displayBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    const breedsDiv = document.getElementById("breed");

    for (const breed in data.message) {
        const breedHeading = document.createElement("h3");
        breedHeading.innerText = breed;
        breedsDiv.appendChild(breedHeading);

        if (data.message[breed].length > 0) {
            const subBreedsList = document.createElement("ul");
            for (const subBreed of data.message[breed]) {
                const subBreedItem = document.createElement("li");
                subBreedItem.innerText = subBreed;
                subBreedsList.appendChild(subBreedItem);
            }
            breedsDiv.appendChild(subBreedsList);
        } else {
            const noSubBreeds = document.createElement("p");
            noSubBreeds.innerText = "No sub-breeds";
            breedsDiv.appendChild(noSubBreeds);
        }
    }
}
// displayBreeds();

//3
async function filterData(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    const breedsArray = Object.keys(data.message).map((breed) => {
        return {
            name: breed,
            subBreeds: data.message[breed],
        };
    });

    const filteredBreeds = breedsArray.filter((breed) => breed.subBreeds.length > 0);
    const breedsDiv = document.getElementById("breed");

    for (const breed of filteredBreeds) {
        const breedHeading = document.createElement("h3");
        breedHeading.innerText = breed.name;
        breedsDiv.appendChild(breedHeading);

        const subBreedsList = document.createElement("ul");
        for (const subBreed of breed.subBreeds) {
            const subBreedItem = document.createElement("li");
            subBreedItem.innerText = subBreed;
            subBreedsList.appendChild(subBreedItem);
        }
        breedsDiv.appendChild(subBreedsList);
    }

    // const response = await fetch("https://dog.ceo/api/breeds/list/all");
    // const data = await response.json();
    // const breedsDiv = document.getElementById("breed");
    //
    // for (const breed in data.message){
    //     if (data.message[breed].length > 0) {
    //         const subBreedsList = document.createElement("ul");
    //         for (const subBreed of data.message[breed]) {
    //             const subBreedItem = document.createElement("li");
    //             subBreedItem.innerText = subBreed;
    //             subBreedsList.appendChild(subBreedItem);
    //         }
    //         breedsDiv.appendChild(subBreedsList);
    //     }
    // }

}
//filterData()

async function mapData(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breedsArray = Object.keys(data.message).map((breed) => {
        return {
            name: breed,
            subBreeds: data.message[breed],
        };
    });
    //console.log(breedsArray);
    const filteredBreeds = breedsArray.filter((breed) => breed.name.length < 5 || breed.name.length > 8 );
    const filteredNames = filteredBreeds.map((breed) => breed.name);
    const breedsDiv = document.getElementById("breed");

    for (const breed of filteredNames) {
        const breedHeading = document.createElement("h3");
        breedHeading.innerText = breed;
        breedsDiv.appendChild(breedHeading);
    }
}
//mapData()

//5
async function reduceData(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breedsArray = Object.keys(data.message).reduce((acc, cur) => {
        const subBreeds = data.message[cur];
        let totalSubBreeds = 0;
        if (subBreeds && subBreeds.length > 0) { // hibaellenőrzés az üres stringre
            totalSubBreeds = subBreeds.split(" ").length;
        }
        return acc + totalSubBreeds;
    }, 0);
    console.log(breedsArray); // összes alkategória száma


}
reduceData()

//6
async function indexData(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breedsArray = Object.keys(data.message).map((breed) => {
        return {
            name: breed,
            subBreeds: data.message[breed],
        };
    });
    const index = breedsArray.findIndex((breed) => breed.name.length < 5 || breed.name.length > 8);
    const breedsDiv = document.getElementById("breed");
    const breedHeading = document.createElement("h3");
    breedHeading.innerText = breedsArray[index].name;
    breedsDiv.appendChild(breedHeading);
}
//indexData()