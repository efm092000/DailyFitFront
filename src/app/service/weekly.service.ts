import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeeklyService {
  private apiUrl ="http://localhost:8080/api/weekly/${wid}";

  constructor(private HttpClient) {
    let weekly ='?';
    if (weekly.wid) {weekly = weekly + `wid=${weekly.wid}&`;}
    if (weekly.name) {weekly = weekly + `wid=${weekly.name}&`;}
    if (weekly.email) {weekly = weekly + `wid=${weekly.email}&`;}

  }

  async loadWeekly(user:any) {
    let weeklyPlanContainer = await loadTemplate('/body/weekly/weekly.html');
    replaceBody(weeklyPlanContainer);
    weeklyPlanContainer = document.querySelector('.weekly-page');

    await loadPopup(weeklyPlanContainer, user);
    loadAddRoutineButton(weeklyPlanContainer);
    await loadWeeklyPlan(user, weeklyPlanContainer);
    await loadDaysOfWeekTemplate(weeklyPlanContainer);

    await loadWeeklyPlanSelectorAction(weeklyPlanContainer, user);
    loadTitleAction(user, weeklyPlanContainer);
  }

  loadTitleAction(user, weeklyPlanContainer) {
    weeklyPlanContainer.querySelector('.weekly-title').addEventListener('change', async function () {
      let selector = weeklyPlanContainer.querySelector('.weekly-plans-selector');
      let wid = selector.value;
      await fetch(`http://localhost:8080/api/weekly/${wid}?name=${this.value}`, {
        method: 'PUT'
      });
      selector.options[selector.selectedIndex].label = this.value;
    });
  }

  reloadContent(weeklyPlanContainer, wid) {
    loadRoutines(weeklyPlanContainer, wid);
  }

  loadAddRoutineButton(weeklyPlanContainer) {
    let addRoutineButton = weeklyPlanContainer.querySelector('.weekly-add-routine-button');
    addRoutineButton.addEventListener('click', async function () {
      let popup = weeklyPlanContainer.querySelector('.popup-container');
      popup.style.display = '';
    });
  }

  async loadWeeklyPlan(user, weeklyPlanContainer) {
    let weeklyPlansJson = await fetch(`http://localhost:8080/api/user/${user.email}/weeklies`).then(response => response.json());
    let weeklyPlansSelector = loadWeeklyPlanSelector(weeklyPlanContainer, user);
    for (const weeklyPlan of weeklyPlansJson) {
      let option = document.createElement('option');
      option.label = weeklyPlan.name;
      option.value = weeklyPlan.wid;
      option.classList.add('option-weekly-plan');
      weeklyPlansSelector.appendChild(option);
    }
  }

  loadWeeklyPlanSelector(weeklyPlanContainer) {
    let weeklyPlansSelector = weeklyPlanContainer.querySelector('.weekly-plans-selector');
    weeklyPlansSelector.innerHTML = '';

    let defaultOption = loadDefaultOption();
    weeklyPlansSelector.appendChild(defaultOption);

    let createOption = loadCreateOption();
    weeklyPlansSelector.appendChild(createOption);
    return weeklyPlansSelector;
  }

  async loadWeeklyPlanSelectorAction(weeklyPlanContainer, user) {
    let weeklyPlansSelector = weeklyPlanContainer.querySelector('.weekly-plans-selector');
    weeklyPlansSelector.addEventListener('change', async function () {
      if (this.value === 'create') {
        await createNewWeeklyPlan(weeklyPlanContainer, user);
        return;
      }
      await loadRoutines(weeklyPlanContainer, this.value);
    });
  }

  async createNewWeeklyPlan(weeklyPlanContainer, user) {
    let wid = await fetch(`http://localhost:8080/api/weekly/${user.email}?name=New_Weekly_Plan`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(json => json.wid);
    await loadRoutines(weeklyPlanContainer, wid);
    await loadWeeklyPlan(user, weeklyPlanContainer);
    weeklyPlanContainer.querySelector('.weekly-plans-selector').value = wid;
  }

  loadDefaultOption() {
    let defaultOption = document.createElement('option');
    defaultOption.label = 'Select a weekly plan';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    return defaultOption;
  }

   loadCreateOption() {
    let createWeeklyPlanOption = document.createElement('option');
    createWeeklyPlanOption.label = 'Create a new weekly plan';
    createWeeklyPlanOption.value = 'create';
    return createWeeklyPlanOption;
  }

  async loadRoutines(weeklyPlanContainer, wid) {
    let json = await fetch(`http://localhost:8080/api/weekly/${wid}/routines`).then(response => response.json());
    weeklyPlanContainer.querySelector('.weekly-title').value = await fetch(`http://localhost:8080/api/weekly/${wid}`).then(response => response.json()).then(json => json.name);
    clearTable(weeklyPlanContainer);
    transformData(json);
    for (const routine of json) {
      await loadRoutine(weeklyPlanContainer, routine.rid, routine.day);
    }
  }

  clearTable(weeklyPlanContainer) {
    weeklyPlanContainer.querySelectorAll('.day-content').forEach(dayContent => {
      dayContent.innerHTML = '';
    });
  }

  function transformData(json) {
    const dayMap = {
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
      7: 'sunday'
    }
    json.forEach(routine => {
      routine.day = dayMap[routine.day];
    })
  }

  async loadRoutine(weeklyPlanContainer, rid, day) {
    let name = await fetch(`http://localhost:8080/api/routine/${rid}`)
      .then(response => response.json())
      .then(json => json.name);
    let dayContainer = weeklyPlanContainer.querySelector(`#weekly-${day}`);
    let dayContentContainer = dayContainer.querySelector('.day-content');
    dayContentContainer.appendChild(loadCard(rid, name));
  }

  loadCard(rid, name) {
    let card = document.createElement('button');
    card.innerText = name;
    card.classList.add('btn-routine-card');
    card.addEventListener('click', async function () {
      await loadRoutineBody(rid);
    });
    return card;
  }
  loadDaysOfWeekTemplate(weekly) {
    let daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of daysOfWeek) {
      let dayTemplate = await loadTemplate('/body/weekly/day-container/day-container.html');
      dayTemplate.querySelector('.day-title').innerText = day;
      weekly.querySelector(`#weekly-${day}`).appendChild(dayTemplate);
    }
  }
  loadWeeklyPlanSelector(weeklyPlanContainer) {
    let weeklyPlansSelector = weeklyPlanContainer.querySelector('.weekly-plans-selector');
    weeklyPlansSelector.innerHTML = '';

    let defaultOption = loadDefaultOption();
    weeklyPlansSelector.appendChild(defaultOption);

    let createOption = loadCreateOption();
    weeklyPlansSelector.appendChild(createOption);
    return weeklyPlansSelector;
  }


  loadCreateOption() {
    let createWeeklyPlanOption = document.createElement('option');
    createWeeklyPlanOption.label = 'Create a new weekly plan';
    createWeeklyPlanOption.value = 'create';
    return createWeeklyPlanOption;
  }
}
