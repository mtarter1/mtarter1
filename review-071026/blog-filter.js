(() => {
  const grid = document.querySelector('.blog-card-grid');
  const status = document.querySelector('#blog-filter-status');
  const controls = [...document.querySelectorAll('[data-blog-filter]')];

  if (!grid || !status || !controls.length) return;

  const cards = [...grid.querySelectorAll('[data-blog-state]')];
  const validFilters = new Set(controls.map((control) => control.dataset.blogFilter));
  const stateLabels = {
    massachusetts: 'Massachusetts',
    connecticut: 'Connecticut',
    'new-hampshire': 'New Hampshire',
    'rhode-island': 'Rhode Island',
    vermont: 'Vermont'
  };

  const sortCards = () => {
    [...cards]
      .sort((a, b) => {
        const dateOrder = b.dataset.published.localeCompare(a.dataset.published);
        if (dateOrder) return dateOrder;
        return Number(a.dataset.stateRank) - Number(b.dataset.stateRank);
      })
      .forEach((card) => grid.append(card));
  };

  const updateUrl = (filter) => {
    const url = new URL(window.location.href);
    if (filter === 'map') url.searchParams.delete('filter');
    else url.searchParams.set('filter', filter);
    window.history.replaceState({}, '', url);
  };

  const applyFilter = (filter, reflectInUrl = true) => {
    const activeFilter = validFilters.has(filter) ? filter : 'map';
    sortCards();
    grid.dataset.activeFilter = activeFilter;
    grid.hidden = activeFilter === 'map';

    cards.forEach((card) => {
      const shouldShow = activeFilter === 'all'
        || card.dataset.blogState === activeFilter;
      card.hidden = !shouldShow;
    });

    controls.forEach((control) => {
      control.setAttribute('aria-pressed', String(control.dataset.blogFilter === activeFilter));
    });

    if (activeFilter === 'map') {
      status.textContent = 'Select a state on the map to view its articles.';
    } else if (activeFilter === 'all') {
      status.textContent = `Showing all ${cards.length} posts, newest first.`;
    } else {
      const count = cards.filter((card) => card.dataset.blogState === activeFilter).length;
      status.textContent = `Showing ${count} ${stateLabels[activeFilter]} posts, newest first.`;
    }

    if (reflectInUrl) updateUrl(activeFilter);
  };

  controls.forEach((control) => {
    control.addEventListener('click', () => applyFilter(control.dataset.blogFilter));
    if (control.getAttribute('role') === 'button') {
      control.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          applyFilter(control.dataset.blogFilter);
        }
      });
    }
  });

  const initialFilter = new URL(window.location.href).searchParams.get('filter') || 'map';
  applyFilter(initialFilter, false);
})();
