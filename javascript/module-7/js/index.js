'use strict'
/*1. Модифицируйте готовую функцию createPostCard() из задания 
номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
чтобы она принимала объект post с данными для заполнения полей 
в карточке.
  
2. Создайте функцию createCards(posts), которая принимает массив
объектов-карточек, вызывает функцию createPostCard(post) столько
раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
массив DOM-элементов всех постов.

3. Повесьте все посты в какой-то уже существующий DOM-узел.*/
const posts = [
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-1.com'
    },
    {
      img: "https://placeimg.com/400/150/nature",
      title: "Post title 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-2.com'
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: 'link-3.com'
    }
  ];
  //function  createCards(posts)
  const main = document.querySelector('body');
  
  const allPosts = [];

  function createCards(posts){
      posts.forEach(el => {
        const pos = createPostCard(el);
          allPosts.push(pos);
      }); return allPosts;
  }

  
  function createPostCard(el){
   const post = document.createElement('div');
   post.classList.add('post');

   const image = document.createElement('img');
   image.classList.add('post__image');
   image.setAttribute('alt' , 'post__image');
   image.setAttribute('src', el.img);

   const title = document.createElement('h2');
   title.classList.add('post__title');
   title.textContent = el.title;

   const text = document.createElement('p');
   text.classList.add('post__text');
   text.textContent = el.text;

   const button = document.createElement('a');
   button.classList.add('button');
   button.textContent = 'Read more';
   button.setAttribute('href', el.link);

   post.append(image, title, text, button);
   return post;
}
createCards(posts);
main.append(...allPosts);
  