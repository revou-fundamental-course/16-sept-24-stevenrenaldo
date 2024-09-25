let slideIndex = 1;

//greeting
const replaceName = () => {
  let name = prompt('Halo, Siapakah nama Anda?', 'Steven');
  //console.log(name);

  document.getElementById('name').innerHTML = name ? ' ' + name : '';
};
//end of greeting

//menu
const toggleMenuButton = () => {
  document.getElementById('menu').classList.toggle('show');
};
let btnMenu = document.getElementById('hamburger-menu');
btnMenu.addEventListener('click', function () {
  toggleMenuButton();
});

//if menu is click then hide menuList
let menu = document.getElementById('menu');
let menuList = menu.getElementsByTagName('a');
const menusArray = [...menuList];
menusArray.forEach((item) => {
  item.addEventListener('click', function () {
    toggleMenuButton();
  });
});
//end of menu

//slider
const slideImage = (n) => {
  showImages((slideIndex += n));
};

const showImages = (n) => {
  let i;

  //get image list
  let imgList = document
    .getElementById('image-slider')
    .getElementsByTagName('img');

  //if n > length of imgList then set slide index to 1
  if (n > imgList.length) slideIndex = 1;
  else if (n < 1) slideIndex = imgList.length;

  //hide all image
  for (i = 0; i < imgList.length; i++) {
    imgList[i].style.display = 'none';
  }

  //show image (only seleted index)
  imgList[slideIndex - 1].style.display = 'block';
};

const initImageSlider = () => {
  //show slider at index 1
  showImages(slideIndex);

  //button slide prev
  let btnSlidePrev = document.getElementById('slide-prev');
  btnSlidePrev.addEventListener('click', function () {
    slideImage(-1);
  });

  //btn slide next
  let btnSlideNext = document.getElementById('slide-next');
  btnSlideNext.addEventListener('click', function () {
    slideImage(1);
  });

  //auto slide in 3s
  setInterval(() => {
    slideImage(1);
  }, 3000);
};
//end of slider

//form
const validateForm = () => {
  let hasError = false;

  //reset validation
  document.getElementById('error-name').innerHTML = '';
  document.getElementById('error-birth-date').innerHTML = '';
  document.getElementById('error-gender').innerHTML = '';
  document.getElementById('error-message').innerHTML = '';
  document.getElementById('form-result').innerHTML = '';

  //get input value
  const name = document.forms['message-form']['name'].value;
  const birthDate = document.forms['message-form']['birth-date'].value;
  const gender = document.forms['message-form']['gender'].value;
  const message = document.forms['message-form']['message'].value;

  //form validation
  if (name === '') {
    hasError = true;
    document.getElementById('error-name').innerHTML = 'Nama tidak boleh kosong';
  }

  if (birthDate === '') {
    hasError = true;
    document.getElementById('error-birth-date').innerHTML =
      'Tanggal tidak boleh kosong';
  }

  if (gender === '') {
    hasError = true;
    document.getElementById('error-gender').innerHTML =
      'Jenis kelamin tidak boleh kosong';
  }

  if (message === '') {
    hasError = true;
    document.getElementById('error-message').innerHTML =
      'Pesan tidak boleh kosong';
  }

  //show result
  if (!hasError) {
    const currentDate = new Date();
    let birthDates = birthDate;
    let formattedBirthDate = '';
    try {
      birthDates = new Date(birthDate);
      formattedBirthDate = `${birthDates.getDate()}/${
        birthDates.getMonth() + 1
      }/${birthDates.getFullYear()}`;
    } catch (error) {
      console.log(error);
    }

    //print result
    document.getElementById('form-result').innerHTML = `
    <div>
      <p><b>Current time</b> : ${currentDate}</p> 
      <ul>
        <li><b>Nama</b> : ${name}</li>
        <li><b>Tanggal lahir</b> : ${formattedBirthDate}</li>
        <li><b>Jenis kelamin</b> : ${gender}</li>
        <li><b>Pesan</b> : ${message}</li>
      </ul>
    </div>
  `;
  }
};

const initForm = () => {
  //set default date to now
  document.getElementById('birth-date').valueAsDate = new Date();

  //button submit
  let messageForm = document.getElementById('message-form');
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    validateForm();
  });
};
//end of form

//init page
initImageSlider();

initForm();

replaceName();
//end of init page
