document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('search');
  let allTalks = [];

  const eventSchedule = [
    { type: 'talk', time: '10:00 AM - 11:00 AM', talkIndex: 0 },
    { type: 'transition', time: '11:00 AM - 11:10 AM', duration: '10 min' },
    { type: 'talk', time: '11:10 AM - 12:10 PM', talkIndex: 1 },
    { type: 'transition', time: '12:10 PM - 12:20 PM', duration: '10 min' },
    { type: 'break', time: '12:20 PM - 1:20 PM', name: 'Lunch Break' },
    { type: 'transition', time: '1:20 PM - 1:30 PM', duration: '10 min' },
    { type: 'talk', time: '1:30 PM - 2:30 PM', talkIndex: 2 },
    { type: 'transition', time: '2:30 PM - 2:40 PM', duration: '10 min' },
    { type: 'talk', time: '2:40 PM - 3:40 PM', talkIndex: 3 },
    { type: 'break', time: '3:40 PM - 4:00 PM', name: 'Afternoon Break', duration: '20 min' },
    { type: 'talk', time: '4:00 PM - 5:00 PM', talkIndex: 4 },
    { type: 'transition', time: '5:00 PM - 5:10 PM', duration: '10 min' },
    { type: 'talk', time: '5:10 PM - 6:10 PM', talkIndex: 5 },
  ];


  async function fetchTalks() {
    try {
      const response = await fetch('/api/talks');
      allTalks = await response.json();
      renderSchedule(allTalks);
    } catch (error) {
      console.error('Error fetching talks:', error);
      scheduleContainer.innerHTML = '<p>Failed to load talks. Please try again later.</p>';
    }
  }

  function renderSchedule(talksToDisplay) {
    scheduleContainer.innerHTML = ''; // Clear previous content

    eventSchedule.forEach(item => {
      if (item.type === 'talk') {
        const talkData = allTalks[item.talkIndex];
        // Only render talk if it matches the search filter
        const isMatch = talksToDisplay.some(t => t.title === talkData.title);
        if (isMatch) {
          const talkCard = document.createElement('div');
          talkCard.classList.add('talk-card');
          talkCard.innerHTML = `
            <div class="time">${item.time}</div>
            <h2>${talkData.title}</h2>
            <div class="speakers">Speaker(s): ${talkData.speakers.join(', ')}</div>
            <div class="categories">Categories: ${talkData.categories.map(cat => `<span>${cat}</span>`).join('')}</div>
            <p class="description">${talkData.description}</p>
          `;
          scheduleContainer.appendChild(talkCard);
        }
      } else if (item.type === 'break') {
        const breakCard = document.createElement('div');
        breakCard.classList.add('break-card');
        breakCard.innerHTML = `
          <div class="time">${item.time}</div>
          <h3>${item.name}</h3>
          <p>${item.duration ? item.duration : ''}</p>
        `;
        scheduleContainer.appendChild(breakCard);
      } else if (item.type === 'transition') {
        // We can choose to render transitions or not. For now, let's keep it simple and not render them as separate cards.
        // If needed, they could be subtle dividers.
      }
    });

    if (talksToDisplay.length === 0 && searchInput.value !== '') {
      scheduleContainer.innerHTML = '<p>No talks found for the given category.</p>';
    }
  }

  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredTalks = allTalks.filter(talk =>
      talk.categories.some(category => category.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });

  // Initial fetch and render
  fetchTalks();
});
