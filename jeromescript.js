// Clock functionality
function createClock(id, timezoneOffset) {
  const clock = document.getElementById(id);
  const hands = {
    hour: document.createElement('div'),
    minute: document.createElement('div'),
    second: document.createElement('div')
  };

  Object.entries(hands).forEach(([type, element]) => {
    element.className = `hand ${type}-hand`;
    element.style.position = 'absolute';
    element.style.bottom = '50%';
    element.style.left = '50%';
    element.style.transformOrigin = '50% 100%';
    element.style.width = '1.5px';
    element.style.backgroundColor = '#333';

    if (type === 'hour') {
      element.style.height = '25%';
      element.style.backgroundColor = '#000';
    } else if (type === 'minute') {
      element.style.height = '35%';
    } else {
      element.style.height = '40%';
      element.style.backgroundColor = '#888';
    }

    clock.appendChild(element);
  });

  function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (3600000 * timezoneOffset));

    const seconds = cityTime.getSeconds();
    const minutes = cityTime.getMinutes();
    const hours = cityTime.getHours();

    hands.second.style.transform = `rotate(${(seconds * 6)}deg)`;
    hands.minute.style.transform = `rotate(${(minutes * 6) + (seconds * 0.1)}deg)`;
    hands.hour.style.transform = `rotate(${(hours * 30) + (minutes * 0.5)}deg)`;
  }

  setInterval(updateClock, 1000);
  updateClock();
}

document.addEventListener('DOMContentLoaded', () => {
  createClock('nyc-clock', -4); // EDT
  createClock('paris-clock', 2); // CEST
});

// 1) Property data
const nycProps = {
  'nyc1': { address: '2284 Amsterdam Avenue', type: 'Residential Building', sqft: '17,500 sq ft', price: '$10 million', role: 'Developer' },
  'nyc2': { address: '330 E 79th Street', type: 'Retail Condo', sqft: '6,000 sq ft', price: '$12 million', role: 'Broker' },
  'nyc3': { address: '401 E 74th Street', type: 'Residential PH', sqft: '4,600 sq ft', price: '$3.5 million', role: 'Broker' },
  'nyc4': { address: '400 E 67th Street', type: 'Residential Condo Bulk', sqft: '5,200 sq ft', price: '$7 million', role: 'Broker' },
  'nyc5': { address: '5 E 59th Street', type: 'Office Retail Building', sqft: '43,000 sq ft', price: '$47 million', role: 'Broker' },
  'nyc6': { address: '320 E 22nd Street', type: 'Residential Building', sqft: '67,000 sq ft', price: '$39 million', role: 'Broker' },
  'nyc7': { address: 'West 10th Street', type: 'Residential Building', sqft: '10,130 sq ft', price: '$5.5 million', role: 'Developer' },
  'nyc8': { address: '11 Bond Street', type: 'Retail Building', sqft: '16,410 sq ft', price: '$26 million', role: 'Broker' },
  'nyc9': { address: '54 Bond Street', type: 'Retail Condo', sqft: '4,622 sq ft', price: '$17.5 million', role: 'Broker' },
  'nyc10': { address: '416 Washington Street', type: 'Retail and Garage', sqft: '24,000 sq ft', price: '$10 million', role: 'Broker' },
  'nyc11': { address: '100 Franklin Street', type: 'Development Site', sqft: '30,000 sq ft', price: '$10 million', role: 'Broker' }
};

const parisProps = {
  'paris1': { address: 'Rue Laugier', type: 'Residential Building', sqft: '10,500 sq. ft.', price: '€3 million', role: 'Broker' },
  'paris10': { address: 'Rue de Douai', type: 'Retail Condo', sqft: '300 sq. ft.', price: '€400,000', role: 'Developer' },
  'paris11': { address: 'Rue de Casablanca', type: 'Residential Apt', sqft: '350 sq. ft.', price: '€200,000', role: 'Developer' },
  'paris12': { address: 'Rue de la Boétie', type: 'Retail Condo', sqft: '3,000 sq. ft.', price: '€3 million', role: 'Broker' },
  'paris13': { address: 'Rue Vieille du Temple', type: 'Retail Condo', sqft: '15,000 sq. ft.', price: '€300,000', role: 'Broker' },
  'paris2': { address: '234 Rue St-Martin', type: 'Hotel Building', sqft: '4,500 sq. ft.', price: '€9 million', role: 'Developer' },
  'paris4': { address: '2 Rue de l’École Polytechnique', type: 'Residential Building', sqft: '5,500 sq. ft.', price: '€10 million', role: 'Developer' },
  'paris5': { address: '12 Rue des Arquebusiers', type: 'Residential Apt', sqft: '905 sq. ft.', price: '€1.5 million', role: 'Developer' },
  'paris6': { address: '12 Rue des Filles du Calvaire', type: 'Residential Apt', sqft: '1,150 sq. ft.', price: '€1.8 million', role: 'Developer' },
  'paris7': { address: 'Rue Duret', type: 'Residential Building', sqft: '5,400 sq. ft.', price: '€1.5 million', role: 'Broker' },
  'paris8': { address: 'Pantin', type: 'Industrial Building', sqft: '25,000 sq. ft.', price: '€1.5 million', role: 'Broker' },
  'paris9': { address: 'Rue de Passy', type: 'Residential Building', sqft: '7,500 sq. ft.', price: '€8 million', role: 'Broker' }
};


