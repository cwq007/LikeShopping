function initBackground() {
	var snow = null;
	var random = null;
	setInterval(function () {
		random = Math.random();
		snow = document.createElement("div");
		snow.innerText = "❉";
		snow.className = "snow";
		snow.style.left = (100 + 1000*random) + "px";
		snow.style.top = "50px";
		document.getElementById("main").appendChild(snow);
		snowDrop(snow);
	}, 1000);

}
function snowDrop(snow) {
	// var flag = (Math.random() > 0.5) ? true : false;
	var minwidth = document.getElementById("main").offsetLeft;
	var maxwidth = minwidth + document.getElementById("main").offsetWidth;
	var horizontal_speed = 2 + Math.random() * 8;
	var vertical_speed = 10;
	var left = null;
	var top = null;
	var timer = setInterval(function () {
		left = snow.offsetLeft;
		top = snow.offsetTop;
		// horizontal_speed = flag ? (Math.random()*horizontal_speed_init) 
		// 	: -(Math.random()*horizontal_speed_init);
		if (top >= 500 || left > maxwidth) {
			clearInterval(timer);
			snow.remove();
		}
		snow.style.top = (top + vertical_speed) + "px";
		snow.style.left = (left + horizontal_speed) + "px";
		// flag = !flag;
	}, 500);
}
function initHeader() {
	var input = document.getElementById("search-text");
	var search_toggle = document.getElementById("search-list-toggle");
	var search_list = document.getElementById("search-list");
	var search_list_item = search_list.getElementsByTagName("li");
	search_toggle.onclick = function () {
		search_list.className = (search_list.className=="opend") ? 
			"" : "opend";
	}
	for (var i=0; i<search_list_item.length; i++) {
		search_list_item = search_list_item[i]
					.getElementsByTagName("a")[0]
		search_list_item.onclick = function () {
			search_list.className = "";
			input.value = this.innerText;
		}
	}
}
function initAsideBar() {
	var asideBar = document.getElementById("aside-navbar");
	var toggleBtn = document.getElementById("toggle-control");
	var backtopBtn = document.getElementById("back-top");
	toggleBtn.onclick = function () {
		asideBar.style.right = 
			(toggleBtn.className == "opend") ? "-35px" : "0px";
		setTimeout(function () {
			toggleBtn.innerText = 
				(toggleBtn.className == "opend") ? "<<" : ">>";
			toggleBtn.className = (toggleBtn.className == "opend") ? "closed" : "opend";
		}, 200);
	}

	backtopBtn.onclick = function () {
		/*
		var timer = setInterval(function () {
			if (document.documentElement.scrollTop <= 0) {
				document.documentElement.scrollTop = 0;
				clearInterval(timer);
			}
			window.scrollBy(0, -10);
		}, 100);*/
		window.location.href = "#top";
	}
}
var curIndex = 0;
var timer = null;
function initAdv() {
	start();
	var adv = document.getElementById("adv-navbar");
	var toggleBtn = document.getElementById("toggle-btn");

	adv.onmouseover = stop;
	adv.onmouseout = start;

	var lis = toggleBtn.getElementsByTagName("li");
	for (var i=0; i<lis.length; i++) {
		(function (j) {
			lis[j].onclick = function () {
				changeImg(j);
			}
		})(i);
	}

	var left_toggle = document.getElementById("left-toggle");
	var right_toggle = document.getElementById("right-toggle");
	left_toggle.onclick = function () {changeImg(curIndex-1 < 0 ? 6 : curIndex-1);}
	right_toggle.onclick = function () {changeImg(curIndex+1 > 6 ? 0 : curIndex+1);}
}
function changeImg(nextIndex) {
	var adv = document.getElementById("adv-navbar");
	var imgs = adv.getElementsByTagName("img");
	var toggleBtn = document.getElementById("toggle-btn");
	var lis = toggleBtn.getElementsByTagName("li");
	if (nextIndex == curIndex) return;
	imgs[curIndex].className = "dispearAdvImg";
	imgs[nextIndex].className = "showAdvImg";
	lis[nextIndex].className = "selected";
	lis[curIndex].className = "";
	curIndex = nextIndex;
}
function stop() {
	clearInterval(timer);
}
function start() {
	timer = setInterval(function () {
		changeImg(curIndex+1 > 6 ? 0 : curIndex+1);
	}, 3000);
}
window.onload = function () {
	initBackground();
	initHeader();
	initAsideBar();
	initAdv();
}