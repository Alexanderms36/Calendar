const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll("header .icons span");
const listItem = document.querySelectorAll("li");
const backDate = document.querySelector(".current-date-bs");
const element = document.querySelector('.wrapper');
const frontSide = document.querySelector('.calendar');
const backSide = document.querySelector('#back'); //жопа календаря
const backIcon = document.getElementById('back-to-the-front');
const backDone = document.querySelector("#backDone");
const backCancel = document.querySelector("#backCancel");
const txtArea = document.querySelector("#reasonTextField");




let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();



months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
 		"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

monthsRodP = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
		"Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

const renderCalendar = () => {
	let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(); //1st date месяца
	let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate() ;//посл date месяца
	let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate() ;//посл день прошлого месяца
	let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth - 1).getDay() ;//посл date месяца
	let liTag = "";
	for (let i = firstDateofMonth - 1; i > 0; i--){
		liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
	
	}

	for (let i = 1; i < lastDateofMonth + 1; i++) {
		let isToday = i === date.getDate() && currMonth === new Date().getMonth()
						&& currYear === new Date().getFullYear() ? "active" : "";
		liTag += `<li class="${isToday}">${i}</li>`;

	}

	for (let i = lastDayofMonth; i < 6; i++) {
		liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
		
	}
	currentDate.innerText = `${months[currMonth]} ${currYear}`;
	daysTag.innerHTML = liTag;
	//кнопочки которые у нас даты
	const dayItems = document.querySelectorAll(".days li");
	
	//переходим с переда на заднюю часть по клику на дату
    dayItems.forEach(day => {
    	day.addEventListener("click", () => {
			element.classList.remove('rotBack');
      		console.log("Hey");
			console.log();
			element.classList.add('rotate');
			backDate.innerText = day.innerText + " " + monthsRodP[currMonth];
			frontSide.style.display = "none";
			currentDate.style.display = "none";
			prevNextIcon.forEach(icon => {
				icon.style.display = "none";
			});
			backSide.style.display = "block";


			backDone.addEventListener("click", () =>{
				console.log("hi");
				backDone.classList.add('glowingGreen');
				setTimeout(() => {
					backDone.classList.remove('glowingGreen');
				  }, 1000);
				txtArea.value = '';
				txtArea.placeholder = "Вы добавили отметку o текущем дне :)))";

			});
			backCancel.addEventListener("click", () =>{
				console.log("hi");
				backCancel.classList.add('glowingRed');
				setTimeout(() => {
					backCancel.classList.remove('glowingRed');
				  }, 1000);
				txtArea.value = '';
				txtArea.placeholder = "Вы удалили отметку o текущем дне :(((";
			});
		});
  	});



	
}

renderCalendar();

prevNextIcon.forEach(icon => {
	icon.addEventListener("click", () =>{
		currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
		if(currMonth < 0 || currMonth > 11){
			date = new Date(currYear, currMonth);
			currYear = date.getFullYear();
			currMonth = date.getMonth();
		} else {
			date = new Date();
		}
		
		renderCalendar();
	});
});


backIcon.addEventListener("click", () =>{
	element.classList.remove('rotate');
	void element.offsetWidth;
	element.classList.add('rotBack');
	frontSide.style.display = "block";
	currentDate.style.display = "block";
	prevNextIcon.forEach(icon => {
		icon.style.display = "inline-block";
	});
	backSide.style.display = "none";
	renderCalendar();
});

