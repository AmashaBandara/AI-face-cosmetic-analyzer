/**
 * FACE SCORE - SYSTEM CONTROLLER (js/main.js)
 * Multi-Factor Environmental + Face AI Cosmetic Recommendation System
 * Student: Amasha Bandara (2021/asp/59)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initEnvironmentalControls();
  initRecommendationEngine();
  initModelStatusTracker();
  initPrintPrescription();
  if (typeof initLocationAutocomplete === 'function') initLocationAutocomplete();
});

/* ==========================================================================
   1. NAVIGATION & STICKY HEADER
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('mobile-open');
    });
  }

  const sections = document.querySelectorAll('section[id], footer[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. ENVIRONMENTAL INPUT CONTROLS & SLIDERS
   ========================================================================== */
function initEnvironmentalControls() {
  const humiditySlider = document.getElementById('env-humidity');
  const humidityBadge = document.getElementById('humidity-val-badge');
  const tempSlider = document.getElementById('env-temp');
  const tempBadge = document.getElementById('temp-val-badge');

  const inputLocation = document.getElementById('env-location');
  const selectWeather = document.getElementById('env-weather');
  const climateChips = document.querySelectorAll('.chip-btn');

  if (humiditySlider && humidityBadge) {
    humiditySlider.addEventListener('input', (e) => {
      const val = e.target.value;
      let label = "Balanced Moisture";
      if (val > 75) label = "High Humidity / Sweat";
      else if (val < 40) label = "Dry Air / Moisture Loss";
      humidityBadge.innerText = `${val}% (${label})`;
    });
  }

  if (tempSlider && tempBadge) {
    tempSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      let label = "Mild";
      if (val >= 30) label = "Hot / UV Exposure";
      else if (val <= 18) label = "Cool Air";
      tempBadge.innerText = `${val}°C (${label})`;
    });
  }

  // Quick Climate Presets
  climateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      climateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const loc = chip.getAttribute('data-loc');
      const wtr = chip.getAttribute('data-weather');
      const hum = chip.getAttribute('data-hum');
      const tmp = chip.getAttribute('data-temp');

      if (inputLocation) inputLocation.value = `${loc}, Sri Lanka`;
      if (selectWeather) selectWeather.value = wtr;
      if (humiditySlider) {
        humiditySlider.value = hum;
        humiditySlider.dispatchEvent(new Event('input'));
      }
      if (tempSlider) {
        tempSlider.value = tmp;
        tempSlider.dispatchEvent(new Event('input'));
      }
    });
  });
}

/* ==========================================================================
   4. RECOMMENDATION ENGINE & MEDIA INTERACTION
   ========================================================================== */
