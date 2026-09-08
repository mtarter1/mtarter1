// PostHog product analytics for the public website.
!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split('.');
        2 === o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          });
      }
      ((p = t.createElement('script')).type = 'text/javascript'),
        (p.crossOrigin = 'anonymous'),
        (p.async = !0),
        (p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
        (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = 'posthog';
            return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
          },
          u.people.toString = function () {
            return u.toString(1) + '.people (stub)';
          },
          o = 'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug'.split(' '),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);

const reviewBase = '/review-071026/';
const isReviewPreview = window.location.pathname === reviewBase.slice(0, -1) || window.location.pathname.startsWith(reviewBase);
const analyticsOptOutKey = 'cts_analytics_opt_out';
const analyticsTrafficKey = 'cts_analytics_traffic_type';
const analyticsParams = new URLSearchParams(window.location.search);
const safeStorageGet = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
};
const safeStorageSet = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch (error) {
    return null;
  }
  return value;
};

if (analyticsParams.get('analytics') === 'off') safeStorageSet(window.localStorage, analyticsOptOutKey, '1');
if (analyticsParams.get('analytics') === 'on') {
  try {
    window.localStorage.removeItem(analyticsOptOutKey);
  } catch (error) {}
}
if (analyticsParams.get('traffic') === 'internal' || analyticsParams.get('analytics') === 'internal') {
  safeStorageSet(window.localStorage, analyticsTrafficKey, 'internal');
}
if (analyticsParams.get('traffic') === 'external' || analyticsParams.get('analytics') === 'external') {
  try {
    window.localStorage.removeItem(analyticsTrafficKey);
  } catch (error) {}
}

const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
const trafficType = safeStorageGet(window.localStorage, analyticsTrafficKey) === 'internal' ? 'internal' : 'external';
const isBotLike = (() => {
  const userAgent = navigator.userAgent || '';
  return Boolean(
    navigator.webdriver ||
    /bot|crawler|spider|headless|lighthouse|pagespeed|chrome-lighthouse|playwright|puppeteer|selenium|webdriver/i.test(userAgent),
  );
})();
const analyticsDisabled = isReviewPreview ||
  isLocalHost ||
  safeStorageGet(window.localStorage, analyticsOptOutKey) === '1' ||
  navigator.doNotTrack === '1' ||
  navigator.doNotTrack === 'yes' ||
  isBotLike;
const analyticsContext = {
  site: 'compliance-testing-services',
  review_preview: isReviewPreview,
  traffic_type: trafficType,
  page_path: window.location.pathname,
  page_url: window.location.href,
};
const trackAnalytics = (eventName, properties = {}) => {
  if (analyticsDisabled || typeof window.posthog?.capture !== 'function') return;
  window.posthog.capture(eventName, {
    ...analyticsContext,
    ...properties,
  });
};

if (!analyticsDisabled) {
  posthog.init('phc_CHFUtFcUJoQ5n8txL8B3PsK6N7Vi3DeAdi83qqkRBPjr', {
    api_host: 'https://t.compliance-testing.com',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    loaded: (client) => {
      client.register(analyticsContext);
    },
  });
}

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const brand = document.querySelector('.brand');
const navActions = document.querySelector('.nav-actions');
const reviewNavVersion = 'v=review-testing-links-20260903';
const reviewPage = (page = '', hash = '') => `${reviewBase}${page}?${reviewNavVersion}${hash}`;
const previewHref = (href) => {
  if (!isReviewPreview) return href;
  const reviewRoutes = {
    '/': reviewPage(),
    '/#contact': reviewPage('contact.html'),
    '/about.html': reviewPage('about.html'),
    '/brand.html': reviewPage('brand.html'),
    '/blog.html': reviewPage('blog.html'),
    '/contact.html': reviewPage('contact.html'),
    '/industry-links.html': reviewPage('industry-links.html'),
    '/services/': reviewPage('services.html'),
    '/services/monthly-inspections.html': reviewPage('services/monthly-inspections.html'),
    '/services/compliance-testing.html': reviewPage('services/compliance-testing.html'),
    '/services/third-party-testing.html': reviewPage('services.html', '#third-party-reporting'),
    '/services/hydrostatic-testing.html': reviewPage('services.html', '#hydrostatic-testing'),
    '/services/service-repair.html': reviewPage('parts.html'),
    '/services/operator-training.html': reviewPage('services/operator-training.html'),
    '/solutions/': reviewPage('', '#solutions'),
    '/solutions/independent-owners.html': reviewPage('solutions/independent-owners.html'),
    '/solutions/growing-portfolios.html': reviewPage('solutions/growing-portfolios.html'),
    '/solutions/critical-fueling.html': reviewPage('solutions/critical-fueling.html'),
    '/parts/': reviewPage('parts.html'),
    '/parts/index.html': reviewPage('parts.html'),
  };
  return reviewRoutes[href] || href;
};
const contactHref = isReviewPreview ? reviewPage('contact.html') : previewHref('/#contact');

