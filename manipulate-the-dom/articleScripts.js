const container = document.getElementsByClassName('container')[0];
container.style.display="none";
setTimeout(() => {container.style.display='' }, 2000);

const hulk = document.getElementsByClassName('col-md-4')[0];
const hulkCopy = hulk.cloneNode(true);

const lessImportant = document.getElementsByClassName('row')[0];
lessImportant.appendChild(hulkCopy);

const articles = document.getElementsByTagName('article');
articles[4].parentNode.insertBefore(articles[4], articles[1]);

for (let article of articles) {
  article.className = 'col-md-4';
}

const mostImportant = document.getElementsByClassName('masthead')[0];
const target = document.getElementById('banner');
const targetNodes = [...target.childNodes];
const toUpdate = targetNodes.filter((node) => node.tagName === 'P')[0];
const config = { childList: true };

const buttonHandler = (mutations, observer) => {
  for (let m of mutations) {
    if (m.type === 'childList') {
      toUpdate.textContent = 'This copy has been amended.';
    }
  }

  const button = document.getElementsByClassName('button')[0];
  let clicked = false;
  const handleClick = () => {
    return clicked ? closeOverlay() : displayOverlay();
  };
  const displayOverlay = () => {
    let overlay = target.cloneNode(true);
    overlay.removeChild(overlay.lastChild);
    overlay.className = 'overlay';
    mostImportant.appendChild(overlay);
    clicked = true;
  };
  const closeOverlay = () => {
    mostImportant.removeChild(mostImportant.lastChild);
    clicked = false;
  };

  button.addEventListener('click', handleClick, false);
};

const observer = new MutationObserver(buttonHandler);
observer.observe(target, config);
setTimeout(() => observer.disconnect(), 7000);