// 2) Map definitions
const maps = [
  { id: 'nyc-map', file: 'maps/nyc.svg', props: nycProps },
  { id: 'paris-map', file: 'maps/paris.svg', props: parisProps }
];

// 3) Tooltip element (capture the template, don't remove 'tooltip' variable name as it might be expected by other parts of a larger system)
// const tooltip = document.getElementById('tooltip'); // This will be used as a template

// 4) Pulse + tooltip helper (This function is removed as its logic is integrated below)
// function animatePulseAndTooltip(dot, info, tooltipInstance) { ... } 

// 5) Load maps and hook up events
document.addEventListener('DOMContentLoaded', () => {
  // Get the tooltip template from the DOM
  const tooltipTemplate = document.getElementById('tooltip');
  if (!tooltipTemplate) {
    console.error("Tooltip template element with ID 'tooltip' not found.");
    return;
  }


  maps.forEach(({ id, file, props }) => {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Container ${id} missing`);
      return;
    }

    fetch(file)
      .then(r => r.text())
      .then(svg => {
        container.innerHTML = svg;

        Object.entries(props).forEach(([dotId, info]) => {
          const dotElement = container.querySelector(`#${dotId}`);
          if (!dotElement) {
            console.warn(`Dot ${dotId} not found in ${file}`);
            return;
          }

          dotElement.classList.add('property-dot');

          const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          const dotBBox = dotElement.getBBox();
          hitArea.setAttribute("cx", String(dotBBox.x + dotBBox.width / 2));
          hitArea.setAttribute("cy", String(dotBBox.y + dotBBox.height / 2));
          hitArea.setAttribute("r", "6"); // Increased hit area radius while keeping visual dot small
          hitArea.style.fill = "transparent";
          hitArea.style.pointerEvents = "all";
          hitArea.style.cursor = "pointer";
          dotElement.parentNode.insertBefore(hitArea, dotElement.nextSibling);

          const dotTooltip = tooltipTemplate.cloneNode(false); // Use 'false' for shallow clone
          document.body.appendChild(dotTooltip);

          let showTooltipTimeoutId = null;

          function hideTooltip() {
            dotTooltip.style.opacity = '0';
            dotTooltip.addEventListener('transitionend', function clearContentOnEnd() {
              if (dotTooltip.style.opacity === '0') {
                dotTooltip.innerHTML = '';
              }
              // Removed manual removeEventListener as {once: true} handles it.
            }, { once: true }); // {once: true} ensures the listener fires once and is then removed.
          }

          hitArea.addEventListener('mouseenter', () => {
            // 1. Create and animate pulse immediately.
            const pulseRect = dotElement.getBoundingClientRect();
            const pulse = document.createElement('div');
            pulse.className = 'pulse';
            pulse.style.left = (pulseRect.left + window.scrollX + pulseRect.width / 2) + 'px';
            pulse.style.top = (pulseRect.top + window.scrollY + pulseRect.height / 2) + 'px';
            document.body.appendChild(pulse);
            pulse.addEventListener('animationend', () => pulse.remove(), { once: true });

            // 2. Clear any existing timeout to show this tooltip.
            if (showTooltipTimeoutId) {
              clearTimeout(showTooltipTimeoutId);
            }

            // 3. Schedule the tooltip to appear (position, content, and opacity).
            showTooltipTimeoutId = setTimeout(() => {
              const tooltipRect = hitArea.getBoundingClientRect();
              dotTooltip.style.left = (tooltipRect.left + window.scrollX + tooltipRect.width / 2 + 10) + 'px';
              dotTooltip.style.top = (tooltipRect.top + window.scrollY + tooltipRect.height / 2 + 10) + 'px';
              dotTooltip.innerHTML = Object.values(info).join('<br>');
              dotTooltip.style.opacity = 1; // Trigger fade-in animation

              showTooltipTimeoutId = null; // Timeout has executed.
            }, 100); // 200ms delay for tooltip appearance
          });

          hitArea.addEventListener('mouseleave', () => {
            // 1. CRITICAL FIX: Cancel any pending timeout to show the tooltip.
            if (showTooltipTimeoutId) {
              clearTimeout(showTooltipTimeoutId);
              showTooltipTimeoutId = null;
            }

            // 2. Hide the tooltip.
            hideTooltip();
          });
        });
      })
      .catch(err => console.error(`Error loading ${file}:`, err));
  });
});
