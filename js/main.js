function position() {
    var fullH = window.innerHeight;
    var posh = document.querySelector('#section-contact [class=container]').offsetTop;
    var posw = document.querySelector('#section-contact ul').offsetLeft;
    var elem = document.querySelector('#news');

    var height = (posh / fullH) * 100;

    elem.style.top = height + 10 + 'vh';
    elem.style.left = posw + 'px';
    elem.style.right = posw + 'px';
    elem.style.bottom = ((height - 2) * -1) + 'vh';
}
document.querySelector('input').focus();