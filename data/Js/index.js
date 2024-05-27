
function UpdateLogoCoordinate() {
    // Get the logo container and the hex container
	const LogoEle = document.querySelector('.logo-container');
	const PolyEle = document.querySelector('.hex-container');
	const LogoY = LogoEle.getBoundingClientRect().y;
	const LogoH = LogoEle.getBoundingClientRect().height;
	const PolyY = PolyEle.getBoundingClientRect().y;
	const PolyH = PolyEle.getBoundingClientRect().height;
	const PolyM = PolyY + (PolyH / 2);
	const LogoM = LogoY + (LogoH / 2);
	if(PolyM >= LogoM) {
		LogoEle.style.top = PolyM - LogoM + "px";
	}else {
		LogoEle.style.top = LogoM - PolyM + "px";
	}
};
  
function SetJobOnLoad() {
	var viewportsize = window.matchMedia("(max-width: 768px)");
    const experienceTabs = document.querySelectorAll('[role="Experiencestab"]');
    const internshipTabs = document.querySelectorAll('[role="Internshipstab"]');
    const jobTypeButtons = document.querySelectorAll('[role="Jobtypetab"]');
    const experiencePanel = document.getElementById('Experiences');
    const internshipPanel = document.getElementById('Internships');

    // Set default focus and load the Experience tab
	
    let JobTypeTabFocus = 0;
	let JobTabFocus = 0;

    // Event listener for job type buttons
    jobTypeButtons.forEach((button, index) => {
		if (index === 0) {
			button.setAttribute("tabindex", 0);
			button.classList.add('sel_btn');
			button.classList.remove('desel_btn');
		} else {
			button.setAttribute("tabindex", -1);
			button.classList.add('desel_btn');
			button.classList.remove('sel_btn');
		}
        button.addEventListener("click", () => {
			 jobTypeButtons.forEach((b) => {
				 b.setAttribute("tabindex", -1);
				 b.classList.add('desel_btn');
				 b.classList.remove('sel_btn');
			 });
            if (index === 0) { // Experience tab selected
                JobTypeTabFocus = 0;
				JobTabFocus = 0;
                loadExperienceTab(experienceTabs);
            } else if (index === 1) { // Internship tab selected
                JobTypeTabFocus = 1;
				JobTabFocus = 0;
                loadInternshipTab(internshipTabs);
            }
			button.setAttribute("tabindex", 0);
			button.classList.add('sel_btn');
			button.classList.remove('desel_btn');
        });
		button.addEventListener("keydown", (e) => handleTabNavigation(e, jobTypeButtons));
    });

    // Event listener for experience tabs
    experienceTabs.forEach((eTab, index) => {
		if(index == 0) {
			eTab.setAttribute("tabindex", 0);
			eTab.classList.add('sel_btn');
		} else {
			eTab.setAttribute("tabindex", -1);
			eTab.classList.add('desel_btn');
		}
        eTab.addEventListener("click", () => {
            JobTabFocus = index;
			var Indicatortransform = "";
			if (viewportsize.matches) {
				Indicatortransform = "translateX(calc(" + index + " * var(--tab-width) + 20px))";
			} else {
				Indicatortransform = "translateY(calc(" + index + " * var(--tab-width)))";
			}
			document.querySelector(".JobSidebarindicator").style.transition = Indicatortransform;
			console.log(Indicatortransform);
            loadExperienceTab(experienceTabs);
        });
		eTab.addEventListener("keydown", (e) =>
			handleTabNavigation(e, experienceTabs));
    });

    // Event listener for internship tabs
    internshipTabs.forEach((iTab, index) => {
		iTab.setAttribute("tabindex", -1);
		iTab.classList.add('desel_btn');
        iTab.addEventListener("click", () => {
            JobTabFocus = index;
			var Indicatortransform = ""; 
			var body = getComputedStyle(document.body);
			var TabWidth = body.getPropertyValue('--tab-width');
			var TabHeight = body.getPropertyValue('--tab-height');
			if (viewportsize.matches) {
				Indicatortransform = "translateX(" + (index * TabHeight) + "px)";
			} else {
				Indicatortransform = "translateY(" + (index * TabWidth) + "px)";
			}
			document.querySelectorAll(".JobSidebarindicator").forEach(function(e) {
				//var originaltransform = window.getComputedStyle(e).transform;
				//originaltransform = Indicatortransform
				//e.style.transform = Indicatortransform;
				console.log(e.style.transform);
				e.style.setProperty('transform', Indicatortransform)
				console.log(e);
			});
			loadInternshipTab(internshipTabs);
        });
    });

    // Function to handle keyboard navigation between tabs
    function handleTabNavigation(e, tabs) {
        tabs.forEach(tab => tab.setAttribute("tabindex", -1)); // Reset tabindex for all tabs

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            const nextTab = tabs[JobTabFocus];
            nextTab.setAttribute("tabindex", 0);
            nextTab.focus();
        } else if (e.key === "ArrowRight" && JobTabFocus < tabs.length - 1) {
            JobTabFocus++;
        } else if (e.key === "ArrowLeft" && JobTabFocus > 0) {
            JobTabFocus--;
        }
        tabs[JobTabFocus].setAttribute("tabindex", 0);
        tabs[JobTabFocus].focus();
    }

    // Function to load the Experience tab and its content
    function loadExperienceTab(tabs) {
		tabs.forEach(tab => {
            tab.classList.remove('sel_btn');
            tab.classList.add('desel_btn');
            tab.setAttribute("aria-selected", false);
			let panel = tab.getAttribute("aria-controls");
			let content = document.querySelector("#" + panel);
			content.style.display = "none";
			
        });
		if (JobTypeTabFocus === 0) {
			experienceTabs[JobTabFocus].classList.remove('desel_btn');
			experienceTabs[JobTabFocus].classList.add('sel_btn');
			experienceTabs[JobTabFocus].setAttribute("aria-selected", true);
			let panel = experienceTabs[JobTabFocus].getAttribute("aria-controls");
			let content = document.querySelector("#" + panel);
			content.style.display = "block";
			console.log(panel, content);
			// Show the Experience panel and hide the Internship panel
			experiencePanel.removeAttribute("hidden");
			internshipPanel.setAttribute("hidden", true);
			loadInternshipTab(internshipTabs);
		}

        
    }

    // Function to load the Internship tab and its content
    function loadInternshipTab(tabs) {
        tabs.forEach(tab => {
            tab.classList.remove('sel_btn');
            tab.classList.add('desel_btn');
            tab.setAttribute("aria-selected", false);
			let panel = tab.getAttribute("aria-controls");
			let content = document.querySelector("#" + panel);
			content.style.display = "none";
        });
		if (JobTypeTabFocus === 1) {
			internshipTabs[JobTabFocus].classList.remove('desel_btn');
			internshipTabs[JobTabFocus].classList.add('sel_btn');
			internshipTabs[JobTabFocus].setAttribute("aria-selected", true);
			let panel = internshipTabs[JobTabFocus].getAttribute("aria-controls");
			let content = document.querySelector("#" + panel);
			content.style.display = "block";
			// Show the Internship panel and hide the Experience panel
			internshipPanel.removeAttribute("hidden");
			experiencePanel.setAttribute("hidden", true);
			loadExperienceTab(experienceTabs);
		}
    }
	
	loadExperienceTab(experienceTabs);
}

