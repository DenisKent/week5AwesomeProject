/* eslint-disable*/

// This file defines the behaviour of the particle background. The variables can be edited as per these docs: https://github.com/VincentGarreau/particles.js/

particlesJS('particle-container', {
  particles: {
    number: {
      value: 3,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#575050',
    },
    shape: {
      type: 'image',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'https://user-images.githubusercontent.com/28222381/43522594-7f3d8870-95a2-11e8-94fd-21b47c168bc2.png',
        width: 500,
        height: 500,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 20,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 15,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'bottom',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
