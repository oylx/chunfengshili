// hash mode
window.onhashchange = () => {
  console.log(location.hash);
};
setTimeout(() => {
  location.hash = '/anotherhashtag';
}, 1000);

// HTML5 mode
// 触发机制 history.bask forward go
window.addEventListener('popstate', () => {
  console.log(window.location.pathname);
});


history.pushState({}, 'title', 'another.html');
history.replaceState({}, 'title', 'anotherpage.html');


