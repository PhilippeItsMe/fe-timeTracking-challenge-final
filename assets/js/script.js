// Const for button content
const dailyElement = document.getElementById('daily');
const weeklyElement = document.getElementById('weekly');
const monthlyElement = document.getElementById('monthly');

// Const for data content
const workHoursElement = document.getElementById('work-hours');
const workLastWeekElement = document.getElementById('work-last-week-hours');
const playHoursElement = document.getElementById('play-hours');
const playLastWeekElement = document.getElementById('play-last-week-hours');
const studyHoursElement = document.getElementById('study-hours');
const studyLastWeekElement = document.getElementById('study-last-week-hours');
const exerciseHoursElement = document.getElementById('exercise-hours');
const exerciseLastWeekElement = document.getElementById('exercise-last-week-hours');
const socialHoursElement = document.getElementById('social-hours');
const socialLastWeekElement = document.getElementById('social-last-week-hours');
const careHoursElement = document.getElementById('self-care-hours');
const careLastWeekElement = document.getElementById('self-care-last-week-hours');

let selectedElement = null;
let timeTrackingData = []; // To stock JS data

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        timeTrackingData = data;
        
        // Start with default data
        updateDataDisplay(weeklyElement);
        selectButton(weeklyElement);
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

//Reset all button design
function resetAllButtons() {
    [dailyElement, weeklyElement, monthlyElement].forEach(element => {
        element.style.color = 'var(--ultralightnavyblue)';
    });
}

//Call the Reset all button design function and design the selected one
function selectButton(element) {
    resetAllButtons();
    selectedElement = element;
    element.style.color = 'var(--offwhite)'; 
    
    updateDataDisplay(element);
}

// Daily events
dailyElement.addEventListener('click', function() {
    selectButton(this);
});

dailyElement.addEventListener('mouseenter', function() {
    if (selectedElement !== this) { 
        this.style.color = 'var(--offwhite)';
    }
    this.style.cursor = 'pointer';
});

dailyElement.addEventListener('mouseleave', function() {
    if (selectedElement !== this) { 
        this.style.color = 'var(--ultralightnavyblue)';
    }
});


// Weekly events
weeklyElement.addEventListener('click', function() {
    selectButton(this);
});

weeklyElement.addEventListener('mouseenter', function() {
    if (selectedElement !== this) {
        this.style.color = 'var(--offwhite)';
    }
    this.style.cursor = 'pointer';
});

weeklyElement.addEventListener('mouseleave', function() {
    if (selectedElement !== this) {
        this.style.color = 'var(--ultralightnavyblue)';
    }
});

// Monthly events
monthlyElement.addEventListener('click', function() {
    selectButton(this);
});

monthlyElement.addEventListener('mouseenter', function() {
    if (selectedElement !== this) {
        this.style.color = 'var(--offwhite)';
    }
    this.style.cursor = 'pointer';
});

monthlyElement.addEventListener('mouseleave', function() {
    if (selectedElement !== this) {
        this.style.color = 'var(--ultralightnavyblue)';
    }
});


// Function to update the datas
function updateDataDisplay(selectedButton) {
    if (timeTrackingData.length === 0) {
        console.log('Données pas encore chargées');
        return;
    }
    
    let timeframe = '';
    let previousLabel = '';
    
    // Timeframe definition
    if (selectedButton === dailyElement) {
        timeframe = 'daily';
        previousLabel = 'Yesterday';
    } else if (selectedButton === weeklyElement) {
        timeframe = 'weekly';
        previousLabel = 'Last Week';
    } else if (selectedButton === monthlyElement) {
        timeframe = 'monthly';
        previousLabel = 'Last Month';
    }
    
    // Data definition
    timeTrackingData.forEach(item => {
        const current = item.timeframes[timeframe].current;
        const previous = item.timeframes[timeframe].previous;
        
        switch(item.title) {
            case 'Work':
                workHoursElement.textContent = `${current}hrs`;
                workLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
            case 'Play':
                playHoursElement.textContent = `${current}hrs`;
                playLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
            case 'Study':
                studyHoursElement.textContent = `${current}hrs`;
                studyLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
            case 'Exercise':
                exerciseHoursElement.textContent = `${current}hrs`;
                exerciseLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
            case 'Social':
                socialHoursElement.textContent = `${current}hrs`;
                socialLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
            case 'Self Care':
                careHoursElement.textContent = `${current}hrs`;
                careLastWeekElement.textContent = `${previousLabel} - ${previous}hrs`;
                break;
        }
    });
}

loadData();