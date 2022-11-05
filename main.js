let lest = document.querySelector(".list");
let temps =  document.querySelector(".poke-temp").content

// FORMA
const elFormSearch = document.querySelector(".search-form");
const elFormInput = document.querySelector(".form-control");
const elSelect = document.querySelector(".select");
const elSelectOPtion = document.querySelector(".options");
const elSelectSort = document.querySelector(".selct-sort");
const elpokiCountTo = document.querySelector(".candy-to");
const elpokiCountEnd = document.querySelector(".candy-end");

let fragment = document.createDocumentFragment()

function maniFunc(item, regex = ""){
    lest.innerHTML = "";
    
    item.forEach(elemnt=> {
        // let temp = document.querySelector(".poke-temp").content.cloneNode(true);
        let temp = temps.cloneNode(true)
        temp.querySelector(".img").src = elemnt.img;
        temp.querySelector(".img").alt = elemnt.name;

        if(regex.source != "(?:)" && regex){
            temp.querySelector(".title").innerHTML = elemnt.name.replace(regex,
                `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
            }else{
                temp.querySelector(".title").textContent = elemnt.name;
            }
            temp.querySelector(".time").textContent = elemnt.spawn_time;
            temp.querySelector(".candy-count").textContent = elemnt.candy_count;
            temp.querySelector(".weks").textContent = elemnt.weaknesses.join(", ");
            temp.querySelector(".weight").textContent = elemnt.weight;
            fragment.appendChild(temp)
        })
        lest.appendChild(fragment)
    }
    
    // SELECT
    const arrSelect = [];
    
    pokemons.forEach((item)=> {
        item.weaknesses.forEach((el) =>{
            if(! arrSelect.includes(el)){
                arrSelect.push(el)
            }
        })
    })
    
    // SORT
    function mainSortFunc(arr,value){
        if(value === "a-z"){
            arr.sort((a,b) =>{
                if(a.name < b.name){
                    return -1
                } else if(a.name > b.name){
                    return 1
                }
                return 0
            })
        }
        if(value === "z-a"){
            arr.sort((a,b) =>{
                if(a.name < b.name){
                    return 1
                } else if(a.name > b.name){
                    return -1
                }
                return 0
            })
        }
        
        if(value == "weight"){
            arr.sort((a,b) =>{
                return parseFloat(a.weight) - parseFloat(b.weight);
            })
        }
        
        if(value == "slight"){
            arr.sort((a,b) =>{
                return parseFloat(b.weight) - parseFloat(a.weight);
            })
        }
    }
    
    const selctFragment = document.createDocumentFragment();
    
    arrSelect.forEach((item) =>{
        const options = document.createElement("option");
        options.textContent = item
        options.value = item
        selctFragment.appendChild(options)
    })
    elSelect.appendChild(selctFragment);
    
    elFormSearch.addEventListener("submit", (evt) =>{
        evt.preventDefault();
        
        const inputValue = elFormInput.value.trim();
        const selcSortValue = elSelectSort.value;
        
        
        mainSortFunc(pokemons,selcSortValue)
        
        const regEXsearch = new RegExp(inputValue, "gi");
        
        const formSearch = pokemons.filter(item =>   {
            const pokimonSearch =  (String(item.name).match(regEXsearch) && item.weaknesses.includes(elSelect.value) || (String(item.name).match(regEXsearch) && elSelect.value == "all") && ((item.candy_count >= elpokiCountTo.value || elpokiCountTo.value == "") && (item.candy_count <= elpokiCountEnd.value || elpokiCountEnd.value == "")))
            return pokimonSearch
        })
        if(formSearch.length > 0){
            maniFunc(formSearch, regEXsearch)
        }else{
            lest.innerHTML = "Bunday qiymat yuq"
        }
    })
    maniFunc(pokemons)
    
    
    