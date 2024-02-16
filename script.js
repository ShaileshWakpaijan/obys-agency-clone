function loadingAnimation() {
    document.getElementById("crsr").style.display = "none"
    let tl = gsap.timeline();
    tl.from(".line h1", {
        y: 150,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.6,
    });
    tl.to("#line1-part1, .line h2", {
        opacity: 1,
        duration: 0.3,
        onStart: function () {
            let h5Timer = document.querySelector("#line1-part1 h5");
            let growTime = 0;
            let loadTimer = setInterval(function () {
                if (growTime < 101) {
                    h5Timer.innerHTML = growTime++;
                } else {
                    clearInterval(loadTimer);
                }
            }, 30);
        },
    });
    tl.to("#loader", {
        opacity: 0,
        delay: 3.5,
        duration: 0.2,
    });
    tl.from("#page1, #page2", {
        delay: 0.2,
        y: "1500",
        duration: 1.4,
        ease: Power4,
    });
    tl.from(".hero h1", {
        y: 130,
        duration: 0.6,
        delay: "-.5",
        stagger: 0.2,
    });
    tl.from("#nav", {
        y: -100,
        opacity: 0
    });
    tl.to("#loader", {
        display: "none",
    });
    tl.to("#crsr", {
        display: "block",
    });
}
loadingAnimation()

function loco_ScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}
if (window.innerWidth > 1000) { loco_ScrollTrigger(); }

function flagAnime() {
    let flag = document.querySelector("#flag");
    let elem = document.querySelector("#hero-anime h1");
    elem.addEventListener("mousemove", function (dets) {
        flag.style.display = "block";
        gsap.to("#flag", {
            left: dets.x,
            top: dets.y,
        });
    });
    elem.addEventListener("mouseleave", function () {
        flag.style.display = "none";
    });
}
flagAnime();

function mouseAnime() {
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#crsr", {
            top: dets.y,
            left: dets.x,
        });
    });
    Shery.makeMagnet(
        "#nav-part2 h4, #nav-fix .menu-opener__square" /* Element to target.*/,
        {
            //Parameters are optional.
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        }
    );
    Shery.makeZoom("#nav svg" /* Element to target.*/, {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
    Shery.imageEffect(".page3-img-container", {
        style: 5,
        // debug:true,
        gooey: true,
        config: { "noiseDetail": { "value": 6.11, "range": [0, 100] }, "distortionAmount": { "value": 2.9, "range": [0, 10] }, "scale": { "value": 59.54, "range": [0, 100] }, "speed": { "value": 0.58, "range": [0, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.8333333134651184 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.27, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.84, "range": [0, 10] }, "metaball": { "value": 0.44, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.38, "range": [0, 2] }, "noise_scale": { "value": 8.4, "range": [0, 100] } }
    })
}
if (window.innerWidth > 750) { mouseAnime(); }

let flag = 0;
function videoAnime() {
    let videoContainer = document.querySelector("#video-container");
    let crsr = document.querySelector("#crsr");
    let video = document.querySelector("#video-container video");
    let videoCrsr = document.querySelector("#video-crsr")
    if (window.innerWidth < 750) {
        video.addEventListener("click", function () {
            if (flag == 0) {
                video.style.opacity = 1;
                video.play();
                gsap.to("#video-crsr", {
                    opacity: 0,
                });
                videoCrsr.innerHTML = `<i class="ri-pause-fill"></i>`
                flag = 1;
            } else {
                video.style.opacity = 0;
                video.pause();
                videoCrsr.innerHTML = `<i class="ri-play-fill"></i>`
                flag = 0;
                gsap.to("#video-crsr", {
                    opacity: 1,
                });
            }
        });
    } else {
        videoContainer.addEventListener("mouseenter", function () {
            crsr.style.display = "none";
            videoContainer.addEventListener("mousemove", function (dets) {
                gsap.to("#video-crsr", {
                    top: dets.y - 300 + "px",
                    left: dets.x - 400 + "px",
                });
            });
        });
        videoContainer.addEventListener("mouseleave", () => {
            crsr.style.display = "initial";
            gsap.to("#video-crsr", {
                top: "0%",
                left: "75%",
            });
        });

        video.addEventListener("click", function () {
            if (flag == 0) {
                video.style.opacity = 1;
                video.play();
                gsap.to("#video-crsr", {
                    scale: 0.5,
                });
                videoCrsr.innerHTML = `<i class="ri-pause-fill"></i>`
                flag = 1;
            } else {
                video.style.opacity = 0;
                video.pause();
                videoCrsr.innerHTML = `<i class="ri-play-fill"></i>`
                flag = 0;
                gsap.to("#video-crsr", {
                    scale: 1,
                });
            }
        });
    }
}
videoAnime();

function page1() {
    gsap.to("#nav-part1, #nav-part2", {
        y: -150,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".hero-container",
            start: "top 250%",
            end: " top -2500%",
            scrub: 1,
        }
    })

    gsap.from("#video-crsr", {
        y: 100,
        duration: .5,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".hero-container",
            start: "top 250%",
        }
    })
}
page1();

