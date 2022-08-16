var MyDate = new Date,
MyHours = MyDate.getHours(),
elements = document.querySelector('.greeting'),
name = elements.innerHTML;
switch (true){
	case (MyHours >= 5) && (MyHours < 11):elements.innerHTML = 'Доброе утро, ' + name;
	break;
	case (MyHours >= 11) && (MyHours < 16):elements.innerHTML = 'Добрый день, ' + name;
	break;
	case (MyHours >= 16) && (MyHours <= 23):elements.innerHTML = 'Добрый вечер, ' + name;
	break;
	case (MyHours >= 0) && (MyHours < 5):elements.innerHTML = 'Доброй ночи, ' + name;
	break;
}

function setLocalStorage() {
    localStorage.setItem('name', input.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      input.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)