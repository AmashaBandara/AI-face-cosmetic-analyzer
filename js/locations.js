/**
 * FACE SCORE AI — Sri Lanka Location Autocomplete Engine
 * All 25 Districts + Major Towns
 * Amasha Bandara (2021/asp/59)
 */

const SL_LOCATIONS = [
  {
    d: "Colombo",
    t: ["Colombo", "Pettah", "Borella", "Bambalapitiya", "Dehiwala", "Moratuwa",
        "Mount Lavinia", "Kotte", "Nugegoda", "Maharagama", "Kesbewa", "Homagama",
        "Kaduwela", "Kolonnawa", "Wellampitiya", "Ratmalana", "Wattala", "Rajagiriya",
        "Battaramulla", "Mulleriyawa"]
  },
  {
    d: "Gampaha",
    t: ["Gampaha", "Negombo", "Wattala", "Kelaniya", "Ja-Ela", "Ragama",
        "Minuwangoda", "Veyangoda", "Divulapitiya", "Mirigama", "Katana",
        "Mahara", "Nittambuwa", "Attanagalla", "Dompe", "Biyagama"]
  },
  {
    d: "Kalutara",
    t: ["Kalutara", "Panadura", "Beruwala", "Aluthgama", "Matugama", "Horana",
        "Bandaragama", "Ingiriya", "Wadduwa", "Bulathsinhala", "Palindanuwara",
        "Payagala", "Dodangoda"]
  },
  {
    d: "Kandy",
    t: ["Kandy", "Peradeniya", "Gampola", "Nawalapitiya", "Katugastota",
        "Kundasale", "Digana", "Akurana", "Wattegama", "Teldeniya", "Gelioya",
        "Pilimathalawa", "Kadugannawa", "Daulagala", "Medamahanuwara"]
  },
  {
    d: "Matale",
    t: ["Matale", "Dambulla", "Sigiriya", "Rattota", "Galewela", "Ukuwela",
        "Pallepola", "Yatawatta", "Naula", "Laggala", "Wilgamuwa"]
  },
  {
    d: "Nuwara Eliya",
    t: ["Nuwara Eliya", "Hatton", "Talawakele", "Kotagala", "Ginigathena",
        "Maskeliya", "Ragala", "Bogawantalawa", "Walapane", "Lindula",
        "Pundaluoya", "Nanuoya"]
  },
  {
    d: "Galle",
    t: ["Galle", "Hikkaduwa", "Ambalangoda", "Ahangama", "Karapitiya",
        "Elpitiya", "Baddegama", "Balapitiya", "Unawatuna", "Bentota",
        "Koggala", "Habaraduwa", "Yakkalamulla"]
  },
  {
    d: "Matara",
    t: ["Matara", "Weligama", "Akuressa", "Deniyaya", "Dickwella", "Hakmana",
        "Mulatiyana", "Thihagoda", "Kamburugamuwa", "Pitabeddara", "Kotapola",
        "Kirinda Puhulwella"]
  },
  {
    d: "Hambantota",
    t: ["Hambantota", "Tangalle", "Tissamaharama", "Embilipitiya", "Ambalantota",
        "Sooriyawewa", "Beliatta", "Weeraketiya", "Kirinda", "Kataragama",
        "Okewela", "Angunakolapelessa"]
  },
  {
    d: "Jaffna",
    t: ["Jaffna", "Nallur", "Point Pedro", "Chavakachcheri", "Valvettithurai",
        "Kopay", "Manipay", "Chunnakam", "Karaveddy", "Sandilipay",
        "Kayts", "Uduvil", "Tellippalai", "Nainativu"]
  },
  {
    d: "Kilinochchi",
    t: ["Kilinochchi", "Paranthan", "Pooneryn", "Karachchi", "Poonakary",
        "Kandavalai"]
  },
  {
    d: "Mannar",
    t: ["Mannar", "Murunkan", "Madhu", "Nanattan", "Pesalai", "Manthai",
        "Adampan", "Musali"]
  },
  {
    d: "Mullaitivu",
    t: ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Maritimepattu",
        "Welioya", "Mannar Thivu", "Thunukkai"]
  },
  {
    d: "Vavuniya",
    t: ["Vavuniya", "Cheddikulam", "Omanthai", "Vavuniya South", "Nedunkerni",
        "Vengalacheddikulam"]
  },
  {
    d: "Ampara",
    t: ["Ampara", "Kalmunai", "Akkaraipattu", "Sammanthurai", "Pottuvil",
        "Uhana", "Damana", "Lahugala", "Mahaoya", "Nintavur",
        "Padiyathalawa", "Dehiattakandiya"]
  },
  {
    d: "Batticaloa",
    t: ["Batticaloa", "Kattankudy", "Valachchenai", "Chenkaladi", "Eravur",
        "Kaluwanchikudy", "Paddippalai", "Mankerni", "Vakarai"]
  },
  {
    d: "Trincomalee",
    t: ["Trincomalee", "Kinniya", "Mutur", "Kantale", "Seruvila",
        "Kuchchaveli", "Thampalakamam", "Gomarankadawala", "Morawewa",
        "Padavi Sripura"]
  },
  {
    d: "Anuradhapura",
    t: ["Anuradhapura", "Kekirawa", "Medawachchiya", "Mihintale", "Nochchiyagama",
        "Thalawa", "Eppawala", "Tambuttegama", "Kahatagasdigiliya", "Padaviya",
        "Horowpothana", "Galenbindunuwewa", "Galnewa", "Nachchaduwa",
        "Rajanganaya", "Ipalogama", "Kebithigollewa"]
  },
  {
    d: "Polonnaruwa",
    t: ["Polonnaruwa", "Hingurakgoda", "Medirigiriya", "Dimbulagala", "Habarana",
        "Giritale", "Manampitiya", "Aralaganwila", "Kaduruwela",
        "Lankapura", "Elahera"]
  },
  {
    d: "Kurunegala",
    t: ["Kurunegala", "Kuliyapitiya", "Maho", "Nikaweratiya", "Wariyapola",
        "Pannala", "Giriulla", "Narammala", "Alawwa", "Dummalasooriya",
        "Hettipola", "Polpithigama", "Bingiriya", "Ibbagamuwa", "Polgahawela",
        "Kobeigane", "Ganewatta"]
  },
  {
    d: "Puttalam",
    t: ["Puttalam", "Chilaw", "Wennappuwa", "Marawila", "Kalpitiya",
        "Dankotuwa", "Anamaduwa", "Nattandiya", "Mundel", "Bangadeniya",
        "Nawagattegama", "Pallama"]
  },
  {
    d: "Badulla",
    t: ["Badulla", "Bandarawela", "Ella", "Haputale", "Welimada", "Passara",
        "Mahiyanganaya", "Hali-Ela", "Soranathota", "Uva Paranagama",
        "Lunugala", "Meegahakivula", "Kandaketiya"]
  },
  {
    d: "Monaragala",
    t: ["Monaragala", "Bibile", "Wellawaya", "Medagama", "Buttala",
        "Kataragama", "Siyambalanduwa", "Madulla", "Badalkumbura",
        "Thanamalvila", "Bibila"]
  },
  {
    d: "Ratnapura",
    t: ["Ratnapura", "Balangoda", "Pelmadulla", "Kolonna", "Kuruwita",
        "Eheliyagoda", "Godakawela", "Kahawatta", "Kalawana", "Kiriella",
        "Nivithigala", "Weligepola", "Imbulpe"]
  },
  {
    d: "Kegalle",
    t: ["Kegalle", "Mawanella", "Warakapola", "Rambukkana", "Dehiowita",
        "Galigamuwa", "Ruwanwella", "Aranayake", "Yatiyantota",
        "Deraniyagala", "Bulathkohupitiya", "Karawanella"]
  }
];

