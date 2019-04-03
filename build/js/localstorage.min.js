
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

if (storageAvailable('localStorage')) {
  //localStorage.clear();

  if (!localStorage.getItem('red')) {

    localStorage.setItem('red', '0');
    localStorage.setItem('blue', '0');
    localStorage.setItem('green', '0');
    localStorage.setItem('typesize', '16');
    localStorage.setItem('typestyle', 'serif');
    localStorage.setItem('neutraltype', 'white');

    console.log('nothing set yet');
  } else {
    console.log('var set');
  }

} else {
  console.log('NO local storage!');
}
