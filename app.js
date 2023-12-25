const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown=document.querySelectorAll(".select");
const button=document.querySelector(".btn");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".TO select");
const msg=document.querySelector(".msg");

console.log(dropdown)  ;

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "TO" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag =(element)=>{
    console.log(element);
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
button.addEventListener("click",async (e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    // console.log(amtval);
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()]
    console.log(rate);
    let final=amtval*rate;

    msg.innerText=`${amtval} ${fromcurr.value} = ${final} ${tocurr.value}`;
})