/* ==========================================================================
   Location Autocomplete Engine
   ========================================================================== */
function initLocationAutocomplete() {
  const input    = document.getElementById('env-location');
  const dropdown = document.getElementById('location-dropdown');
  if (!input || !dropdown) return;

  let allItems  = [];
  let activeIdx = -1;

  /* --- Build & render suggestions --- */
  function buildDropdown(query) {
    const q = query.trim().toLowerCase();

    if (!q || q.length < 1) { closeDropdown(); return; }

    const results = [];
    SL_LOCATIONS.forEach(({ d, t }) => {
      const matched = t.filter(town =>
        town.toLowerCase().includes(q) || d.toLowerCase().includes(q)
      );
      if (matched.length) results.push({ district: d, towns: matched });
    });

    if (!results.length) { closeDropdown(); return; }

    allItems = [];
    dropdown.innerHTML = '';

    results.forEach(({ district, towns }) => {
      // District label header
      const header = document.createElement('div');
      header.className = 'loc-district-header';
      header.innerHTML = `<span class="loc-flag">🇱🇰</span> ${district} District`;
      dropdown.appendChild(header);

      towns.forEach(town => {
        const item = document.createElement('div');
        item.className = 'loc-town-item';
        // Highlight matched chars
        const highlighted = highlightMatch(town, q);
        item.innerHTML = `
          <svg class="loc-pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="loc-town-name">${highlighted}</span>
          <span class="loc-district-tag">${district}</span>`;

        item.addEventListener('mousedown', e => {
          e.preventDefault();
          selectLocation(town, district);
        });
        dropdown.appendChild(item);
        allItems.push(item);
      });
    });

    activeIdx = -1;
    dropdown.classList.add('open');
  }

  /* Highlight matching substring */
  function highlightMatch(text, q) {
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return text.slice(0, idx) +
           `<mark class="loc-match">${text.slice(idx, idx + q.length)}</mark>` +
           text.slice(idx + q.length);
  }

  /* --- Select a location --- */
  function selectLocation(town, district) {
    input.value = `${town}, ${district}, Sri Lanka`;
    closeDropdown();
    // Trigger chip deselect since user typed custom location
    document.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
  }

  /* --- Close dropdown --- */
  function closeDropdown() {
    dropdown.classList.remove('open');
    allItems = [];
    activeIdx = -1;
  }

  /* --- Keyboard navigation --- */
  input.addEventListener('keydown', e => {
    if (!dropdown.classList.contains('open')) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, allItems.length - 1);
      highlightActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      highlightActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && allItems[activeIdx]) {
        allItems[activeIdx].dispatchEvent(new MouseEvent('mousedown'));
      } else {
        closeDropdown();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  function highlightActive() {
    allItems.forEach((item, i) => item.classList.toggle('highlighted', i === activeIdx));
    if (activeIdx >= 0 && allItems[activeIdx]) {
      allItems[activeIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  /* --- Events --- */
  input.addEventListener('input',  e => buildDropdown(e.target.value));
  input.addEventListener('focus',  e => { if (e.target.value.trim()) buildDropdown(e.target.value); });
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) closeDropdown();
  });
}