if (brand && !brand.querySelector('.brand-name')) {
  brand.insertAdjacentHTML('beforeend', '<span class="brand-name">Compliance Testing Services</span>');
}

if (navActions) {
  navActions.innerHTML = `
    <a class="button secondary" href="tel:+17748725151">(774) 872-5151</a>
    <a class="button" href="${contactHref}">Request service</a>`;
}

if (navLinks) {
  navLinks.innerHTML = isReviewPreview
    ? `
    <div class="nav-group">
      <a class="nav-parent" href="${reviewPage('services.html')}">Services</a>
      <button class="nav-menu-toggle" type="button" aria-expanded="false" aria-label="Open Services menu">&#8964;</button>
      <div class="dropdown-menu">
        <a href="${reviewPage('services/monthly-inspections.html')}">Monthly Inspections</a>
        <a href="${reviewPage('services/compliance-testing.html')}">Testing</a>
        <a href="${reviewPage('parts.html')}">Repairs &amp; Parts</a>
        <a href="${reviewPage('services/operator-training.html')}">Operator Training</a>
      </div>
    </div>
    <div class="nav-group">
      <a class="nav-parent" href="${reviewPage('', '#solutions')}">Who we serve</a>
      <button class="nav-menu-toggle" type="button" aria-expanded="false" aria-label="Open Who we serve menu">&#8964;</button>
      <div class="dropdown-menu">
        <a href="${reviewPage('solutions/independent-owners.html')}">Independent Owners</a>
        <a href="${reviewPage('solutions/growing-portfolios.html')}">Growing Portfolios</a>
        <a href="${reviewPage('solutions/critical-fueling.html')}">Critical Fueling Operations</a>
      </div>
    </div>
    <a href="${reviewPage('about.html')}">About</a>
    <a href="${reviewPage('blog.html')}">Blog</a>`
    : `
    <div class="nav-group">
      <a class="nav-parent" href="/services/">Services</a>
      <button class="nav-menu-toggle" type="button" aria-expanded="false" aria-label="Open Services menu">&#8964;</button>
      <div class="dropdown-menu">
        <a href="/services/monthly-inspections.html">Monthly Inspections</a>
        <a href="/services/compliance-testing.html">Testing</a>
        <a href="/parts/">Repairs &amp; Parts</a>
        <a href="/services/operator-training.html">Operator Training</a>
      </div>
    </div>
    <div class="nav-group">
      <a class="nav-parent" href="/solutions/">Who we serve</a>
      <button class="nav-menu-toggle" type="button" aria-expanded="false" aria-label="Open Who we serve menu">&#8964;</button>
      <div class="dropdown-menu">
        <a href="/solutions/independent-owners.html">Independent Owners</a>
        <a href="/solutions/growing-portfolios.html">Growing Portfolios</a>
        <a href="/solutions/critical-fueling.html">Critical Fueling Operations</a>
      </div>
    </div>
    <a href="/about.html">About</a>`;
}

document.querySelectorAll('.nav-group').forEach((group) => {
  const toggle = group.querySelector('.nav-menu-toggle');
  toggle.addEventListener('click', () => {
    const willOpen = !group.classList.contains('open');
    document.querySelectorAll('.nav-group').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.nav-menu-toggle').setAttribute('aria-expanded', 'false');
    });
    group.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
});

const labelFor = (element) => (element.getAttribute('aria-label') || element.textContent || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 140);
const locationFor = (element) => {
  const section = element.closest('section');
  if (section) return section.id || section.className.split(/\s+/).find(Boolean) || 'section';
  if (element.closest('.site-header')) return 'header';
  if (element.closest('.site-footer')) return 'footer';
  return 'page';
};
document.addEventListener('click', (event) => {
  const target = event.target.closest('a, button');
  if (!target || target.matches('.menu-toggle, .nav-menu-toggle')) return;
  const href = target.getAttribute('href') || '';
  const label = labelFor(target);
  if (!label && !href) return;

  if (/^tel:/i.test(href)) {
    trackAnalytics('CTS Phone Click', { label, href, location: locationFor(target) });
    return;
  }

  if (/^mailto:/i.test(href)) {
    trackAnalytics('CTS Email Click', { label, href, location: locationFor(target) });
    return;
  }

  if (target.closest('.service-feature-grid, .catalog-selector-grid, .service-browser, .state-filter, .cadence-map')) {
    trackAnalytics('CTS Service Click', {
      label,
      href,
      location: locationFor(target),
      section: target.closest('section')?.id || '',
    });
    return;
  }

  if (target.closest('.tab-set')) {
    trackAnalytics('CTS Segment Click', {
      label,
      href,
      location: locationFor(target),
      section: target.closest('section')?.id || '',
    });
    return;
  }

  if (target.closest('.article-row, .article-stack, .article-featured-layout')) {
    trackAnalytics('CTS Article Click', {
      label,
      href,
      location: locationFor(target),
      section: target.closest('section')?.id || '',
    });
    return;
  }

  if (target.closest('.contact-grid, .cta-strip, .hero-actions, .nav-actions, .nav-links, .contact-page-form, .inquiry-form')) {
    trackAnalytics('CTS CTA Click', {
      label,
      href,
      location: locationFor(target),
      section: target.closest('section')?.id || '',
    });
    return;
  }

  if (target.matches('.button, .text-link, .brand, .nav-links a')) {
    trackAnalytics('CTS Navigation Click', {
      label,
      href,
      location: locationFor(target),
      section: target.closest('section')?.id || '',
    });
  }
});

