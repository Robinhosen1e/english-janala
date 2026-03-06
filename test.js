const createElements =(arr) =>{
    const createHtmlElements =arr.map((el) => `<span class="btn bg-[#1A91FF40] text-[13px]" > ${el}</span> `);
    console.log(createHtmlElements);
}

const array = ["hi" , "by" , "buy"]
createElements(array)