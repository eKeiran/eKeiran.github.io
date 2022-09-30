function tilter(element, configs) {
  const tilter = document.querySelectorAll(element);

  let conf = {
    perspective: configs != undefined && configs.perspective ? parseInt(configs.perspective) : 400,
    maxTilt: configs != undefined && configs.maxTilt ? parseInt(configs.maxTilt) : 4,
    mantain: configs != undefined && configs.mantain ? Boolean(configs.mantain) : false,
    fx3d: configs != undefined && configs.fx3d ? Boolean(configs.fx3d) : false,
    fxDistance: configs != undefined && configs.fxDistance ? parseInt(configs.fxDistance) : 30,
  }

  for (const item of tilter) {

    if (conf.fx3d) {
      for (const child of item.children) {
        if (child.classList.contains('fx3d')) {
          child.setAttribute('style', `transform: translateZ(${conf.fxDistance}px) scale(0.7);`)
        }
      }
    }

    item.setAttribute('style', `will-change: transform; transform-style: preserve-3d; transform: perspective(${conf.perspective}px) rotateY(0deg) rotateX(0deg);`)

    let enter = false;
    item.addEventListener('mouseenter', () => {
      enter = true;
      setTimeout(() => {
        enter = false;
      }, 200);
    });

    item.addEventListener('mousemove', e => {
      let left = (e.clientX - item.getBoundingClientRect().left) - (item.offsetWidth / 2);
      let top = (e.clientY - item.getBoundingClientRect().top) - (item.offsetHeight / 2);

      let xNatural = (((left / item.offsetWidth) * 2) * 100).toFixed(0)
      let xPercent = xNatural - xNatural * 2;
      let yPercent = (((top / item.offsetHeight) * 2) * 100).toFixed(0);

      let xAxis = (xPercent * (conf.maxTilt / 100)).toFixed(2);
      let yAxis = (yPercent * (conf.maxTilt / 100)).toFixed(2);

      if (enter) {
        item.setAttribute('style', `transition: .3s cubic-bezier(.03,.98,.52,.99); will-change: transform; transform-style: preserve-3d; transform: perspective(${conf.perspective}px) rotateY(${xAxis}deg) rotateX(${yAxis}deg);`);
      } else {
        item.setAttribute('style', `will-change: transform; transform-style: preserve-3d; transform: perspective(${conf.perspective}px) rotateY(${xAxis}deg) rotateX(${yAxis}deg);`);
      }

    });

    if (!conf.mantain) {
      item.addEventListener('mouseleave', () => {
        item.setAttribute('style', `transition: all .3s ease-in-out 0s; will-change: transform; transform-style: preserve-3d; transform: perspective(${conf.perspective}px) rotateY(0deg) rotateX(0deg);`)
      });
    }
  }
}