const publicSolutionPages = {
  '/solutions/independent-owners.html': 'Independent Owners',
  '/solutions/growing-portfolios.html': 'Growing Portfolios',
  '/solutions/critical-fueling.html': 'Critical Fueling Operations'
};
const reviewSolutionPages = {
  '/review-071026/solutions/independent-owners.html': 'Independent Owners',
  '/review-071026/solutions/growing-portfolios.html': 'Growing Portfolios',
  '/review-071026/solutions/critical-fueling.html': 'Critical Fueling Operations'
};
const solutionPages = isReviewPreview ? reviewSolutionPages : publicSolutionPages;
if (solutionPages[window.location.pathname]) {
  const hero = document.querySelector('main .page-hero');
  if (hero) {
    const switcher = document.createElement('nav');
    switcher.className = 'container audience-switcher';
    switcher.setAttribute('aria-label', 'Who we serve');
    switcher.innerHTML = Object.entries(solutionPages).map(([href, label]) =>
      `<a href="${isReviewPreview ? `${href}?${reviewNavVersion}` : href}"${href === window.location.pathname ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('');
    hero.insertAdjacentElement('afterend', switcher);
  }
}

if (window.location.pathname === '/services/service-repair.html') {
  const repairSideNav = document.querySelector('.side-nav');
  if (repairSideNav) repairSideNav.insertAdjacentHTML('beforeend', '<a href="/parts/">Fuel System Parts</a>');
  const repairHeadings = [...document.querySelectorAll('.prose h2')];
  const capabilityHeading = repairHeadings.find((heading) => heading.textContent.includes('List your repair capabilities'));
  if (capabilityHeading) {
    capabilityHeading.textContent = 'Parts and components for the repair';
    capabilityHeading.nextElementSibling.textContent = 'CTS keeps frequently needed fueling-system parts on hand and can source additional components for installation during service work. View the parts overview or call to check availability.';
    capabilityHeading.nextElementSibling.insertAdjacentHTML('afterend', '<p><a class="text-link" href="/parts/">View fuel system parts →</a></p>');
  }
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-tabs]').forEach((tabSet) => {
  const buttons = [...tabSet.querySelectorAll('[role="tab"]')];
  const panels = [...tabSet.querySelectorAll('[role="tabpanel"]')];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.setAttribute('aria-selected', 'false'));
      panels.forEach((panel) => { panel.hidden = true; });
      button.setAttribute('aria-selected', 'true');
      const panel = tabSet.querySelector(`#${button.getAttribute('aria-controls')}`);
      if (panel) panel.hidden = false;
    });
  });
});

