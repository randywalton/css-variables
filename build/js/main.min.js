(function(){
  'use strict';

    const red_slider = document.getElementById('red_slider'),
          blue_slider = document.getElementById('blue_slider'),
          green_slider = document.getElementById('green_slider'),
          size_slider = document.getElementById('size_slider'),
          width_slider = document.getElementById('width_slider');

    const grid_header = document.getElementById('grid_header'),
          grid_image = document.getElementById('grid_image'),
          grid_footer = document.getElementById('grid_footer'),
          grid_article01 = document.getElementById('grid_article01'),
          grid_article02 = document.getElementById('grid_article02'),
          gridControl_btn = document.getElementById('toggleGrid');


    const serif_btn = document.getElementById('serif'),
          sans_serif_btn = document.getElementById('sans_serif'),
          both_btn = document.getElementById('both'),
          radio_btn = document.getElementById('radio_btn'),
          resetGrid_btn = document.getElementById('resetGrid_btn');

    const rootVars = document.documentElement;


    let styleValues = localStorage.getItem('typestyle');
    let neutraltype = localStorage.getItem('neutraltype');

    let slidersValues = [
      { storage: localStorage.getItem('storage_red'), target: red_slider },
      { storage: localStorage.getItem('storage_blue'), target: blue_slider },
      { storage: localStorage.getItem('storage_green'), target: green_slider },
      { storage: localStorage.getItem('storage_size'), target: size_slider },
      { storage: localStorage.getItem('storage_width'), target: width_slider }
    ];

    const pageControl = (function() {

      let gridStatus = false;

      let init = function() {
        _bindSliderEvents();
        _bindClickEvents();
        _loadSliderNumbers();
        _loadStorageValues();
      };

      let _bindSliderEvents = function() {

        document.oninput = function(e) {
          if ( e.target.classList.contains( 'slider' ) ) {
            e.stopPropagation();
            let targetID = e.target.id;
            let getTarget = document.getElementById(targetID);
            let valueText = getTarget.parentNode.getElementsByTagName('SPAN')[0].id;
            let storageTarget = targetID.replace('_slider','');

            console.log('slider ' + targetID + ' - ' +valueText + ' - '+getTarget);

            document.getElementById(valueText).innerHTML = getTarget.value;

            if (targetID==='width_slider' || targetID==='size_slider') {
              rootVars.style.setProperty('--site_base_'+storageTarget, getTarget.value+'px');
              localStorage.setItem('storage_'+storageTarget, getTarget.value);
            } else {
              rootVars.style.setProperty('--site_base_'+storageTarget, getTarget.value);
              localStorage.setItem('storage_'+storageTarget, getTarget.value);
            }

            _checkSliderPos(red_slider.value, blue_slider.value, green_slider.value);
          }
        }

      };

      let _bindClickEvents = function() {

        document.addEventListener("click", function(e) {
          if ( e.target.classList.contains( 'type_style' ) ) {
            e.stopPropagation();
            let targetID = e.target.id;
            //let getTarget = document.getElementById(targetID);
            let serif = 'Vollkorn, serif';
            let sans_serif = 'Source Sans Pro, sans-serif';
            //console.log(targetID);
            if (targetID==='serif') {
              rootVars.style.setProperty('--type_base_header', serif);
              rootVars.style.setProperty('--type_base_copy', serif);
            } else if (targetID==='sans_serif') {
              rootVars.style.setProperty('--type_base_header', sans_serif);
              rootVars.style.setProperty('--type_base_copy', sans_serif);
            } else {
              rootVars.style.setProperty('--type_base_header', serif);
              rootVars.style.setProperty('--type_base_copy', sans_serif);
            }

            localStorage.setItem('typestyle', targetID);

          }
        });

        gridControl_btn.addEventListener("click", function(e) {
          e.preventDefault();

          if (!gridStatus) {
            //grid_header.style.display = "block";
            grid_image.style.display = "block";
            grid_article01.style.display = "block";
            grid_article02.style.display = "block";
            grid_footer.style.display = "block";
            gridStatus = true;
            //console.log('on');
          } else {
            //grid_header.style.display = "none";
            grid_image.style.display = "none";
            grid_article01.style.display = "none";
            grid_article02.style.display = "none";
            grid_footer.style.display = "none";
            gridStatus = false;
            //console.log('off');
          }

        });

        resetGrid_btn.addEventListener("click", function(e) {
          e.preventDefault();
          //console.log('reset');
          location.reload();
        });
      }


      let _checkSliderPos = function(red, blue, green) {

        if(red <= 125 && blue <= 125 && green <= 125) {
          rootVars.style.setProperty('--text_on_color', 'white');
          localStorage.setItem('neutraltype', 'white');
        } else if(red >= 125 && blue >= 125 && green >= 125) {
          rootVars.style.setProperty('--text_on_color', 'black');
          localStorage.setItem('neutraltype', 'black');
        }

      };

      let _loadSliderNumbers = function() {

        for (var key in slidersValues) {
          if (slidersValues.hasOwnProperty(key)) {
            let target = slidersValues[key].target.id;
            document.getElementById(target).value = slidersValues[key].storage;
            document.getElementById(target).parentNode.getElementsByTagName('SPAN')[0].innerHTML = slidersValues[key].storage;
           }
        }
      };

      let _loadStorageValues = function() {

        rootVars.style.setProperty('--site_base_red', slidersValues[0].storage);
        rootVars.style.setProperty('--site_base_blue', slidersValues[1].storage);
        rootVars.style.setProperty('--site_base_green', slidersValues[2].storage);
        rootVars.style.setProperty('--site_base_size', slidersValues[3].storage+'px');

        rootVars.style.setProperty('--text_on_color', neutraltype);
        rootVars.style.setProperty('--site_base_width', slidersValues[4].storage+'px');


        if (styleValues === 'serif') {
          radio_btn.getElementsByTagName('INPUT')[0].checked = true;
          rootVars.style.setProperty('--type_base_header', 'Vollkorn, serif');
          rootVars.style.setProperty('--type_base_copy', 'Vollkorn, serif');
        } else if (styleValues === 'sans_serif') {
          radio_btn.getElementsByTagName('INPUT')[1].checked = true;
          rootVars.style.setProperty('--type_base_header', 'Source Sans Pro, sans-serif');
          rootVars.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
        } else {
          radio_btn.getElementsByTagName('INPUT')[2].checked = true;
          rootVars.style.setProperty('--type_base_header', 'Vollkorn, serif');
          rootVars.style.setProperty('--type_base_copy', 'Source Sans Pro, sans-serif');
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

        grid_article02.addEventListener("click", function(e) {
          e.stopPropagation();
          let container = e.target.parentNode.parentNode.id;
          let position = e.target.parentNode.className;
          let action = e.target.className;
          _moveObject(container, position, action);
        });

        grid_footer.addEventListener("click", function(e) {
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
          rootVars.style.setProperty(target, --num);
          updateItemInfo(container);
        } else if (action==='pushbottom' && num < maxCells) {
          //console.log('pushbottom');
          rootVars.style.setProperty(target, ++num);
          updateItemInfo(container);
        } else if (action==='pushright' && num < maxCells) {
          //console.log('pushright');
          rootVars.style.setProperty(target, ++num);
          updateItemInfo(container);
        } else if (action==='pushleft' && num > 1) {
          //console.log('pushleft');
          rootVars.style.setProperty(target, --num);
          updateItemInfo(container);
        } else {
          console.log('at the edge!');
        }

        function updateItemInfo(area) {
          console.log(area);
          let itemText = document.getElementById(area);

          //let test = '--'+area+'-top';
          let top = getComputedStyle(document.documentElement).getPropertyValue('--'+area+'-top');
          let left = getComputedStyle(document.documentElement).getPropertyValue('--'+area+'-left');
          let right = getComputedStyle(document.documentElement).getPropertyValue('--'+area+'-right');
          let bottom = getComputedStyle(document.documentElement).getPropertyValue('--'+area+'-bottom');
          //console.log(top);
          itemText.getElementsByClassName('nums')[0].innerHTML = left+" - "+(right-1);
          itemText.getElementsByClassName('nums')[1].innerHTML = top+" - "+(bottom-1);

        }

      };


      return {
          init: init
      };

    }());
    gridControl.init();


}());