// Call the function on page load
window.onload = SetJobOnLoad;


function nav_animation(){
	const nav_items = document.querySelectorAll('.nav-items .flex-nav-item');
		nav_items.forEach((nav_item) => {
		nav_item.classList.remove('nav-item-animation');
		});
	const navobserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				nav_items.forEach((nav_item) => {
					nav_item.classList.add('nav-item-animation');
				});
				return;
			}
		});
	});

navobserver.observe(document.querySelector(".nav-items .flex-nav-item"));
};
const Vicons = document.querySelector(".Vcontact_icons");
const Hicons = document.querySelector(".Hcontact_icons");

document.addEventListener("scroll", function () {
	console.log("scrolling");
	//const rect = document.querySelector("#contact").getBoundingClientRect();
	const rect = Hicons.getBoundingClientRect();
	console.log(rect.top , rect.left ,rect.bottom, rect.right);
	console.log(window.innerHeight, window.innerWidth);
	console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);
	if(
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) ) {
			Vicons.classList.add("Vicons_animation");
		} else {
			Vicons.classList.remove("Vicons_animation");
		}
});
function angle_drop(){
	/*
  const observer_1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var card_1 = document.getElementById("card-1");
        var card_2 = document.getElementById("card-2");
        var card_3 = document.getElementById("card-3");
        card_2.classList.add('drop');
        card_1.classList.add('move-left');
        card_3.classList.add('move-right');
        return;
      }
    });
  });
  observer_1.observe(document.querySelector(".flex-image-container"));
  */
}