function initRecommendationEngine() {
  // Tabs & Controls
  const tabUpload = document.getElementById('tab-upload');
  const tabWebcam = document.getElementById('tab-webcam');
  const btnTriggerUpload = document.getElementById('btn-trigger-upload');
  const btnStartWebcam = document.getElementById('btn-start-webcam');
  const btnRunAnalysis = document.getElementById('btn-run-analysis');
  const btnAnalyzeAgain = document.getElementById('btn-analyze-again');
  const fileInput = document.getElementById('demo-file-input');

  // Media Viewport
  const viewport = document.getElementById('media-viewport');
  const placeholder = document.getElementById('viewport-placeholder');
  const imgPreview = document.getElementById('demo-img-preview');
  const videoElement = document.getElementById('demo-webcam-video');
  const canvasElement = document.getElementById('webcam-canvas');
  const scannerLine = document.getElementById('scanner-line');
  const facialOverlay = document.getElementById('facial-overlay');
  const presetThumbs = document.querySelectorAll('.preset-thumb');

  // State Views
  const progressState = document.getElementById('demo-analysis-progress');
  const resultsState = document.getElementById('demo-results-dashboard');
  const dragHint = document.getElementById('drag-hint');

  let activeMediaElement = imgPreview;
  let webcamStream = null;

  // --- Draggable image position state ---
  let imgPosX = 50, imgPosY = 15;
  let isDragging = false, dragStartX = 0, dragStartY = 0;

  function showDragHint() {
    if (!dragHint) return;
    dragHint.classList.remove('visible');
    void dragHint.offsetWidth; // reflow to restart animation
    dragHint.classList.add('visible');
    setTimeout(() => dragHint.classList.remove('visible'), 2900);
  }

  function applyImgPosition() {
    imgPreview.style.objectPosition = `${imgPosX}% ${imgPosY}%`;
  }

  // Mouse drag on viewport
  viewport.addEventListener('mousedown', (e) => {
    if (imgPreview.style.display === 'none') return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    imgPreview.classList.add('is-dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    imgPosX = Math.max(0, Math.min(100, imgPosX - dx * 0.13));
    imgPosY = Math.max(0, Math.min(100, imgPosY - dy * 0.13));
    applyImgPosition();
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    imgPreview.classList.remove('is-dragging');
  });

  // Touch drag on viewport (mobile)
  viewport.addEventListener('touchstart', (e) => {
    if (imgPreview.style.display === 'none') return;
    const t = e.touches[0];
    isDragging = true;
    dragStartX = t.clientX;
    dragStartY = t.clientY;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStartX;
    const dy = t.clientY - dragStartY;
    imgPosX = Math.max(0, Math.min(100, imgPosX - dx * 0.13));
    imgPosY = Math.max(0, Math.min(100, imgPosY - dy * 0.13));
    applyImgPosition();
    dragStartX = t.clientX;
    dragStartY = t.clientY;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', () => { isDragging = false; });

  // Initialize with first sample preset photo
  if (presetThumbs.length > 0) {
    const firstSrc = presetThumbs[0].getAttribute('data-src');
    loadSampleImage(firstSrc);
  }

  tabUpload.addEventListener('click', () => {
    tabUpload.classList.add('active');
    tabWebcam.classList.remove('active');
    stopWebcamStream();
    btnTriggerUpload.style.display = 'inline-flex';
    btnStartWebcam.style.display = 'none';
    videoElement.style.display = 'none';
    if (imgPreview.src) imgPreview.style.display = 'block';
  });

  tabWebcam.addEventListener('click', async () => {
    tabWebcam.classList.add('active');
    tabUpload.classList.remove('active');
    btnTriggerUpload.style.display = 'none';
    btnStartWebcam.style.display = 'inline-flex';
    imgPreview.style.display = 'none';
    placeholder.style.display = 'none';
    await startWebcamStream();
  });

  btnTriggerUpload.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0]));

  viewport.addEventListener('dragover', (e) => {
    e.preventDefault();
    viewport.classList.add('drag-over');
  });

  viewport.addEventListener('dragleave', () => viewport.classList.remove('drag-over'));

  viewport.addEventListener('drop', (e) => {
    e.preventDefault();
    viewport.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  function handleFileSelect(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      imgPreview.src = evt.target.result;
      imgPreview.style.display = 'block';
      placeholder.style.display = 'none';
      videoElement.style.display = 'none';
      stopWebcamStream();
      activeMediaElement = imgPreview;
      presetThumbs.forEach(t => t.classList.remove('active'));
      // Auto-position face to top area for portrait uploads
      imgPreview.onload = () => autoPositionFace(imgPreview);
    };
    reader.readAsDataURL(file);
  }

  // Smart face positioning: analyze image aspect ratio and set initial position
  function autoPositionFace(img) {
    const naturalW = img.naturalWidth  || 1;
    const naturalH = img.naturalHeight || 1;
    const ratio = naturalH / naturalW;

    if (ratio > 1.2) {
      imgPosX = 50; imgPosY = 8;   // portrait — face at very top
    } else if (ratio > 0.9) {
      imgPosX = 50; imgPosY = 20;  // square-ish
    } else {
      imgPosX = 50; imgPosY = 50;  // landscape — center
    }
    applyImgPosition();
    showDragHint(); // show "drag to reposition" tip
  }

  async function startWebcamStream() {
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      });
      videoElement.srcObject = webcamStream;
      videoElement.style.display = 'block';
      placeholder.style.display = 'none';
      activeMediaElement = videoElement;
    } catch (err) {
      alert("Unable to access live camera. Please select or upload a face photo.");
      tabUpload.click();
    }
  }

  function stopWebcamStream() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;
    }
    videoElement.style.display = 'none';
  }

  btnStartWebcam.addEventListener('click', () => {
    if (videoElement.readyState >= 2) {
      canvasElement.width = videoElement.videoWidth || 320;
      canvasElement.height = videoElement.videoHeight || 320;
      const ctx = canvasElement.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      imgPreview.src = canvasElement.toDataURL('image/jpeg');
      imgPreview.style.display = 'block';
      stopWebcamStream();
      activeMediaElement = imgPreview;
      triggerAnalysis();
    }
  });

  presetThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      presetThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const src = thumb.getAttribute('data-src');
      loadSampleImage(src);
    });
  });

  function loadSampleImage(url) {
    stopWebcamStream();
    imgPreview.crossOrigin = "anonymous";
    imgPreview.src = url;
    imgPreview.style.display = 'block';
    placeholder.style.display = 'none';
    videoElement.style.display = 'none';
    activeMediaElement = imgPreview;
    imgPreview.onload = () => autoPositionFace(imgPreview);
  }

  // --- TRIGGER MULTI-FACTOR ANALYSIS ---
  btnRunAnalysis.addEventListener('click', triggerAnalysis);

  async function triggerAnalysis() {
    if (!activeMediaElement) return;

    // Gather Environmental Inputs
    const envInputs = {
      location: document.getElementById('env-location').value || "Colombo, Sri Lanka",
      weather: document.getElementById('env-weather').value || "Sunny / Hot",
      humidity: document.getElementById('env-humidity').value || "78",
      temperature: document.getElementById('env-temp').value || "31"
    };

    resultsState.classList.remove('active');
    progressState.style.display = 'flex';
    scannerLine.classList.add('scanning');
    facialOverlay.classList.add('active');

    for (let i = 1; i <= 6; i++) {
      const stepItem = document.getElementById(`tracker-step-${i}`);
      if (stepItem) stepItem.classList.remove('active', 'completed');
    }

    try {
      const analysisOutput = await window.skinAnalyzer.analyzeFaceWithEnvironment(
        activeMediaElement,
        envInputs,
        (stageNum, message) => {
          updateStageTracker(stageNum, message);
        }
      );

      scannerLine.classList.remove('scanning');
      facialOverlay.classList.remove('active');
      progressState.style.display = 'none';

      renderCosmeticResults(analysisOutput.cosmeticResults);

      // Scroll smoothly to results dashboard
      resultsState.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
      console.error("System Analysis Error:", error);
      scannerLine.classList.remove('scanning');
      facialOverlay.classList.remove('active');
      progressState.style.display = 'none';
      alert("An error occurred during facial & climate analysis. Please try again.");
    }
  }

  function updateStageTracker(stageNum, message) {
    const statusText = document.getElementById('current-step-status-text');
    if (statusText) statusText.innerText = message;

    for (let i = 1; i <= 6; i++) {
      const stepItem = document.getElementById(`tracker-step-${i}`);
      if (!stepItem) continue;

      if (i < stageNum) {
        stepItem.classList.remove('active');
        stepItem.classList.add('completed');
      } else if (i === stageNum) {
        stepItem.classList.add('active');
        stepItem.classList.remove('completed');
      } else {
        stepItem.classList.remove('active', 'completed');
      }
    }
  }

  function renderCosmeticResults(results) {
    const { skinType, condition, skinScore, environmentalContext, morningRoutine, eveningRoutine, foundationMatch } = results;

    // Score & Metrics
    document.getElementById('res-score-num').innerText = skinScore;
    document.getElementById('res-skin-type').innerText = skinType;
    document.getElementById('res-condition').innerText = condition;

    const scoreLabel = document.getElementById('res-score-label');
    const scoreDesc = document.getElementById('res-score-desc');

    if (skinScore >= 90) {
      scoreLabel.innerText = "Optimal Radiance";
      scoreDesc.innerText = "Facial skin parameters show strong barrier function under current climate parameters.";
    } else if (skinScore >= 80) {
      scoreLabel.innerText = "Healthy / Balanced";
      scoreDesc.innerText = "Good skin barrier condition with minor climate adjustments required.";
    } else {
      scoreLabel.innerText = "Requires Targeted Care";
      scoreDesc.innerText = "Current humidity & weather conditions are placing stress on your moisture barrier.";
    }

    // Gauge Circle Animation
    const circleBar = document.getElementById('score-circle-bar');
    const targetOffset = 283 - (283 * (skinScore / 100));
    circleBar.style.strokeDashoffset = '283';

    // Environmental Impact Alert Box
    document.getElementById('res-env-title').innerText = environmentalContext.impactTitle;
    document.getElementById('res-env-desc').innerText = environmentalContext.impactDesc;

    // Render Morning Skincare Routine List
    const morningList = document.getElementById('res-morning-list');
    morningList.innerHTML = morningRoutine.map(item => `
      <li class="routine-item">
        <span class="routine-step-tag">${item.step}</span>
        <span class="routine-product-text">${item.product}</span>
      </li>
    `).join('');

    // Render Evening Skincare Routine List
    const eveningList = document.getElementById('res-evening-list');
    eveningList.innerHTML = eveningRoutine.map(item => `
      <li class="routine-item" style="border-left-color:var(--accent-purple);">
        <span class="routine-step-tag" style="color:var(--accent-purple);">${item.step}</span>
        <span class="routine-product-text">${item.product}</span>
      </li>
    `).join('');

    // Render Cosmetic Foundation & Makeup Match
    const foundationBox = document.getElementById('res-foundation-box');
    foundationBox.innerHTML = `
      <div class="routine-item" style="border-left-color:var(--accent-teal);">
        <span class="routine-step-tag" style="color:var(--accent-teal);">Foundation Finish</span>
        <span class="routine-product-text">${foundationMatch.finish}</span>
      </div>
      <div class="routine-item" style="border-left-color:var(--accent-teal);">
        <span class="routine-step-tag" style="color:var(--accent-teal);">Recommended Shade</span>
        <span class="routine-product-text">${foundationMatch.shadeCategory} (${foundationMatch.coverage})</span>
      </div>
      <div class="routine-item" style="border-left-color:var(--accent-teal);">
        <span class="routine-step-tag" style="color:var(--accent-teal);">Primer & Setting</span>
        <span class="routine-product-text">${foundationMatch.primer} + ${foundationMatch.setting}</span>
      </div>
    `;

    resultsState.classList.add('active');
    setTimeout(() => {
      circleBar.style.strokeDashoffset = targetOffset;
    }, 150);
  }

  if (btnAnalyzeAgain) {
    btnAnalyzeAgain.addEventListener('click', () => {
      resultsState.classList.remove('active');
      document.getElementById('system-console').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. MODEL STATUS TRACKER
   ========================================================================== */
function initModelStatusTracker() {
  if (!window.skinAnalyzer) return;
  window.skinAnalyzer.loadModel((statusMsg) => {
    const toast = document.getElementById('toast-alert');
    if (toast && statusMsg.includes("Ready")) {
      toast.innerText = "TensorFlow.js MobileNetV2 Engaged & Ready!";
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2800);
    }
  });
}

/* ==========================================================================
   6. PRINT BEAUTY PRESCRIPTION MODAL
   ========================================================================== */
function initPrintPrescription() {
  const btnPrint = document.getElementById('btn-print-prescription');
  const overlay  = document.getElementById('print-modal-overlay');
  const btnConfirmPrint = document.getElementById('btn-confirm-print');
  const btnClose = document.getElementById('btn-close-print-modal');

  if (!btnPrint || !overlay) return;

  // --- Open Modal & Populate Prescription ---
  btnPrint.addEventListener('click', () => {
    // Gather rendered results from the dashboard
    const scoreNum   = document.getElementById('res-score-num')?.innerText  || '--';
    const scoreLabel = document.getElementById('res-score-label')?.innerText || '';
    const skinType   = document.getElementById('res-skin-type')?.innerText  || '';
    const condition  = document.getElementById('res-condition')?.innerText  || '';
    const envTitle   = document.getElementById('res-env-title')?.innerText  || '';
    const envDesc    = document.getElementById('res-env-desc')?.innerText   || '';
    const location   = document.getElementById('env-location')?.value       || '';
    const weather    = document.getElementById('env-weather')?.value        || '';
    const humidity   = document.getElementById('env-humidity')?.value       || '';
    const temp       = document.getElementById('env-temp')?.value           || '';

    // Get routine lists by cloning rendered HTML
    const morningItems = document.querySelectorAll('#res-morning-list .routine-item');
    const eveningItems = document.querySelectorAll('#res-evening-list .routine-item');
    const foundationItems = document.querySelectorAll('#res-foundation-box .routine-item');

    // Populate prescription metadata
    const now = new Date();
    document.getElementById('rx-date-time').innerText =
      now.toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) +
      ' · ' + now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });

    document.getElementById('rx-location-meta').innerText =
      `📍 ${location} · ${weather} · ${humidity}% Humidity · ${temp}°C`;

    // Score gauge
    const rxScore = parseInt(scoreNum, 10) || 0;
    document.getElementById('rx-score-num').innerText   = rxScore;
    document.getElementById('rx-score-label').innerText = scoreLabel;

    const rxCircle = document.getElementById('rx-circle-bar');
    if (rxCircle) {
      rxCircle.style.strokeDashoffset = '264';
      setTimeout(() => {
        rxCircle.style.strokeDashoffset = String(264 - (264 * rxScore / 100));
      }, 120);
    }

    // Tags
    document.getElementById('rx-skin-type-tag').innerText = `Skin: ${skinType}`;
    document.getElementById('rx-condition-tag').innerText  = condition;
    document.getElementById('rx-weather-tag').innerText    = weather;

    // Environmental alert
    document.getElementById('rx-env-title').innerText = envTitle;
    document.getElementById('rx-env-desc').innerText  = envDesc;

    // Morning routine list
    const rxMorning = document.getElementById('rx-morning-list');
    rxMorning.innerHTML = '';
    morningItems.forEach(item => {
      const stepTag  = item.querySelector('.routine-step-tag')?.innerText  || '';
      const stepProd = item.querySelector('.routine-product-text')?.innerText || '';
      const li = document.createElement('li');
      li.innerHTML = `<span class="rx-step-label">${stepTag}</span><span class="rx-step-product">${stepProd}</span>`;
      rxMorning.appendChild(li);
    });

    // Evening routine list
    const rxEvening = document.getElementById('rx-evening-list');
    rxEvening.innerHTML = '';
    eveningItems.forEach(item => {
      const stepTag  = item.querySelector('.routine-step-tag')?.innerText  || '';
      const stepProd = item.querySelector('.routine-product-text')?.innerText || '';
      const li = document.createElement('li');
      li.innerHTML = `<span class="rx-step-label">${stepTag}</span><span class="rx-step-product">${stepProd}</span>`;
      rxEvening.appendChild(li);
    });

    // Foundation match grid
    const rxFoundGrid = document.getElementById('rx-foundation-grid');
    rxFoundGrid.innerHTML = '';
    foundationItems.forEach(item => {
      const label = item.querySelector('.routine-step-tag')?.innerText  || '';
      const val   = item.querySelector('.routine-product-text')?.innerText || '';
      rxFoundGrid.innerHTML += `
        <div class="rx-foundation-item">
          <div class="rx-foundation-label">${label}</div>
          <div class="rx-foundation-val">${val}</div>
        </div>`;
    });

    // Open modal with animation
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // --- Print from Modal ---
  btnConfirmPrint.addEventListener('click', () => {
    window.print();
  });

  // --- Close Modal ---
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closeModal);

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}