function page3() {
    let tl5 = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page3-top',
            start: 'top 75%',
        }
    })
    tl5.from(('#page3-top h1'), {
        y: 100,
        opacity: 0,
    })
    tl5.from(('#page3-top .underline'), {
        width: 0,
        delay: -0.3
    })

    let tl = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '.gsap-1',
            start: 'top 0%',
        }
    })

    tl.from(".gsap-1 .underline, .gsap-2 .underline", {
        width: 0,
        stagger: .2,
    })
    tl.from(".gsap-1 p, .gsap-2 p", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: .2,
    }, 0)
    tl.from(".gsap-3", {
        y: 25,
        opacity: 0,
        duration: 0.5,
    }, 0)

    let tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '.gsap-4',
            start: 'top -30%',
        }
    })

    gsap.from(".gsap-4", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            scroller: '#main',
            trigger: '.gsap-4',
            start: 'top 30%',
        }
    })

    tl2.from(".gsap-5 .underline, .gsap-6 .underline", {
        width: 0,
        stagger: .2,
    })
    tl2.from(".gsap-5 p, .gsap-6 p", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: .2,
    }, 0)

    let tl4 = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '.gsap-7',
            start: 'top -20%',
        }
    })

    tl4.from(".gsap-7 .underline, .gsap-9 .underline", {
        width: 0,
        stagger: .2,
    })
    tl4.from(".gsap-7 p, .gsap-9 p", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: .2
    }, 0)
    tl2.from(".gsap-8", {
        y: 10,
        opacity: 0,
        duration: 0.5
    }, 0)
}
if (window.innerWidth > 1000) { page3(); }

function page4() {
    let tl = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page4',
            start: 'top 75%',
        }
    })

    tl.from(('#page4-heading h1'), {
        y: 100,
        opacity: 0,
    }, 0)

    tl.from(('#page4-underline1'), {
        width: 0,
        delay: -0.3
    }, 0)

    gsap.from(".page4-para1 p", {
        y: 50,
        stagger: .1,
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page4',
            start: 'top 0%',
        }
    })

    gsap.from("#page4-para2", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page4-para2',
            start: 'top 60%',
        }
    })

    let tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page4-underline2',
            start: 'top 70%',
        }
    })

    tl2.from("#page4-underline2", {
        width: 0,
    }, 0)

    tl2.from("#page4-content>h5", {
        opacity: 0,
    }, 0)
}
if (window.innerWidth > 1000) { page4(); }

function page6() {
    let tl = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page6',
            start: 'top 70%',
        }
    })

    tl.from(('#page6 h1'), {
        y: 100,
        opacity: 0,
    })

    tl.from(('.page6-underline1'), {
        width: 0,
    })

    tl.from(('#page6-flex'), {
        opacity: 0,
        y: 50
    })

    let tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: '#main',
            trigger: '#page6',
            start: 'top 20%',
        }
    })
    tl2.from(('#page6-flex'), {
        opacity: 0,
        y: 50
    })

    tl2.from(('.page6-underline2'), {
        width: 0,
        delay: .2
    })

    tl2.from(('#page6 h5'), {
        opacity: 0,
        delay: .3
    })
}
if (window.innerWidth > 1000) { page6(); }

