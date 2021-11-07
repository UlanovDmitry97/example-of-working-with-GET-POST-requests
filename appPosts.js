document.addEventListener('DOMContentLoaded', function () {
  async function loadListPosts(id) {
    if (id >= 2) {
      const response = await fetch(`https://gorest.co.in/public-api/posts?page=${id}`);
      const data = await response.json();
      return data;
      }

    else {
      const response = await fetch('https://gorest.co.in/public-api/posts?page=1');
      const data = await response.json();
      return data;
    }
  }

  async function createPageListPosts() {
    const pageParams = new URLSearchParams(window.location.search);
    const pagePagId = pageParams.get('page');
    const container = document.querySelector('.container');
    const list = document.createElement('ul');
    const data = await loadListPosts(pagePagId);
    const nav = document.createElement('nav');
    const navList = document.createElement('ul');

    list.classList.add('list');
    navList.classList.add('pagination');

    const navItem = document.createElement('li');
    const navLink = document.createElement('a');

    navItem.classList.add('page-item');
    navLink.classList.add('page-link');
    navLink.textContent = 1;
    navLink.setAttribute('href', 'index.html');

    navItem.append(navLink);
    navList.append(navItem)


    for(const post of data.data) {
      const item = document.createElement('li');
      const card = document.createElement('div');
      const cardBody = document.createElement('div');
      const cardTitle = document.createElement('h4');
      const cardText = document.createElement('p');
      const buttonLink = document.createElement('a');

      item.classList.add('item');
      card.classList.add('card');
      cardBody.classList.add('card-body');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = post.title;
      cardText.classList.add('card-text');
      cardText.textContent = post.body;
      buttonLink.classList.add('btn', 'btn-primary');
      buttonLink.setAttribute('href', `post.html?id=${post.id}`);
      buttonLink.setAttribute('target', 'blank');
      buttonLink.textContent = 'Перейти';

      cardBody.append(cardTitle);
      cardBody.append(cardText);
      cardBody.append(buttonLink);
      card.append(cardBody);
      item.append(card);
      list.append(item);
    }

    for (let page = 2; page < data.meta.pagination.pages; page++) {
      const navItem = document.createElement('li');
      const navLink = document.createElement('a');

      navItem.classList.add('page-item');
      navLink.classList.add('page-link');
      navLink.textContent = page;
      navLink.setAttribute('href', `index.html?page=${page}`);

      navItem.append(navLink);
      navList.append(navItem);
    }

    container.append(list);
    nav.append(navList);
    container.append(nav);
  }

  createPageListPosts();
})