const stateFilter = document.querySelector('[data-state-filter-legacy]');
if (stateFilter) {
  const buttons = [...stateFilter.querySelectorAll('.state-button')];
  const title = stateFilter.querySelector('[data-state-title]');
  const copy = stateFilter.querySelector('[data-state-copy]');
  const source = stateFilter.querySelector('[data-state-source]');
  const cards = [...stateFilter.querySelectorAll('[data-state-card]')];
  const profiles = {
    all: {
      title: 'All service states',
      copy: 'Monthly inspection programs are currently available in Massachusetts and Rhode Island. Testing scope varies by state and system.',
      source: 'https://www.epa.gov/ust/resources-ust-owners-and-operators',
      services: [
        ['MA & RI', 'Monthly Inspections', 'Routine reviews, documentation, and issue identification in the two states where CTS currently offers monthly programs.', '/services/monthly-inspections.html', 'calendar'],
        ['System specific', 'Compliance Testing', 'Annual, multiyear, containment, tightness, and equipment testing based on jurisdiction and site configuration.', '/services/compliance-testing.html', 'testing'],
        ['Corrective work', 'Service & Repair', 'Responsive support for failed tests, equipment issues, and inspection findings.', '/services/service-repair.html', 'repair'],
        ['Team readiness', 'Operator Training', 'Practical guidance and documentation support for confident site teams.', '/services/operator-training.html', 'training']
      ]
    },
    ma: {
      title: 'Massachusetts',
      copy: 'CTS offers monthly inspection programs in Massachusetts. MassDEP also requires periodic equipment testing, three-year third-party inspections, and compliance certification on a separate three-year cycle.',
      source: 'https://www.mass.gov/guides/massdep-underground-storage-tank-ust-program',
      services: [
        ['Every 30 days', 'Monthly Inspections', 'Visual inspection, release-detection review, records, and follow-through for routine compliance items.', '/services/monthly-inspections.html', 'calendar'],
        ['Periodic testing', 'Equipment & Release Detection Testing', 'Testing may include overfill prevention, alarms, sensors, line-leak detection, and corrosion protection equipment.', '/services/compliance-testing.html', 'testing'],
        ['Typically 3-year', 'Containment & Sump Integrity', 'Integrity testing for applicable turbine, intermediate, dispenser, spill, and secondary-containment components.', '/services/hydrostatic-testing.html', 'testing'],
        ['Every 3 years', 'Third-Party Inspection Support', 'Preparation, inspection coordination, corrective work, records, and compliance-certification support.', '/services/third-party-testing.html', 'training']
      ]
    },
    ri: {
      title: 'Rhode Island',
      copy: 'CTS offers monthly inspection programs in Rhode Island. RIDEM publishes separate forms for annual testing, containment testing, tightness testing, and cathodic protection.',
      source: 'https://dem.ri.gov/environmental-protection-bureau/olrsmm/underground-storage-tank-management-program',
      services: [
        ['Monthly', 'Class B Monthly Inspections', 'Routine facility inspection, records review, issue documentation, and corrective-action follow-through.', '/services/monthly-inspections.html', 'calendar'],
        ['Annual forms', 'Annual UST Equipment Testing', 'Testing of applicable release-detection, overfill, alarm, sensor, and line-leak detection equipment.', '/services/compliance-testing.html', 'testing'],
        ['Containment', 'Sump, UDC & Hydrostatic Testing', 'Vacuum or hydrostatic testing for applicable sumps, under-dispenser containment, and spill containment.', '/services/hydrostatic-testing.html', 'testing'],
        ['System specific', 'Tightness & Cathodic Protection', 'Tank and line tightness testing plus impressed-current or sacrificial-anode testing when applicable.', '/services/third-party-testing.html', 'repair']
      ]
    },
    ct: {
      title: 'Connecticut',
      copy: 'Connecticut testing intervals depend heavily on tank and piping construction, age, and monitoring method. CTS does not currently offer a monthly inspection program in Connecticut.',
      source: 'https://portal.ct.gov/-/media/deep/underground_storage_tanks/ust_periodic_testing_table.pdf',
      services: [
        ['Often annual', 'Overfill & Release Detection Testing', 'Applicable overfill equipment, ATG consoles, probes, sensors, and line-leak detectors are commonly tested annually.', '/services/compliance-testing.html', 'testing'],
        ['Often 3-year', 'Secondary Containment Testing', 'Integrity testing may include tank and piping interstitial spaces, STP sumps, UDCs, spill buckets, and transition sumps.', '/services/hydrostatic-testing.html', 'testing'],
        ['Age dependent', 'Line & Tank Tightness Testing', 'Intervals can be annual, six-month, three-year, or not applicable depending on system category and monitoring.', '/services/third-party-testing.html', 'testing'],
        ['When applicable', 'Cathodic Protection Testing', 'Testing and documentation for protected steel components; Connecticut’s table identifies annual testing in applicable categories.', '/services/service-repair.html', 'repair']
      ]
    },
    nh: {
      title: 'New Hampshire',
      copy: 'New Hampshire requires monthly visual inspections by the owner/operator, but CTS does not currently sell a monthly inspection program there. CTS can support applicable testing and corrective work.',
      source: 'https://www.des.nh.gov/sites/g/files/ehbemt341/files/documents/2020-01/Env-Or%20400.pdf',
      services: [
        ['Equipment testing', 'Leak Monitoring & Overfill Testing', 'Functional testing for applicable leak-monitoring, alarm, sensor, and overfill-prevention equipment.', '/services/compliance-testing.html', 'testing'],
        ['Containment', 'Sump & Spill Tightness Testing', 'Hydrostatic or approved tightness testing for applicable containment sumps and spill containment.', '/services/hydrostatic-testing.html', 'testing'],
        ['System specific', 'Tank & Line Testing', 'Tightness and release-detection testing based on the installed tank, piping, and monitoring system.', '/services/third-party-testing.html', 'testing'],
        ['Corrective work', 'Service, Repair & Retesting', 'Repair support and required retesting after failed equipment or containment tests.', '/services/service-repair.html', 'repair']
      ]
    },
    vt: {
      title: 'Vermont',
      copy: 'Vermont requires periodic verification of spill, overfill, leak-detection, and secondary-containment equipment. CTS does not currently offer a monthly inspection program in Vermont.',
      source: 'https://dec.vermont.gov/sites/dec/files/documents/UST-Rules.pdf',
      services: [
        ['At least 3-year', 'Spill & Sump Tightness Testing', 'Liquid-tight testing of applicable spill containment and containment sumps using an approved method.', '/services/hydrostatic-testing.html', 'testing'],
        ['At least 3-year', 'Overfill Prevention Testing', 'Testing verifies that applicable overfill equipment activates at the required level and functions correctly.', '/services/compliance-testing.html', 'testing'],
        ['System specific', 'Leak Detection Verification', 'Functional verification of applicable alarms, probes, sensors, and release-detection components.', '/services/third-party-testing.html', 'testing'],
        ['After a failure', 'Repair, Retest & Documentation', 'Repair or replacement of failed components, passing retest documentation, and practical follow-through.', '/services/service-repair.html', 'repair']
      ]
    }
  };

  const showProfile = (state) => {
    const profile = profiles[state];
    title.textContent = profile.title;
    copy.textContent = profile.copy;
    source.href = profile.source;
    cards.forEach((card, index) => {
      const [kicker, cardTitle, cardCopy, href, glyph] = profile.services[index];
      card.href = previewHref(href);
      card.querySelector('[data-card-kicker]').textContent = kicker;
      card.querySelector('[data-card-title]').textContent = cardTitle;
      card.querySelector('[data-card-copy]').textContent = cardCopy;
      card.querySelector('[data-card-glyph]').className = `service-glyph glyph-${glyph}`;
    });
  };

  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    showProfile(button.dataset.state);
  }));
}

