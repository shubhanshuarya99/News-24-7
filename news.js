const API_KEY="78b3bf4113e749f7bb1a0464496efa3e";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));//to fetch india news
// Assuming that the logo anchor has an ID of 'logo'
const logo = document.getElementById('logo');

if (logo) {
    logo.addEventListener('click', () => {
        location.reload();
    });
}

async function fetchNews(query){
    //preomise return by fetch so to wait fetch is async operation
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data=await res.json();
    //to bind data
    bindData(data.articles);
}
    //bind mtlb jitne articles h utne temp banane h
    function bindData(articles){
   const cardsContainer=document.getElementById('cards-container');
   const NewsCardTemplate=document.getElementById('template-news');

   cardsContainer.innerHTML='';
   articles.forEach(article=>{
    if(!article.urlToImage)return;
        const cardClone=NewsCardTemplate.content.cloneNode(true);
        //mtlb har chij clone ho jae
        //ab clone ko container me dalna hai
        filldataIncard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    
   });
    }
    function filldataIncard(cardClone,article){
        const newsImg=cardClone.querySelector('#news-img');
        const newsTitle=cardClone.querySelector('#news-title');
        const newsSource=cardClone.querySelector('#news-source');
        const newsDesc=cardClone.querySelector('#news-desc');

        //news img ke anadr source dalan h
        newsImg.src=article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;
        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        })
  newsSource.innerHTML=`${article.source.name}.${date}`;
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
  })
    }
    let curSelectedNav=null;
    function onNavItemClick(id){
 fetchNews(id);
 const navItem=document.getElementById(id);
 //mtlb curr selected nav nulll nahi h tabhi activ class remove
 curSelectedNav?.classList.remove("active");
 curSelectedNav=navItem;
 curSelectedNav.classList.add('active');
    }
    const searchButton=document.getElementById("search-button");
    const searchText=document.getElementById("search-text");
    searchButton.addEventListener('click',()=>{
        const query=searchText.value;
        if(!query)return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
    });
    