function page3Resp() {
    let tl = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '#page3-top',
            start: 'top 75%',
        }
    })
    tl.from(('#page3-top h1'), {
        y: 100,
        opacity: 0,
    })
    tl.from(('#page3-top .underline'), {
        width: 0,
        delay: -0.3
    })

    let tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-1',
            start: 'top 50%',
        }
    })
    tl2.from(".gsap-1 .underline", {
        width: 0,
    }, 0)

    tl2.from(".gsap-1 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
    let tl3 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-2',
            start: 'top 50%',
        }
    })
    tl3.from(".gsap-2 .underline", {
        width: 0,
    }, 0)
    tl3.from(".gsap-2 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
    let tl4 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-5',
            start: 'top 20%',
        }
    })
    tl4.from(".gsap-5 .underline", {
        width: 0,

    }, 0)
    tl4.from(".gsap-5 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
    let tl5 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-6',
            start: 'top 20%',
        }
    })
    tl5.from(".gsap-6 .underline", {
        width: 0,

    }, 0)
    tl5.from(".gsap-6 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
    let tl6 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-7',
            start: 'top 50%',
        }
    })
    tl6.from(".gsap-7 .underline", {
        width: 0,

    }, 0)
    tl6.from(".gsap-7 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
    let tl7 = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '.gsap-9',
            start: 'top 50%',
        }
    })
    tl7.from(".gsap-9 .underline", {
        width: 0,

    }, 0)
    tl7.from(".gsap-9 p", {
        y: 10,
        opacity: 0,
        delay: .3
    }, 0)
}
if (window.innerWidth < 1000) { page3Resp(); }

function page4Resp() {
    let tl = gsap.timeline({
        scrollTrigger: {
            scroller: 'body',
            trigger: '#page4',
            start: 'top 75%',
        }
    })

    tl.from(('#page4-heading h1'), {
        y: 100,
        opacity: 0,
    }, 0)

    tl.from(('#page4-underline1'), {
        width: 0,
        delay: -0.3
    }, 0)

    gsap.from(".page4-para1 p", {
        y: 50,
        stagger: .1,
        scrollTrigger: {
            scroller: 'body',
            trigger: '#page4',
            start: 'top 50%',
        }
    })

    gsap.from("#page4-para2", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            scroller: 'body',
            trigger: '#page4-para2',
            start: 'top 60%',
        }
    })
}
if (window.innerWidth < 1000) { page4Resp(); }


function page6Heading() {
    function page6Resp() {
        let tl = gsap.timeline({
            scrollTrigger: {
                scroller: 'body',
                trigger: '#page6',
                start: 'top 70%',
            }
        })
    
        tl.from(('#page6 h1'), {
            y: 100,
            opacity: 0,
        })
    
        tl.from(('.page6-underline1'), {
            width: 0,
        })
    
        tl.from(('#page6-flex'), {
            opacity: 0,
            y: 50
        })
    
        tl.from(('.page6-underline2'), {
            width: 0,
            delay: .2
        })
    
        tl.from(('#page6 h5'), {
            opacity: 0,
            delay: .3
        })
    }
    if (window.innerWidth < 1000) { page6Resp(); }
    
    let footText = document.querySelector("#page6 h1")
    
    
    let splited = footText.textContent.split("")
    let clutter = ""
    splited.forEach(function (e) {
        clutter += `<span>${e}</span>`
    })
    footText.innerHTML = clutter
    
    
    
    
    let footerText = document.querySelector("#page6-heading")
    
    footerText.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()
        tl.to("#page6 h1 span", {
            opacity: 0,
            stagger: 0.1,
            duration: 0.2,
        })
        tl.to("#page6 h1 span", {
            delay: -0.3,
            fontWeight: 100,
            color:"transparent",
            fontFamily: "silk serif",
        })
        tl.to("#page6 h1 span", {
            opacity:1,
            delay: -0.6,
            duration:0.5,
            stagger:0.1
        })
    })
    
    footerText.addEventListener("mouseleave", function () {
        let tl = gsap.timeline()
        tl.to("#page6 h1 span", {
            opacity: 0,
            stagger: 0.1,
            duration: 0.2,
        })
        tl.to("#page6 h1 span", {
            delay: -0.3,
            fontWeight: 500,
            color:"white",
            fontFamily: "Plain Light",
        })
        tl.to("#page6 h1 span", {
            opacity:1,
            delay: -0.6,
            duration:0.5,
            stagger:0.1
        })
    })
}
if (window.innerWidth > 1000) { page6Heading(); }
