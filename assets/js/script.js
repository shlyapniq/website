"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var terminalContainer = document.getElementById("terminal");
  var terminalText      = document.getElementById("terminal-text");
  var videoBackground   = document.getElementById("myVideo");
  var audioBackground   = document.getElementById("myAudio");
  var blurredBox        = document.getElementById("blurred-box");
  var closeButton       = document.getElementById("close-button");

  if (videoBackground && typeof videoBackground.pause === "function") { videoBackground.pause(); }
  if (audioBackground && typeof audioBackground.pause === "function") { audioBackground.pause(); }

  if (terminalText) { terminalText.textContent = "Press Enter To Continue"; }

  document.addEventListener('DOMContentLoaded', () => {
    const v = document.getElementById('myVideo');
    if (!v) return;
    // Гарантируем inline-воспроизведение на мобильных (iOS/Android)
    v.muted = true;
    v.playsInline = true;
    v.webkitPlaysInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');

    // Попытка запустить видео программно (чтобы обойти блокировки)
    const p = v.play();
    if (p && p.catch) p.catch(() => { /* silent */ });
  });

    const videoBg = document.getElementById('video-background');

    // По умолчанию работает ::before, без добавления классов
    // Эта функция включает или выключает ::after
    function toggleBackgroundLayer() {
    videoBg.classList.toggle('after-mode');
    }

// Включить/выключить оверлей ::after


  function handleInput() {
    removeEventListeners();

    if (terminalContainer) { terminalContainer.style.display = "none"; }
    if (blurredBox) { blurredBox.style.display = "block"; }

    if (videoBackground && typeof videoBackground.play === "function") {
      if (/iPhone|iPad|iPod/.test(navigator.userAgent) && videoBackground.muted === false) {
        videoBackground.muted = true;
      }
      videoBackground.play().catch(function () {});
    }
    if (audioBackground && typeof audioBackground.play === "function") {
      audioBackground.play().catch(function () {});
    }

  
    // Включить/выключить оверлей ::after
    document.getElementById('video-background').classList.toggle('after-mode');




  }

  function handleKeyPress(event) {
    if (event.key === "Enter") { handleInput(); }
  }

  function handleClick() { handleInput(); }

  function addEventListeners() {
    document.addEventListener("keydown", handleKeyPress);
    if (terminalContainer) { terminalContainer.addEventListener("click", handleClick); }
    if (closeButton) { closeButton.addEventListener("click", handleClick); }
  }

  function removeEventListeners() {
    document.removeEventListener("keydown", handleKeyPress);
    if (terminalContainer) { terminalContainer.removeEventListener("click", handleClick); }
    if (closeButton) { closeButton.removeEventListener("click", handleClick); }
  }

  function centerTerminal() {
    if (!terminalContainer) { return; }
    var w = terminalContainer.offsetWidth;
    var h = terminalContainer.offsetHeight;
    var x = Math.max(0, (window.innerWidth  - w) / 2);
    var y = Math.max(0, (window.innerHeight - h) / 2);
    terminalContainer.style.position = "absolute";
    terminalContainer.style.left = x + "px";
    terminalContainer.style.top  = y + "px";
  }

  if (terminalText) { terminalText.style.textAlign = "center"; }

  var maxVolume = 0.1;
  function limitVolume(volume) {
    if (!audioBackground) { return; }
    audioBackground.volume = Math.min(volume, maxVolume);
  }
  limitVolume(0.1);

  centerTerminal();
  window.addEventListener("resize", centerTerminal);
  addEventListeners();
});
