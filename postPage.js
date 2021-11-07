document.addEventListener('DOMContentLoaded', function () {
  async function loadPagePost(id) {
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const data = await response.json();

    return data;
  }

  async function loadPageComments(id) {
    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    const data = await response.json();

    return data;
  }

  async function createPagePost() {
    const pageParams = new URLSearchParams(window.location.search);
    const pagePostId = pageParams.get('id');
    const dataPost = await loadPagePost(pagePostId);
    const dataComments = await loadPageComments(pagePostId);
    const pageTitle = document.createElement('h1');
    const pageContainer = document.createElement('div');
    const pageText = document.createElement('p');
    const pageCommentList = document.createElement('ul');
    const pageCommentListFirstItem = document.createElement('li');
    const pageCommentListTitle = document.createElement('h3');


    pageTitle.textContent = dataPost.data.title;
    pageTitle.classList.add('page-title')
    pageText.textContent = dataPost.data.body;
    pageText.classList.add('page-text');
    pageContainer.classList.add('container');
    pageCommentList.classList.add('page-comment-list');
    pageCommentListTitle.textContent = 'Комментарии:';
    pageCommentListTitle.classList.add('list-title');
    pageCommentListFirstItem.classList.add('list-title-item');

    pageCommentListFirstItem.append(pageCommentListTitle)
    pageCommentList.append(pageCommentListFirstItem);

    for(const comment of dataComments.data) {
      const pageCommentItem = document.createElement('li');
      const pageCommentCard = document.createElement('div');
      const pageCommentCardBody = document.createElement('div');
      const pageCommentFigure = document.createElement('figure');
      const pageCommentBlockquote = document.createElement('blockquote');
      const pageCommentText = document.createElement('p');
      const pageCommentFigcaption = document.createElement('figcaption');

      pageCommentText.textContent = comment.body;
      pageCommentText.classList.add('page-comment-text');
      pageCommentFigcaption.textContent = comment.name;
      pageCommentFigcaption.classList.add('blockquote-footer');
      pageCommentBlockquote.classList.add('blockquote');
      pageCommentItem.classList.add('page-comment-item');
      pageCommentCard.classList.add('card', 'card-comment');
      pageCommentCardBody.classList.add('card-body');
      pageCommentFigure.classList.add('page-comment-figure');

      pageCommentBlockquote.append(pageCommentText);
      pageCommentFigure.append(pageCommentBlockquote);
      pageCommentFigure.append(pageCommentFigcaption);
      pageCommentCardBody.append(pageCommentFigure);
      pageCommentCard.append(pageCommentCardBody);
      pageCommentItem.append(pageCommentCard);
      pageCommentList.append(pageCommentItem);
    }

    pageContainer.append(pageTitle);
    pageContainer.append(pageText);
    pageContainer.append(pageCommentList);
    document.body.append(pageContainer);
  }

  createPagePost();
})
