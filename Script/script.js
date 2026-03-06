const createElements =(arr) =>{
    const createHtmlElements =arr.map((el) => `<span class="btn bg-[#1A91FF40] text-[13px]" > ${el}</span> `);
    return(createHtmlElements.join(""));
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("level-Word-container").classList.add("hidden");
  }else{
    document.getElementById("level-Word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}


const levelData = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => levelDataLoad(json.data));
}

const removeExit = () =>{
 const lessonAllBtn = document.querySelectorAll(".lesson-buttons")

 lessonAllBtn.forEach((btn)=> btn.classList.remove("active"))
}

const loadLevelWord = (id) =>{
   manageSpinner(true) 
    const url= `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeExit()
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    });
    
}

const loadWordDetail = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res= await fetch(url);
  const detail = await res.json();
  displayWordDetails(detail.data);
}

const displayWordDetails = (word) => {
  const detailBox = document.getElementById("detail-container")
  detailBox.innerHTML= `<div>
        <h1 class="font-semibold text-3xl mb-8">${word.word} (<span><i class="fa-solid fa-microphone-lines"></i></span>:${word.pronunciation})</h1>
      </div>
      <div>
        <h4 class="font-semibold text-[20px] mb-2">Meaning</h4>
        <p class="font-bangla font-medium text-[20px] mb-8">${word.meaning}</p>
      </div>
      <div>
        <h4 class="font-semibold text-[20px] mb-2">Example</h4>
        <p class="text-[16px] text-[#000000b6] mb-8">${word.sentence}</p>
      </div>
      <div>
        <h4 class="font-bangla font-medium text-[20px] mb-2">সমার্থক শব্দ গুলো</h4>
        <div class = "">${createElements(word.synonyms)}</div>
        
      </div>`;
  document.getElementById("word_modal").showModal()
}

const displayLevelWord = (words) =>{
  const levelWordContainer = document.getElementById("level-Word-container")

  levelWordContainer.innerHTML = "";

  if(words.length == 0){
    levelWordContainer.innerHTML =`
    <div class="text-center col-span-full py-16 items-center justify-items-center space-y-4 py-16">
      <img src="./assets/alert-error.png" alt="">
      <p class="font-bangla text-[#79716B] text-[15px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="font-bangla text-[#292524] text-4xl font-medium">নেক্সট Lesson এ যান</h1>
    </div>`
  }

  words.forEach(word => {
        console.log(word);
        const card = document.createElement('div')
        card.innerHTML =` 
        <div id="card-style" class="py-1">
      <h1 class="font-bold text-3xl mb-5 ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
      <p class="text-2xl font-medium mb-5">Meaning /Pronounciation</p>
      <div class="font-semibold text-3xl text-[#3a3a3b] font-bangla mb-15">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"</div>
      <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] border-none py-6 px-4 hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF20] border-none py-6 px-4 hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
    </div>
    `

        levelWordContainer.append(card)
    });

    manageSpinner(false)
}


const levelDataLoad = (lessons)=>{
    
    const levelContainer = document.getElementById("level-container");

    levelContainer.innerHTML = "";

    for( const lesson of lessons){

        console.log(lesson);
        const btnDiv = document.createElement('div')
    
        btnDiv.innerHTML=` <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary lesson-buttons">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`

        levelContainer.append(btnDiv)
    }
}
levelData()


document.getElementById("btn-search").addEventListener("click" , () => {
  removeExit();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res) => res.json())
  .then((data) =>{
    const allWord = data.data;
    console.log(allWord);
    const filterWord = allWord.filter(word=>word.word.toLowerCase().includes(searchValue));
    displayLevelWord(filterWord);
  })
  
});


const items = document.querySelectorAll(".faq-item");

items.forEach(item => {

const question = item.querySelector(".question");
const answer = item.querySelector(".answer");
const icon = item.querySelector(".icon");

question.addEventListener("click", () => {

items.forEach(el => {
if(el !== item){
el.querySelector(".answer").style.maxHeight = null;
el.querySelector(".icon").classList.remove("rotate-180");
}
});

if(answer.style.maxHeight){
answer.style.maxHeight = null;
icon.classList.remove("rotate-180");
}else{
answer.style.maxHeight = answer.scrollHeight + "px";
icon.classList.add("rotate-180");
}

});

});



