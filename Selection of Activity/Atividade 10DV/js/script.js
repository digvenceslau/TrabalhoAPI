
// Temperature conversion helpers and event wiring
// Exports a global `temp_change(from)` function so inline handlers (if present)
// and event listeners both work.

function toKelvin(value, unit) {
	const v = Number(value);
	if (Number.isNaN(v)) return NaN;
	switch (unit) {
		case 'C':
			return v + 273.15;
		case 'F':
			return (v - 32) * (5 / 9) + 273.15;
		case 'K':
			return v;
		default:
			return NaN;
	}
}

function fromKelvin(kelvin, unit) {
	if (!isFinite(kelvin)) return NaN;
	switch (unit) {
		case 'C':
			return kelvin - 273.15;
		case 'F':
			return (kelvin - 273.15) * (9 / 5) + 32;
		case 'K':
			return kelvin;
		default:
			return NaN;
	}
}

// Main conversion function. `from` should be either 'temp1' or 'temp2'.
function temp_change(from = 'temp1') {
	const temp1 = document.getElementById('temp1');
	const temp2 = document.getElementById('temp2');
	const unit1 = document.getElementById('unit1');
	const unit2 = document.getElementById('unit2');

	if (!temp1 || !temp2 || !unit1 || !unit2) return;

	if (from === 'temp1') {
		const raw = temp1.value.trim();
		if (raw === '') { temp2.value = ''; return; }
		let num = Number(raw);
		if (Number.isNaN(num)) { temp2.value = ''; return; }
		// If source unit is Kelvin, don't allow values below 0
		if (unit1.value === 'K' && num < 0) {
			num = 0;
			temp1.value = '0';
		}
        if (unit1.value === 'C' && num < -273.15) {
            num = 0;
            temp1.value = '0';
        }
        if (unit2.value === 'F' && num < -459.67) {
            num = 0;
            temp2.value = '0';
        }
		const k = toKelvin(num, unit1.value);
		const result = fromKelvin(k, unit2.value);
		temp2.value = Number.isNaN(result) ? '' : round(result, 2);
        updateBackgroundColor(num, unit1.value);
    } else {
		const raw = temp2.value.trim();
		if (raw === '') { temp1.value = ''; return; }
		let num = Number(raw);
		if (Number.isNaN(num)) { temp1.value = ''; return; }
		// If source unit is Kelvin, don't allow values below 0
		if (unit2.value === 'K' && num < 0) {
			num = 0;
			temp2.value = '0';
		}
        if (unit2.value === 'C' && num < -273.15) {
            num = 0;
            temp2.value = '0';
        }
        if (unit1.value === 'F' && num < -459.67) {
            num = 0;
            temp1.value = '0';
        }
		const k = toKelvin(num, unit2.value);
		const result = fromKelvin(k, unit1.value);
		temp1.value = Number.isNaN(result) ? '' : round(result, 2);
        updateBackgroundColor(num, unit2.value);
	}
}

function round(value, decimals = 2) {
	const factor = Math.pow(10, decimals);
	return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

// Helper to set/remove min attribute for Kelvin inputs
function updateMinForUnit(inputEl, unit) {
	if (!inputEl) return;
	if (unit === 'K') {
		inputEl.setAttribute('min', '0');
		if (inputEl.value !== '' && Number(inputEl.value) < 0) {
			inputEl.value = '0';
		}
	} else {
		inputEl.removeAttribute('min');
	}
}

// Attach live listeners so typing or changing units triggers conversion.
document.addEventListener('DOMContentLoaded', () => {
	const t1 = document.getElementById('temp1');
	const t2 = document.getElementById('temp2');
	const u1 = document.getElementById('unit1');
	const u2 = document.getElementById('unit2');
	if (!t1 || !t2 || !u1 || !u2) return;

	// Set initial min attributes depending on selected units
	updateMinForUnit(t1, u1.value);
	updateMinForUnit(t2, u2.value);

	t1.addEventListener('input', () => temp_change('temp1'));
	t2.addEventListener('input', () => temp_change('temp2'));

	u1.addEventListener('change', () => {
		updateMinForUnit(t1, u1.value);
		// Recalculate using left input as source
		temp_change('temp1');
	});

	u2.addEventListener('change', () => {
		updateMinForUnit(t2, u2.value);
		// Recalculate using left input as source (keeps behavior consistent)
		temp_change('temp1');
	});
});

// Function to change background color using CSS variable
function updateBackgroundColor(value, unit) {
    const tempInCelsius = fromKelvin(toKelvin(value, unit), 'C');
    const root = document.documentElement;
    
    if (tempInCelsius >= 25) {
        root.style.setProperty('--bg-color', '#6e2525ff'); // Light red for hot
    } else if (tempInCelsius <= 15) {
        root.style.setProperty('--bg-color', '#4c4c8aff'); // Light blue for cold
    } else {
        root.style.setProperty('--bg-color', '#585858ff'); // White for moderate
    }
}

// Make functions available globally for inline calls
window.temp_change = temp_change;