document.addEventListener("DOMContentLoaded", function(){
	SetJobOnLoad();
    updateCss();
  UpdateLogoCoordinate();
nav_animation();
  angle_drop();
  write_name();

});

document.querySelector(".nav-ham button").addEventListener("click", 
	function(){
		document.querySelector(".nav-ham button").classList.toggle("nav-ham-cross");
		document.querySelector(".nav-ham button").classList.toggle("nav-ham-button");
		document.querySelector("aside").classList.toggle("nav-ham-menu");
		document.querySelector("aside").classList.toggle("nav-ham-menu-closed");
	}
);


function updateCss() {
	const ContactHeader = document.querySelector("#contact .header");
	const ContactBar = document.querySelector(".contact_header");
	ContactBar.style.width = ContactHeader.clientWidth;
	}
var i = 0;
//window.addEventListener("mouseenter", write_name());
//$('.banner').removeEventListener("mouseenter", () => {});
var soft_sound = new Audio('./images/soft.wav');
var soft_play = soft_sound.play();
var hard_sound = new Audio('./images/hard.wav');
var hard_play = hard_sound.play();
hard_play.playbackRate = 1.5;
soft_play.playbackRate = 1.5;
const name = ['S', 'h', 'a', 's', 'h', 'i', ' ', 'P', 'r', 'a', 'k', 'a', 's', 'h', ' ', 'S', 'h', 'a', 'h'];

  function write_name() {
	  /*
    if (i < name.length) {
      document.getElementById("full_name").innerHTML += name[i];
      i++;
      if(name[i] === ' ') {
        hard_play;
        setTimeout(write_name, 100);
      }
      else {
        soft_play;
        setTimeout(write_name, 100);
      }
    }*/
  }











  //   TESTING FEATURES

  /*
  $('button').click(function() {
    $('.curtain').addClass("up");
    $('.portfolio').addClass("load");
    setTimeout(()=> {write_name();},1500)
    nav_animation();
    angle_drop();

  })

  */
  document.getElementById('playButton1').addEventListener('click', function() {
    document.body.classList.add('blur');
    document.getElementById('videoOverlay1').style.display = 'flex';
});

document.getElementById('playButton2').addEventListener('click', function() {
    document.body.classList.add('blur');
    document.getElementById('videoOverlay2').style.display = 'flex';
});

document.getElementById('closeButton1').addEventListener('click', function() {
    document.body.classList.remove('blur');
    document.getElementById('videoOverlay1').style.display = 'none';
    document.getElementById('videoPlayer1').pause();
});

document.getElementById('closeButton2').addEventListener('click', function() {
    document.body.classList.remove('blur');
    document.getElementById('videoOverlay2').style.display = 'none';
    document.getElementById('videoPlayer2').pause();
});