const serviceBrowser = document.querySelector('[data-state-filter]');
if (serviceBrowser) {
  const partsPromo = document.createElement('aside');
  partsPromo.className = 'parts-promo';
  partsPromo.innerHTML = `<span class="service-glyph service-glyph-asset parts-promo-icon" aria-hidden="true"><img src="/assets/icons/services/replacement-parts.svg" alt=""></span><div><strong>Need a nozzle, filter, swivel, breakaway, or other replacement part?</strong><p>See the types of parts CTS keeps available for service and repair work.</p></div><a class="button secondary" href="${previewHref('/parts/')}">View parts</a>`;
  serviceBrowser.insertAdjacentElement('afterend', partsPromo);
  const stateButtons = [...serviceBrowser.querySelectorAll('.state-button')];
  const tankFilter = document.createElement('div');
  tankFilter.className = 'tank-key';
  tankFilter.setAttribute('aria-label', 'Filter by tank type');
  tankFilter.innerHTML = '<span class="tank-key-label">Show</span><button type="button" data-tank="all" aria-pressed="true">All</button><button class="key-ust" type="button" data-tank="ust" aria-pressed="false"><i aria-hidden="true"></i> UST</button><button class="key-ast" type="button" data-tank="ast" aria-pressed="false"><i aria-hidden="true"></i> AST</button>';
  serviceBrowser.querySelector('.state-buttons').append(tankFilter);
  const tankButtons = [...tankFilter.querySelectorAll('button')];
  const catalog = serviceBrowser.querySelector('[data-service-catalog]');
  const stateTitle = serviceBrowser.querySelector('[data-state-title]');
  const stateCopy = serviceBrowser.querySelector('[data-state-copy]');
  const stateCount = serviceBrowser.querySelector('[data-state-count]');
  const stateSource = serviceBrowser.querySelector('[data-state-source]');
  const programSources = document.createElement('div');
  programSources.className = 'program-sources';
  stateSource.closest('.state-result-heading').hidden = true;
  stateSource.remove();
  serviceBrowser.querySelector('.state-disclaimer').insertAdjacentElement('afterend', programSources);
  const allStates = ['ma', 'ri', 'ct', 'nh', 'vt'];
  const stateLabels = { ma: 'MA', ri: 'RI', ct: 'CT', nh: 'NH', vt: 'VT' };
  const stateProfiles = {
    all: ['All CTS services', 'Showing the consolidated catalog across Massachusetts, Rhode Island, Connecticut, New Hampshire, and Vermont.', 'https://www.epa.gov/ust/resources-ust-owners-and-operators'],
    ma: ['Massachusetts services', 'Monthly programs, UST testing and certification, third-party inspections, CoC support, repairs, training, and aboveground-tank work.', 'https://www.mass.gov/guides/massdep-underground-storage-tank-ust-program'],
    ri: ['Rhode Island services', 'Monthly programs, annual and periodic UST testing, ERP certification support, repairs, and operator readiness.', 'https://dem.ri.gov/environmental-protection-bureau/compliance-and-inspection/compliance-programs/underground-storage'],
    ct: ['Connecticut services', 'Periodic testing varies significantly with tank and piping construction, age, monitoring method, and life-expectancy category.', 'https://portal.ct.gov/-/media/deep/underground_storage_tanks/ust_periodic_testing_table.pdf'],
    nh: ['New Hampshire services', 'Testing, tightness verification, repair, and documentation support for applicable UST systems.', 'https://www.des.nh.gov/sites/g/files/ehbemt341/files/documents/2020-01/Env-Or%20400.pdf'],
    vt: ['Vermont services', 'Periodic spill, sump, overfill, leak-detection, repair, and documentation support for applicable UST systems.', 'https://dec.vermont.gov/sites/dec/files/documents/UST-Rules.pdf']
  };
  const officialSources = {
    all: [],
    ma: [
      ['MassDEP UST', 'https://www.mass.gov/guides/massdep-underground-storage-tank-ust-program', 'ust'],
      ['DOR 21J', 'https://www.mass.gov/info-details/underground-storage-tank-program-ust', 'ust'],
      ['DFS AST', 'https://www.mass.gov/how-to/apply-for-aboveground-storage-tank-permits', 'ast']
    ],
    ri: [
      ['RIDEM UST', 'https://dem.ri.gov/environmental-protection-bureau/compliance-and-inspection/compliance-programs/underground-storage', 'ust'],
      ['RIDEM ERP', 'https://dem.ri.gov/environmental-protection-bureau/customer-and-technical-assistance/environmental-results/ust', 'ust']
    ],
    ct: [['CT DEEP UST', 'https://portal.ct.gov/-/media/deep/underground_storage_tanks/ust_periodic_testing_table.pdf', 'ust']],
    nh: [['NH DES UST', 'https://www.des.nh.gov/sites/g/files/ehbemt341/files/documents/2020-01/Env-Or%20400.pdf', 'ust']],
    vt: [['VT DEC UST', 'https://dec.vermont.gov/sites/dec/files/documents/UST-Rules.pdf', 'ust']]
  };
  const services = [
    { title: 'Monthly Inspections', category: 'MA + RI UST Programs', frequency: 'Every 30 days', states: ['ma', 'ri'], tanks: ['ust'], copy: 'Routine site checks, clear documentation, issue identification, and practical follow-through from a team that knows your operation.', href: '/services/monthly-inspections.html', glyph: 'calendar' },
    { title: 'Annual UST Testing', category: 'State UST Programs', frequency: 'Every year', states: allStates, copy: 'Testing for applicable overfill, release-detection, alarm, sensor, line-leak, and related UST equipment.', href: '/services/compliance-testing.html', glyph: 'gauge' },
    { title: 'Sump, Spill & Containment Testing', category: 'State UST Programs', frequency: 'Often every 3 years', states: allStates, copy: 'Hydrostatic, vacuum, or other approved integrity testing for applicable sumps, spill buckets, UDCs, and secondary containment.', href: '/services/hydrostatic-testing.html', glyph: 'containment' },
    { title: 'Tank, Line & Leak Testing', category: 'State UST Programs', frequency: 'Annual / 3-year / as required', states: allStates, copy: 'Tank tightness, line tightness, line-leak detector, and release-detection testing based on the installed system and state rules.', href: '/services/third-party-testing.html', glyph: 'pipeline' },
    { title: 'Cathodic Protection Testing', category: 'State UST Programs', frequency: 'Annual or every 3 years', states: allStates, copy: 'Testing and documentation for applicable impressed-current and sacrificial-anode corrosion-protection systems.', href: '/services/compliance-testing.html', glyph: 'corrosion' },
    { title: 'Third-Party Inspections (TPI)', category: 'MassDEP UST Program', frequency: 'Every 3 years', states: ['ma'], copy: 'Certified third-party UST inspection, records review, findings, reporting, and practical preparation for the next compliance step.', href: '/services/third-party-testing.html', glyph: 'inspection' },
    { title: 'Compliance Certification', category: 'MassDEP UST Program', frequency: 'Every 3 years', states: ['ma'], copy: 'Compliance Certification preparation and submission support on the MassDEP cycle between third-party inspections.', href: '/services/compliance-testing.html', glyph: 'certificate' },
    { title: 'Certificate of Compliance (CoC)', category: 'MA DOR · 21J Fund', frequency: 'Every 3 years', states: ['ma'], copy: 'Application and renewal support for the Department of Revenue’s UST Petroleum Product Cleanup Fund Certificate of Compliance.', href: '/services/compliance-testing.html', glyph: 'document' },
    { title: 'UST ERP Certification Support', category: 'RIDEM · UST ERP', frequency: 'Every 3 years', states: ['ri'], copy: 'Facility review, certification checklist, records, testing coordination, and Return to Compliance Plan support for Rhode Island’s mandatory UST Environmental Results Program.', href: '/services/compliance-testing.html', glyph: 'checklist' },
    { title: 'Aboveground Storage Tank Services', category: 'MA DFS · AST Program', frequency: 'Annual / 5-year permit cycle', states: ['ma'], copy: 'Inspection, testing, documentation, maintenance coordination, and State Fire Marshal permit-renewal support for regulated Massachusetts ASTs.', href: '/services/compliance-testing.html', glyph: 'ast' },
    { title: 'Service, Repair & Retesting', category: 'UST + AST Systems', frequency: 'As needed', states: allStates, copy: 'Responsive support when an inspection, test, alarm, or daily operation uncovers an equipment issue, including corrective work and retesting.', href: '/services/service-repair.html', glyph: 'repair' },
    { title: 'Operator Training', category: 'State Operator Programs', frequency: 'Initial & refresher', states: allStates, copy: 'Practical, site-aware guidance that helps operators understand responsibilities, maintain records, and respond confidently.', href: '/services/operator-training.html', glyph: 'training' }
  ];
  const serviceIconFiles = {
    calendar: 'home/monthly-inspections.svg', gauge: 'home/compliance-testing.svg', testing: 'home/compliance-testing.svg',
    containment: 'services/containment-testing.svg', pipeline: 'services/tank-line-testing.svg', corrosion: 'services/cathodic-protection.svg',
    inspection: 'services/third-party-inspection.svg', certificate: 'services/compliance-certification.svg', document: 'services/certificate-of-compliance.svg',
    checklist: 'services/erp-certification.svg', ast: 'services/aboveground-tank.svg', repair: 'home/service-repair.svg', training: 'home/operator-training.svg'
  };
  const serviceIconMarkup = (glyph) => `<span class="service-glyph service-glyph-asset" aria-hidden="true"><img src="/assets/icons/${serviceIconFiles[glyph] || serviceIconFiles.testing}" alt=""></span>`;

  services.forEach((service) => {
    if (!service.tanks) service.tanks = service.title.includes('Aboveground') ? ['ast'] : service.title.includes('Service, Repair') || service.title.includes('Operator Training') ? ['ust', 'ast'] : ['ust'];
  });

  const cadenceViews = {
    ma: [
      ['Every 30 days', [['Monthly A/B Operator Visual Inspection', 'CTS service']]],
      ['Every year', [['Annual UST Equipment Testing', 'CTS service'], ['AST Inspection', 'CTS service']]],
      ['Every 3 years', [['Sump, spill and containment testing', 'CTS service'], ['Third-Party Inspection (TPI)', 'CTS service'], ['Compliance Certification', 'CTS service'], ['Certificate of Compliance (CoC)', 'CTS service']]],
      ['Every 5 years', [['AST Use Permit Renewal Support', 'CTS service']]],
      ['System-specific / as needed', [['Tank, line and leak testing', 'CTS service'], ['Cathodic protection testing', 'CTS service'], ['Repair and retesting', 'CTS service'], ['Operator training', 'CTS service']]]
    ],
    ri: [
      ['Every 30 days', [['Class B monthly inspections', 'CTS service']]],
      ['Every year', [['Annual UST Equipment Testing', 'CTS service']]],
      ['Every 3 years', [['Sump, UDC, spill and containment testing', 'CTS service'], ['UST ERP compliance certification and coordination', 'CTS service']]],
      ['System-specific / as needed', [['Tank and line tightness testing', 'CTS service'], ['Cathodic protection testing', 'CTS service'], ['Repair and retesting', 'CTS service'], ['Operator training', 'CTS service']]]
    ],
    ct: [
      ['Every year', [['Overfill and Release-Detection Testing', 'CTS service'], ['Cathodic Protection Testing', 'CTS service']]],
      ['Every 3 years', [['Applicable secondary-containment testing', 'CTS service']]],
      ['6-month / annual / 3-year', [['Tank, line and leak testing by system category', 'CTS service']]],
      ['As needed', [['Repair, retesting and operator support', 'CTS service']]]
    ],
    nh: [
      ['Periodic', [['Leak-monitoring and overfill testing', 'CTS service'], ['Sump and spill tightness testing', 'CTS service']]],
      ['System-specific', [['Tank and line testing', 'CTS service'], ['Cathodic protection testing', 'CTS service']]],
      ['As needed', [['Repair, retesting and documentation support', 'CTS service']]]
    ],
    vt: [
      ['At least every 3 years', [['Spill and sump tightness testing', 'CTS service'], ['Overfill-prevention testing', 'CTS service']]],
      ['System-specific', [['Leak-detection verification', 'CTS service'], ['Tank, line and cathodic-protection testing', 'CTS service']]],
      ['As needed', [['Repair, retesting and passing-test documentation', 'CTS service']]]
    ]
  };

  let currentState = 'all';
  let currentTank = 'all';
  let selectedServiceTitle = services[0].title;
  const tankTypeFor = (name) => /\bAST\b|aboveground/i.test(name) ? 'ast' : /repair|retesting|operator training|documentation support/i.test(name) ? 'both' : 'ust';
  const glyphForCadence = (name) => /monthly/i.test(name) ? 'calendar' : /repair|retesting/i.test(name) ? 'repair' : /operator training/i.test(name) ? 'training' : /third-party/i.test(name) ? 'inspection' : /certificate of compliance/i.test(name) ? 'document' : /ERP/i.test(name) ? 'checklist' : /certification/i.test(name) ? 'certificate' : /AST use permit/i.test(name) ? 'document' : /AST inspection/i.test(name) ? 'ast' : /sump|spill|containment/i.test(name) ? 'containment' : /cathodic/i.test(name) ? 'corrosion' : /tank, line|tank and line|leak testing by/i.test(name) ? 'pipeline' : /annual UST|equipment|release-detection|overfill|leak-detection/i.test(name) ? 'gauge' : 'testing';
  const programForCadence = (name, type) => /certificate of compliance/i.test(name) ? 'DOR · 21J' : /third-party|^compliance certification$/i.test(name) ? 'MassDEP' : /ERP/i.test(name) ? 'RIDEM · ERP' : /\bAST\b/i.test(name) ? 'MA DFS' : type === 'both' ? 'UST + AST' : 'UST';
  const itemMatchesTank = (name) => {
    if (currentTank === 'all') return true;
    const type = tankTypeFor(name);
    return type === 'both' || type === currentTank;
  };
  const reviewServiceExplorePages = new Set([
    '/services/monthly-inspections.html',
    '/services/compliance-testing.html',
    '/services/service-repair.html',
    '/services/operator-training.html',
  ]);
  const serviceExploreLink = (service) => (!isReviewPreview || reviewServiceExplorePages.has(service.href))
    ? `<a class="text-link" href="${previewHref(service.href)}">Explore service →</a>`
    : '';
  const featuredServiceMarkup = (service) => `<article class="service-feature catalog-featured-card"><div class="service-feature-top">${serviceIconMarkup(service.glyph)}<span class="service-kicker">${service.category}</span></div><span class="service-frequency">${service.frequency}</span><h3>${service.title}</h3><p>${service.copy}</p><div class="service-state-tags" aria-label="Available states">${service.states.map((item) => `<span>${stateLabels[item]}</span>`).join('')}</div>${serviceExploreLink(service)}</article>`;
  const serviceSelectorMarkup = (service) => `<button class="catalog-selector${service.title === selectedServiceTitle ? ' is-selected' : ''}" type="button" data-service-title="${service.title}" aria-pressed="${service.title === selectedServiceTitle}">${serviceIconMarkup(service.glyph)}<span><small>${service.category}</small><strong>${service.title}</strong></span></button>`;

  const renderServices = () => {
    const visible = services.filter((service) => (currentState === 'all' || service.states.includes(currentState)) && (currentTank === 'all' || service.tanks.includes(currentTank)));
    const state = currentState;
    if (state === 'all') {
      catalog.className = 'service-catalog-selector';
      if (visible.length) {
        const selectedService = visible.find((service) => service.title === selectedServiceTitle) || visible[0];
        selectedServiceTitle = selectedService.title;
        catalog.innerHTML = `${featuredServiceMarkup(selectedService)}<div class="catalog-selector-grid">${visible.map(serviceSelectorMarkup).join('')}</div>`;
        catalog.querySelectorAll('.catalog-selector').forEach((button) => button.addEventListener('click', () => { selectedServiceTitle = button.dataset.serviceTitle; renderServices(); }));
      } else {
        catalog.innerHTML = '<p class="empty-services">No services match that search.</p>';
      }
    } else {
      catalog.className = 'cadence-map';
      const lanes = cadenceViews[state].map(([cadence, items]) => [cadence, items.filter(([name]) => itemMatchesTank(name))]).filter(([, items]) => items.length);
      catalog.innerHTML = lanes.length ? lanes.map(([cadence, items]) => `<section class="cadence-lane"><div class="cadence-label">${cadence}</div><div class="cadence-items">${items.map(([name]) => { const type = tankTypeFor(name); const glyph = glyphForCadence(name); const program = programForCadence(name, type); return `<div class="cadence-item tank-${type}">${serviceIconMarkup(glyph)}<span>${name}</span><small>${program}</small></div>`; }).join('')}</div></section>`).join('') : '<p class="empty-services">No tank-type-specific services are listed for this state yet. Contact CTS to confirm the scope for your system.</p>';
    }
    const [heading, description] = stateProfiles[state];
    stateTitle.textContent = heading;
    stateCopy.textContent = description;
    stateCount.textContent = state === 'all'
      ? `${visible.length} service categories`
      : '';
    const visibleSources = officialSources[state].filter(([, , tank]) => currentTank === 'all' || tank === currentTank || tank === 'both');
    programSources.innerHTML = visibleSources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`).join('');
    programSources.hidden = state === 'all' || visibleSources.length === 0;
  };

  stateButtons.forEach((button) => button.addEventListener('click', () => {
    stateButtons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    currentState = button.dataset.state;
    renderServices();
  }));
  tankButtons.forEach((button) => button.addEventListener('click', () => {
    tankButtons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    currentTank = button.dataset.tank;
    renderServices();
  }));
  renderServices();
}

const successBanner = document.querySelector('.success-banner');
if (successBanner && new URLSearchParams(window.location.search).get('submitted') === 'true') {
  successBanner.classList.add('visible');
  const submissionKey = `cts_contact_submitted:${window.location.pathname}`;
  if (typeof window.sessionStorage !== 'undefined' && window.sessionStorage.getItem(submissionKey) !== '1') {
    trackAnalytics('CTS Contact Form Submitted', {
      form_type: window.location.pathname.includes('/contact') ? 'dedicated-contact' : 'homepage-inline',
    });
    try {
      window.sessionStorage.setItem(submissionKey, '1');
    } catch (error) {}
  }
}
