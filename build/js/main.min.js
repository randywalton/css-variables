(function(){
  'use strict';

    const red_slider = document.getElementById('red_slider'),
          blue_slider = document.getElementById('blue_slider'),
          green_slider = document.getElementById('green_slider'),
          type_slider = document.getElementById('type_size'),
          site_width_slider = document.getElementById('site_width_slider');

    const grid_image = document.getElementById('grid_image'),
          grid_footer = document.getElementById('grid_footer'),
          grid_article01 = document.getElementById('grid_article01'),
          grid_article02 = document.getElementById('grid_article02'),
          gridControl_btn = document.getElementById('toggleGrid');


    const serif_btn = document.getElementById('serif'),
          sans_serif_btn = document.getElementById('sans_serif'),
          both_btn = document.getElementById('both'),
          radio_btn = document.getElementById('radio_btn');

    const root = document.documentElement;

    let styleValues = localStorage.getItem('typestyle');
    let neutraltype = localStorage.getItem('neutraltype');

    let slidersValues = [
      { storage: localStorage.getItem('red'), target: red_slider },
      { storage: localStorage.getItem('blue'), target: blue_slider },
      { storage: localStorage.getItem('green'), target: green_slider },
      { storage: localStorage.getItem('typesize'), target: type_slider },
      { storage: localStorage.getItem('siteWidth'), target: site_width_slider }
    ];

    const pageControl = (function() {

      let gridStatus = false;

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

          _checkSliderPos(red_slider.value, blue_slider.value, green_slider.value);
        }

        blue_slider.oninput = function() {
          let valueText = blue_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = blue_slider.value;
          root.style.setProperty('--site_base_blue', blue_slider.value);
          localStorage.setItem('blue', blue_slider.value);

          _checkSliderPos(red_slider.value, blue_slider.value, green_slider.value);

        }

        green_slider.oninput = function() {
          let valueText = green_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = green_slider.value;
          root.style.setProperty('--site_base_green', green_slider.value);
          localStorage.setItem('green', green_slider.value);

          _checkSliderPos(red_slider.value, blue_slider.value, green_slider.value);
        }

        type_slider.oninput = function() {
          let valueText = type_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = type_slider.value;
          root.style.setProperty('--type_base_size', type_slider.value+'px');
          localStorage.setItem('typesize', type_slider.value);
        }

        site_width_slider.oninput = function() {
          let valueText = site_width_slider.parentNode.getElementsByTagName('SPAN')[0].id;
          document.getElementById(valueText).innerHTML = site_width_slider.value;
          root.style.setProperty('--site_width', site_width_slider.value+'px');
          localStorage.setItem('siteWidth', site_width_slider.value);
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

        gridControl_btn.addEventListener("click", function(e) {
          e.preventDefault();

          if (!gridStatus) {
            grid_image.style.display = "block";
            grid_article01.style.display = "block";
            grid_article02.style.display = "block";
            grid_footer.style.display = "block";
            gridStatus = true;
            //console.log('on');
          } else {
            grid_image.style.display = "none";
            grid_article01.style.display = "none";
            grid_article02.style.display = "none";
            grid_footer.style.display = "none";
            gridStatus = false;
            //console.log('off');
          }

        });

      };


      let _checkSliderPos = function(red, blue, green) {
        //console.log(red +" - "+ blue +" - "+  green);
        if(red <= 125 && blue <= 125 && green <= 125) {
          root.style.setProperty('--text_on_color', 'white');
          localStorage.setItem('neutraltype', 'white');
        } else if(red >= 125 && blue >= 125 && green >= 125) {
          root.style.setProperty('--text_on_color', 'black');
          localStorage.setItem('neutraltype', 'black');
        }

      };

      let _loadSliderNumbers = function() {

        for (var key in slidersValues) {
          // console.log(objArray[key].target.id);
          // console.log(objArray[key].storage);
          if (slidersValues.hasOwnProperty(key)) {
            let target = slidersValues[key].target.id;
            document.getElementById(target).value = slidersValues[key].storage;
            document.getElementById(target).parentNode.getElementsByTagName('SPAN')[0].innerHTML = slidersValues[key].storage;
           }
        }
      };

      let _loadStorageValues = function() {

        root.style.setProperty('--site_base_red', slidersValues[0].storage);
        root.style.setProperty('--site_base_blue', slidersValues[1].storage);
        root.style.setProperty('--site_base_green', slidersValues[2].storage);
        root.style.setProperty('--type_base_size', slidersValues[3].storage+'px');

        root.style.setProperty('--text_on_color', neutraltype);
        root.style.setProperty('--site_width', slidersValues[4].storage+'px');


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
    pageControl.init();


    const gridControl = (function() {

      const maxCells = 9;

      let init = function() {
        _bindEvents();

      };

      let _bindEvents = function() {
        grid_image.addEventListener("click", function(e) {
          e.stopPropagation();
          // console.log(e.target.parentNode.parentNode.id);
          // console.log(e.target.parentNode.className);
          // console.log(e.target.className);
          let container = e.target.parentNode.parentNode.id;
          let position = e.target.parentNode.className;
          let action = e.target.className;
          _moveObject(container, position, action);

        });

        grid_article01.addEventListener("click", function(e) {
          e.stopPropagation();
          let container = e.target.parentNode.parentNode.id;
          let position = e.target.parentNode.className;
          let action = e.target.className;


          _moveObject(container, position, action);

        });

      };


      let _moveObject = function(container, position, action) {

        let target = '--'+container+'-'+position;
        let num = getComputedStyle(document.documentElement).getPropertyValue(target);

        console.log(target +' - '+ num);

        if (action==='pushtop' && num > 1) {
          //console.log('pushtop');
          root.style.setProperty(target, --num);
          updateItemInfo(container);
        } else if (action==='pushbottom' && num < maxCells) {
          //console.log('pushbottom');
          root.style.setProperty(target, ++num);
        } else if (action==='pushright' && num < maxCells) {
          //console.log('pushright');
          root.style.setProperty(target, ++num);
        } else if (action==='pushleft' && num > 1) {
          //console.log('pushleft');
          root.style.setProperty(target, --num);
        } else {
          console.log('at the edge!');
        }

        function updateItemInfo(target) {
          console.log(target);
          let itemText = document.getElementById(target);
          itemText.getElementsByClassName('item_info')[0].innerHTML = 'test';

        }

      };

      return {
          init: init
      };

    }());
    gridControl.init();


}());
