// hash mode
window.onhashchange = () => {
  console.log(location.hash);
};
setTimeout(() => {
  location.hash = '/anotherhashtag';
}, 1000);

// HTML5 mode
// 触发机制 history.back/forward/go
window.addEventListener('popstate', () => {
  console.log(window.location.pathname);
});

// 这2种方法不会触发popstate方法
history.pushState({}, 'title', 'another.html');
history.replaceState({}, 'title', 'anotherpage.html');


