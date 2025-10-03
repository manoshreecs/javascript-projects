    const inputEl = document.getElementById('search-input');
    const btnEl   = document.getElementById('search-button');
    const nameEl  = document.getElementById('creature-name');
    const idEl    = document.getElementById('creature-id');
    const weightEl= document.getElementById('weight');
    const heightEl= document.getElementById('height');
    const typesEl = document.getElementById('types');
     const hpEl    = document.getElementById('hp');
    const atkEl   = document.getElementById('attack');
    const defEl   = document.getElementById('defense');
    const spaEl   = document.getElementById('special-attack');
    const spdEl   = document.getElementById('special-defense');
    const speEl   = document.getElementById('speed');
    function clearUI() {
      nameEl.textContent = '';
      idEl.textContent = '';
      weightEl.textContent = '';
      heightEl.textContent = '';
      hpEl.textContent = '';
      atkEl.textContent = '';
      defEl.textContent = '';
      spaEl.textContent = '';
      spdEl.textContent = '';
      speEl.textContent = '';
      typesEl.innerHTML = ''; 
    }
 function upper(x){ return (x ?? '').toString().toUpperCase(); }
function normalizeTypes(types) {
      if (!types) return [];
      if (Array.isArray(types)) {
        return types.map(t =>
          typeof t === 'string' ? t :
          t?.type ?? t?.name ?? t?.label ?? String(t)
        );
      }
      return [];
    }

    function readStat(data, key) {
      if (data[key] != null) return data[key];
 if (data.stats && !Array.isArray(data.stats) && typeof data.stats === 'object') {
        const v = data.stats[key];
        if (v == null) return undefined;
        if (typeof v === 'object') return v.value ?? v.base ?? v.base_stat ?? v.amount;
        return v;
      }

      if (Array.isArray(data.stats)) {
        const found = data.stats.find(s => {
          const n = (s?.name ?? s?.stat?.name ?? s?.label ?? '').toString().toLowerCase();
          return n === key;
        });
        if (!found) return undefined;
        return found.value ?? found.base ?? found.base_stat ?? found.amount ?? found.stat?.base_stat;
      }
      if (data.baseStats) return data.baseStats[key];
 return undefined;
    }

    function fillUI(data) {
     nameEl.textContent = upper(data.name);
     const idVal = data.id ?? data.creature_id ?? data.cid;
      idEl.textContent = idVal != null ? `#${idVal}` : '';
      weightEl.textContent = (data.weight ?? data.mass ?? '').toString();
      heightEl.textContent = (data.height ?? data.size ?? '').toString();
       const types = normalizeTypes(data.types);
      typesEl.innerHTML = '';
      types.forEach(t => {
        const b = document.createElement('span');
        b.textContent = upper(t);
        typesEl.appendChild(b);
      });
      hpEl.textContent  = String(readStat(data, 'hp') ?? '');
      atkEl.textContent = String(readStat(data, 'attack') ?? '');
      defEl.textContent = String(readStat(data, 'defense') ?? '');
      spaEl.textContent = String(readStat(data, 'special-attack') ?? readStat(data,'special_attack') ?? '');
      spdEl.textContent = String(readStat(data, 'special-defense') ?? readStat(data,'special_defense') ?? '');
      speEl.textContent = String(readStat(data, 'speed') ?? '');
    }

    async function searchCreature() {
      const q = inputEl.value.trim();
      if (!q) return; 

      clearUI();

      const url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${encodeURIComponent(q)}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('not-found');
        const data = await res.json();

        if (!data || data.error || data.message === 'Not Found') {
          throw new Error('not-found');
        }

        fillUI(data);
      } catch (e) {
       
        alert('Creature not found');
      }
    }

    btnEl.addEventListener('click', searchCreature);
    
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchCreature();
    });
 