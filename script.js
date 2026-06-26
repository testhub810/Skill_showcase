const skills = [
{
    title:"熊谷 夏月",
    image:"images/kumagai.jpg"
},
{
    title:"酒井 拓己",
    image:"images/sakai.jpg"
},
{
    title:"藤間 勇行",
    image:"images/fujima.jpg"
},
{
    title:"岩井 美樹",
    image:"images/iwai.jpg"
}
];

let usedIndexes = [];

let gachaCount = 0;
const maxGacha = 4;

function gacha(){

    if(gachaCount >= maxGacha){
        return;
    }

    gachaCount++;

    document.getElementById("count").textContent =
        `残り回数：${maxGacha - gachaCount}回`;

    const card = document.getElementById("card");

    let count = 0;

    const animation = setInterval(() => {

        const random = Math.floor(Math.random() * skills.length);
        const skill = skills[random];

        card.innerHTML = `
            <h2>${skill.title}</h2>
            <img src="${skill.image}" class="profile-image">
        `;

        count++;

        if(count >= 20){

            clearInterval(animation);


            let candidates = [];

            for(let i = 0; i < skills.length; i++){
                if(!usedIndexes.includes(i)){
                    candidates.push(i);
                }
            }

            const finalRandom =
                candidates[Math.floor(Math.random() * candidates.length)];

            usedIndexes.push(finalRandom);
            const finalSkill = skills[finalRandom];

            card.innerHTML = `
                <h2>${finalSkill.title}</h2>
                <img src="${finalSkill.image}" class="profile-image">
            `;

            if(gachaCount < maxGacha){

                card.innerHTML += `
                    <button id="gachaButton" onclick="gacha()">
                        もう一度回す
                    </button>
                `;

            }else{

                card.innerHTML += `
                    
                    <button onclick="resetGacha()">
                        リセット
                    </button>
                `;  
            }

            card.classList.remove("result-animation");
            void card.offsetWidth;
            card.classList.add("result-animation");
        }

    },100);
}
function resetGacha(){

    gachaCount = 0;
    usedIndexes = [];

    document.getElementById("count").textContent =
        `残り回数：${maxGacha}回`;

    const card = document.getElementById("card");

    card.innerHTML = `
        <h2>？？？</h2>
        <p>ボタンを押してガチャを回そう！</p>

        <button onclick="gacha()">
            ガチャを回す
        </button>
    `;
}
