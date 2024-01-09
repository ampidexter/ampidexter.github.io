  let selectedGuideName = "";
  let selectedGuidePrice = 0;
  let selectedRouteName = "";

function DisplayRoutes(pageNumber) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const routesData = JSON.parse(xhr.responseText);
          const routesTableBody = document.getElementById("routesTableBody");
          const itemsPerPage = 4;
          const startIndex = (pageNumber - 1) * itemsPerPage;
          const endIndex = pageNumber * itemsPerPage;
  
          routesTableBody.innerHTML = "";
  
          routesData.slice(startIndex, endIndex).forEach(route => {
            const row = `
              <tr>
                <td>${route.name}</td>
                <td>${route.description}</td>
                <td>${route.mainObject}</td>
                <td><button class="btn btn-danger" data-route-id="${route.id}">Выбрать</button></td>
              </tr>
            `;
            routesTableBody.innerHTML += row;
          });
  
          // пагинации
          const totalPages = Math.ceil(routesData.length / itemsPerPage);
          const paginationContainer = document.getElementById("pagination");
          paginationContainer.innerHTML = "";
  
          for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === pageNumber) {
              li.classList.add("active");
            }
  
            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#list_route";
            a.dataset.page = i;
            a.textContent = i;
  
            li.appendChild(a);
            paginationContainer.appendChild(li);
          }
        } else {
          console.error('Ошибка при получении данных:', xhr.status);
        }
      }
    };
  
    xhr.open(
      'GET',
      `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=ceb7329b-4516-4217-a1c8-c2a6df7087e2`,
      true
    );
    xhr.send();
  }
  
  // обработка событий пагинации
  function handlePaginationClick(event) {
    const pageNumber = parseInt(event.target.dataset.page);
  
    if (!isNaN(pageNumber)) {
      DisplayRoutes(pageNumber);
      setActivePage(pageNumber);
    }
  }
  
  // выделение активной страницы в пагинации
  function setActivePage(pageNumber) {
    const paginationItems = document.querySelectorAll(".page-item");
  
    paginationItems.forEach(item => {
      item.classList.remove("active");
      if (parseInt(item.firstChild.dataset.page) === pageNumber) {
        item.classList.add("active");
      }
    });
  }
  
  // обработчики событий пагинации
  document.addEventListener("click", function (event) {
    if (event.target.matches(".page-link")) {
      handlePaginationClick(event);
    }
  });
  
// отображение таблицы с гидами
  function showGuides(routeId) {
    const guidesSection = document.getElementById('guidesSection');
    guidesSection.style.display = 'block'; 
    const guidesTableBody = document.getElementById('guidesTableBody');
    guidesTableBody.innerHTML = '';
    guidesSection.scrollIntoView({ behavior: 'smooth' });
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const guidesData = JSON.parse(xhr.responseText);
          guidesData.forEach(guide => {
            const row = `
            <tr>
            <td><img src="images/placeholder-avatar.jpg" alt="Avatar" class="avatar"></td>
            <td>${guide.name}</td>
            <td>${guide.language}</td>
            <td>${guide.workExperience}</td>
            <td>${guide.pricePerHour}</td>
            <td><button class="btn btn-danger" data-toggle="modal" data-target="#bookingModal">Выбрать</button></td>
          </tr>
            `;
          guidesTableBody.innerHTML += row;

          });
        } else {
          console.error('Ошибка при получении данных о гидах:', xhr.status);
        }
      }
    };
  
    xhr.open(
      'GET',
      `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${routeId}/guides?api_key=ceb7329b-4516-4217-a1c8-c2a6df7087e2`,
      true
    );
    xhr.send();
  }

  // выбор в таблице маршрутов
  function addRouteSelectionHandler() {
    const routesTableBody = document.getElementById('routesTableBody');
    routesTableBody.addEventListener('click', function(event) {
      const targetButton = event.target;
      if (targetButton.tagName === 'BUTTON') {
        const routeId = targetButton.dataset.routeId;
        const routeName = targetButton.parentNode.parentNode.children[0].textContent; 
        if (routeId) {
          selectedRouteName = routeName;
          showGuides(routeId);
        } 
      }
    });
  }
  


// при нажатии кнопки "оформить заявку"
function handleBookingButtonClick() {
  const bookingButton = document.getElementById('bookingButton');
  bookingButton.addEventListener('click', function(event) {
    const modal = document.getElementById('bookingModal');
    const guideInfo = document.getElementById('guideInfo');
    const routeInfo = document.getElementById('routeInfo');

    guideInfo.textContent = `${selectedGuideName}`;
    routeInfo.textContent = `${selectedRouteName}`;

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  });
}


