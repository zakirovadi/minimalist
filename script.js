document.addEventListener('DOMContentLoaded', function () {

    var ipad = document.getElementsByClassName('ipad')[0],
        phone = document.getElementsByClassName('phone')[0],
        cactus = document.getElementsByClassName('cactus')[0],
        macbook = document.getElementsByClassName('macbook')[0],
        notebook = document.getElementsByClassName('notebook')[0];






//-----------MOVE ELEMENTS ON BACKGROUND----------------------
    function moveElements(){
        cactus.classList.add('cactus-move');
        macbook.classList.add('macbook-move');
        ipad.classList.add('ipad-move');
        phone.classList.add('phone-move');
        notebook.classList.add('notebook-move');
    }






//--------------SHOW TIME ON IPAD------------------------------

    function addZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function getDayOfWeek(num){
        var arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return arr[num];
    }

    function getMonthWord(num){
        var arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return arr[num];
    }

    function slowlyShow(elem){
        var id = setInterval(addOpacity(elem), 100);
            
        setTimeout(function(){
            clearInterval(id);
        }, 1000)
            
    }

    function slowlyRemove(elem){

        var id= setInterval(deleteOpacity(elem), 100);

        setTimeout(function(){
            clearInterval(id);
        }, 1000)  
    }

    function addOpacity(elem){
        var num = 0.1;

        return function(){
            if (elem.style.opacity < 1){
                num += 0.1;
                elem.style.opacity = num;
                return num;
            }
        }
        
    }

    function deleteOpacity(elem){
        var num = 1;

        return function(){
            if (elem.style.opacity > 0){
                num -= 0.1;
                elem.style.opacity = num;
                return num;
            }
        }
        
    }    
       

    var showWatch = true;

    var ipadUnlock = document.getElementsByClassName('ipadUnlock')[0];


    ipadUnlock.addEventListener('mouseover', function(){
        if(showWatch){
            ipadStyle = getComputedStyle(this);
            ipadUnlock.style.height = ipadStyle.height;
            console.log(ipadStyle.height);

            showWatch = false;
            var date = new Date();

            var ipadWatch = document.getElementsByClassName('ipadWatch')[0],
                ipadDate = document.getElementsByClassName('ipadDate')[0];

            ipadWatch.style.opacity = '0.0';
            ipadDate.style.opacity = '0.0';
            
            ipadWatch.innerHTML = date.getHours() + ':' + addZero(date.getMinutes());
            ipadDate.innerHTML = getDayOfWeek(date.getDay()) + ', ' + date.getDate() + ' ' + getMonthWord(date.getMonth());
        
            
            slowlyShow(ipadWatch);
            slowlyShow(ipadDate);
            
            setTimeout(function(){
                slowlyRemove(ipadWatch);
                slowlyRemove(ipadDate);
                showWatch = true;
            }, 10000)

        }
    });





//------------SHOW POP-UP CONSULTATION----------------
    var containerPopup = document.getElementsByClassName('pop-up-container')[0],
        popup = document.getElementsByClassName('pop-up')[0],
        btnOpenPopup = document.getElementById('free-consultation'),
        btnClosePopup = document.getElementsByClassName('close')[0];

    btnOpenPopup.addEventListener('click', openPopup);
    btnClosePopup.addEventListener('click', closePopup);

    containerPopup.addEventListener('transitionend', movePopup);

    function openPopup(){
        containerPopup.style.display = 'block';
        this.style.backgroundColor = '#5cbbbe';

        setTimeout(function(){
            containerPopup.classList.add('pop-show');
        }, 100);
        
    }

    function closePopup(){
        popup.classList.remove('pop-up-show');

    }

    function movePopup(event){
        popupStyle = getComputedStyle(popup);

        if(event.propertyName == 'background-color'){
            popup.classList.add('pop-up-show');

        }else if(event.propertyName == 'opacity' && popupStyle.opacity == 0){
            containerPopup.classList.remove('pop-show');

            setTimeout(function(){
                containerPopup.style.display = 'none';
            }, 100);

            btnOpenPopup.style.backgroundColor = '';
        }
    }


//------------Verification POP-UP-------------------------

    var warning = document.createElement('span');
    warning.classList.add('form-error');

    var clientName = document.getElementById('clientName'),
        clientTel = document.getElementById('clientTel');

    clientName.addEventListener('blur', function(){
        if(this.value.length > 10 || this.value.length < 2){
            warning.innerHTML = 'имя от 2х до 10 символов';
            this.parentNode.insertBefore(warning, this.nextSibling);
        }else if(/[ -?]/.test(this.value)){
            warning.innerHTML = 'имя не может содержать цифры или знаки';
            this.parentNode.insertBefore(warning, this.nextSibling);
        }
    });

    clientName.addEventListener('focus', removeError);

    function removeError(){
        
    }









//------------LOADER------------------
    var loader = setInterval(function(){
        if(document.readyState == 'complete'){
            var spinner = document.getElementsByClassName('loader')[0],
                body = document.body;

            spinner.parentNode.removeChild(spinner);
            body.classList.remove('download');
            moveElements();

            clearInterval(loader);
        }
    }, 10);
})