const buttons =  document.querySelectorAll('.header__menu-item');
const buttonsArea = document.querySelector('.header__menu');
const bodyBlock = document.querySelector('body');
buttonsArea.addEventListener('click', itemToggle);
   
function itemToggle(e) {
    const item = e.target;
    for (let button of buttons) {
        if (button != item) {
            button.classList.remove("active");
        }
    }
    item.classList.toggle("active");
     
    switch (item.classList[1]) {
            case 'item-winter':
                bodyBlock.className = 'winter';
                break;
            case 'item-spring':
                bodyBlock.className = 'spring';
                break;
            case 'item-summer':
                bodyBlock.className = 'summer';
                break;
            case 'item-autumn':
                bodyBlock.className = 'autumn';
                break;
            default:
          }
          if(!item.classList.contains('active')) {
            bodyBlock.className = 'classic';   
          }
    }