(function(){
  'use strict';

    const red_slider = document.getElementById('red_slider'),
          blue_slider = document.getElementById('blue_slider'),
          green_slider = document.getElementById('green_slider'),
          type_slider = document.getElementById('type_size');

    const pageControl = document.getElementById('page_control');

    const serif_btn = document.getElementById('serif'),
          sans_serif_btn = document.getElementById('sans_serif'),
          both_btn = document.getElementById('both'),
          radio_btn = document.getElementById('radio_btn');

    let root = document.documentElement;

    // let red = localStorage.getItem('red');
    // let blue = localStorage.getItem('blue');
    // let green = localStorage.getItem('green');
    // let typesize = localStorage.getItem('typesize');
    // let typestyle = localStorage.getItem('typestyle');

    // let storageValues = [
    //   localStorage.getItem('red'),
    //   localStorage.getItem('blue'),
    //   localStorage.getItem('green'),
    //   localStorage.getItem('typesize'),
    //   localStorage.getItem('typestyle')
    // ];

    let styleValues = localStorage.getItem('typestyle');

    let slidersValues = [
      { storage: localStorage.getItem('red'), target: red_slider },
      { storage: localStorage.getItem('blue'), target: blue_slider },
      { storage: localStorage.getItem('green'), target: green_slider },
      { storage: localStorage.getItem('typesize'), target: type_slider }
    ];

    const colourSlider = (function() {

      let init = function() {
        _bindEvents();
        _loadSliderNumbers();
        _loadStorageValues();
      };

      let _bindEvents = function() {

        red_slider.oninput = function() {
          let valueText = red_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = red_slider.value;
          root.style.setProperty('--site_base_red', red_slider.value);
          localStorage.setItem('red', red_slider.value);
        }

        blue_slider.oninput = function() {
          let valueText = blue_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = blue_slider.value;
          root.style.setProperty('--site_base_blue', blue_slider.value);
          localStorage.setItem('blue', blue_slider.value);
        }

        green_slider.oninput = function() {
          let valueText = green_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = green_slider.value;
          root.style.setProperty('--site_base_green', green_slider.value);
          localStorage.setItem('green', green_slider.value);
        }

        type_slider.oninput = function() {
          let valueText = type_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = type_slider.value;
          root.style.setProperty('--type_base_size', type_slider.value+'px');
          localStorage.setItem('typesize', type_slider.value);
        }

        serif_btn.addEventListener("click", function(e) {
          e.stopPropagation();
          root.style.setProperty('--type_base_header', 'Vollkorn, serif');
          root.style.setProperty('--type_base_copy', 'Vollkorn, serif');
          localStorage.setItem('typestyle', 'serif');
        });

        sans_serif_btn.addEventListener("click", function(e) {
          e.stopPropagation();
          root.style.setProperty('--type_base_header', 'Source Sans Pro, sans-serif');
          root.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
          localStorage.setItem('typestyle', 'sans-serif');
        });

        both_btn.addEventListener("click", function(e) {
          e.stopPropagation();
          root.style.setProperty('--type_base_header', 'Vollkorn, serif');
          root.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
          localStorage.setItem('typestyle', 'both');
        });

      };

      let _loadSliderNumbers = function() {

        for (var key in slidersValues) {
          // console.log(objArray[key].target.id);
          // console.log(objArray[key].storage);
          let target = slidersValues[key].target.id;
          document.getElementById(target).value = slidersValues[key].storage;
          document.getElementById(target).parentNode.getElementsByTagName('SPAN')[0].innerHTML = slidersValues[key].storage;
        }
      };

      let _loadStorageValues = function() {

        root.style.setProperty('--site_base_red', slidersValues[0].storage);
        root.style.setProperty('--site_base_blue', slidersValues[1].storage);
        root.style.setProperty('--site_base_green', slidersValues[2].storage);
        root.style.setProperty('--type_base_size', slidersValues[3].storage+'px');


        if (styleValues === 'serif') {
          radio_btn.getElementsByTagName('INPUT')[0].checked = true;
          root.style.setProperty('--type_base_header', 'Vollkorn, serif');
          root.style.setProperty('--type_base_copy', 'Vollkorn, serif');
        } else if (styleValues === 'sans-serif') {
          radio_btn.getElementsByTagName('INPUT')[1].checked = true;
          root.style.setProperty('--type_base_header', 'Source Sans Pro, sans-serif');
          root.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
        } else {
          radio_btn.getElementsByTagName('INPUT')[2].checked = true;
          root.style.setProperty('--type_base_header', 'Vollkorn, serif');
          root.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
        }


      };

      return {
          init: init
      };

    }());
    colourSlider.init();

    // var red_slider = document.getElementById("red_slider");
    // var red_value = document.getElementById("red_value");
    // red_value.innerHTML = red_slider.value;
    //
    // red_slider.oninput = function() {
    //   red_value.innerHTML = this.value;
    // }

}());