// выбор в таблице гидов
function addGuideSelectionHandler() {
  const guidesTableBody = document.getElementById('guidesTableBody');
  guidesTableBody.addEventListener('click', function(event) {
    const targetButton = event.target;
    if (targetButton.tagName === 'BUTTON') {
      const bookingButton = document.getElementById('bookingButton');
      bookingButton.style.display = 'block'; 
      const guideName = targetButton.parentNode.parentNode.children[1].textContent;
      const guidePrice = targetButton.parentNode.parentNode.children[4].textContent;
      if (guideName && guidePrice) {
        selectedGuideName = guideName;
        selectedGuidePrice = guidePrice;
      }
    }
  });
}

// выбор кнопок
let selectedGuideButton = null;
let selectedRouteButton = null;

function handleButtonClick(event) {
  const button = event.target;
  if (button.tagName === 'BUTTON') {
    if (selectedGuideButton) {
      selectedGuideButton.textContent = 'Выбрать';
      selectedGuideButton.disabled = false;
    }

    button.textContent = 'Выбрано';
    button.disabled = true;
    selectedGuideButton = button;
  }
}

const table = document.getElementById('guidesTableBody');
table.addEventListener('click', handleButtonClick);

function handleRouteButtonClick(event) {
  const button = event.target;
  if (button.tagName === 'BUTTON') {
    if (selectedRouteButton) {
      selectedRouteButton.textContent = 'Выбрать';
      selectedRouteButton.disabled = false;
    }

    button.textContent = 'Выбрано';
    button.disabled = true;
    selectedRouteButton = button;
  }
}

const routesTable = document.getElementById('routesTableBody');
routesTable.addEventListener('click', handleRouteButtonClick);

window.onload = function () {
  DisplayRoutes(1);
  addRouteSelectionHandler(); 
  addGuideSelectionHandler();
  handleBookingButtonClick();
  calculateBookingPrice();
};

// расчёт стоимости
function calculateBookingPrice() {
  const guideServiceCost = parseFloat(selectedGuidePrice); 
  const hoursNumber = parseFloat(document.getElementById('hoursNumber').value);
  const startTimeValue = document.getElementById('startTime').value;
  const startTime = new Date(`1970-01-01T${startTimeValue}`);
  const transferCheckbox = document.getElementById('transfer').check;
  
  let isItMorning = 0;
  let isItEvening = 0;
  
  const startHour = startTime.getHours();
  if (startHour >= 9 && startHour < 12) {
    isItMorning = 400;
  }
  if (startHour >= 20 && startHour < 23) {
    isItMorning = 1000;
  }
  
  
  const numberOfVisitors = parseInt(document.getElementById('numberOfVisitors').value); 

  let price = guideServiceCost * hoursNumber  + isItMorning + isItEvening;

  if (numberOfVisitors > 5 && numberOfVisitors <= 10) {
    price += 1000; 
  } else if (numberOfVisitors > 10 && numberOfVisitors <= 20) {
    price += 1500;
  }

  priceElement.textContent = `Стоимость заявки: ${price} руб.`;
}

// перерасчёт суммы
const tourDateInput = document.getElementById('tourDate');
const startTimeInput = document.getElementById('startTime');
const hoursNumberSelect = document.getElementById('hoursNumber');
const numberOfVisitorsInput = document.getElementById('numberOfVisitors');
const fastGuideCheckbox = document.getElementById('fastGuide');
const transferCheckbox = document.getElementById('transfer');
tourDateInput.addEventListener('change', calculateBookingPrice);
startTimeInput.addEventListener('change', calculateBookingPrice);
hoursNumberSelect.addEventListener('change', calculateBookingPrice);
numberOfVisitorsInput.addEventListener('input', calculateBookingPrice);
fastGuideCheckbox.addEventListener('change', calculateBookingPrice);
transferCheckbox.addEventListener('change', calculateBookingPrice);

// поставить ограничение на ввод времени в модальном окне
//добавить обработку дня недели и праздников
// добавить надбавку за быстрый выезд
// поменять 2 опцию, сделать надбавку за неё
// сверстать лк
// реализовать отправку заявок на сервер
// реализовать вывод заявок в лк
// сделать чтобы при выборе гида страница листалась до кнопки оформить
// уменьшить описания и основные объекты
// поменять название сайта