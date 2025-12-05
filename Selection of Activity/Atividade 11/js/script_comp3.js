// Script for comparing three numbers when the compare button is clicked.
// Includes validation, equality cases, biggest/smallest results and
// escalating warnings for repeated clicks. Inputs changing resets the counter.

let _clickCount3 = 0;
let _last1 = null;
let _last2 = null;
let _last3 = null;

function compareThreeNumbers() {
    const input1 = document.getElementById('num1');
    const input2 = document.getElementById('num2');
    const input3 = document.getElementById('num3');
    const resEl = document.getElementById('result');

    if (!resEl || !input1 || !input2 || !input3) return;

    const a = parseFloat(input1.value);
    const b = parseFloat(input2.value);
    const c = parseFloat(input3.value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resEl.innerText = 'Please enter valid numbers in all fields.';
        return;
    }

    // If inputs have changed since last comparison, reset the click counter
    if (_last1 !== null && (_last1 !== a || _last2 !== b || _last3 !== c)) {
        _clickCount3 = 0;
    }

    _clickCount3 += 1;

    // First click: show comparison (bullet list output)
    if (_clickCount3 === 1) {
        _last1 = a; _last2 = b; _last3 = c;

        // Build bullet items according to the rules:
        // - If all equal: "The numbers are all equal"
        // - If two equal: state which ones are equal (pairs)
        // - If all different: "The numbers are all different" and show biggest/smallest
        const items = [];

        if (a === b && b === c) {
            items.push('The numbers are all equal');
            resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
            return;
        }

        // Two-equal cases
        if (a === b && b !== c) {
            items.push('Number 1 and Number 2 are equal');
            const biggestVal = Math.max(a, b, c);
            const smallestVal = Math.min(a, b, c);
            const biggestLabels = [];
            const smallestLabels = [];
            if (a === biggestVal) biggestLabels.push(`Number 1 (${a})`);
            if (b === biggestVal) biggestLabels.push(`Number 2 (${b})`);
            if (c === biggestVal) biggestLabels.push(`Number 3 (${c})`);
            if (a === smallestVal) smallestLabels.push(`Number 1 (${a})`);
            if (b === smallestVal) smallestLabels.push(`Number 2 (${b})`);
            if (c === smallestVal) smallestLabels.push(`Number 3 (${c})`);
            items.push(`Biggest: ${biggestLabels.join(' and ')}`);
            items.push(`Smallest: ${smallestLabels.join(' and ')}`);
            resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
            return;
        }

        if (a === c && a !== b) {
            items.push('Number 1 and Number 3 are equal');
            const biggestVal = Math.max(a, b, c);
            const smallestVal = Math.min(a, b, c);
            const biggestLabels = [];
            const smallestLabels = [];
            if (a === biggestVal) biggestLabels.push(`Number 1 (${a})`);
            if (b === biggestVal) biggestLabels.push(`Number 2 (${b})`);
            if (c === biggestVal) biggestLabels.push(`Number 3 (${c})`);
            if (a === smallestVal) smallestLabels.push(`Number 1 (${a})`);
            if (b === smallestVal) smallestLabels.push(`Number 2 (${b})`);
            if (c === smallestVal) smallestLabels.push(`Number 3 (${c})`);
            items.push(`Biggest: ${biggestLabels.join(' and ')}`);
            items.push(`Smallest: ${smallestLabels.join(' and ')}`);
            resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
            return;
        }

        if (b === c && a !== b) {
            items.push('Number 2 and Number 3 are equal');
            const biggestVal = Math.max(a, b, c);
            const smallestVal = Math.min(a, b, c);
            const biggestLabels = [];
            const smallestLabels = [];
            if (a === biggestVal) biggestLabels.push(`Number 1 (${a})`);
            if (b === biggestVal) biggestLabels.push(`Number 2 (${b})`);
            if (c === biggestVal) biggestLabels.push(`Number 3 (${c})`);
            if (a === smallestVal) smallestLabels.push(`Number 1 (${a})`);
            if (b === smallestVal) smallestLabels.push(`Number 2 (${b})`);
            if (c === smallestVal) smallestLabels.push(`Number 3 (${c})`);
            items.push(`Biggest: ${biggestLabels.join(' and ')}`);
            items.push(`Smallest: ${smallestLabels.join(' and ')}`);
            resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
            return;
        }

        // All different
        const biggest = Math.max(a, b, c);
        const smallest = Math.min(a, b, c);
        items.push('The numbers are all different');
        items.push(`Biggest: ${biggest}`);
        items.push(`Smallest: ${smallest}`);
        resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
        return;
    }

    // Repeated clicks: escalate warnings/actions
    if (_clickCount3 === 2) {
        resEl.innerText = "I am shy — please don't click again.";
        return;
    }
    if (_clickCount3 === 3) {
        resEl.innerText = 'Stop.';
        return;
    }
    if (_clickCount3 === 4) {
        resEl.innerText = "If you click again I'll close the window you prick.";
        return;
    }
    if (_clickCount3 >= 5) {
        try {
            window.close();
            window.open('', '_self').close();
        } catch (e) {
            document.documentElement.innerHTML = '<p style="font-family: Poppins, sans-serif; font-size:18px; padding:20px;">Window closed.</p>';
        }
    }
}

// Bind the compare function to the button and reset counter on input change
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('compareBtn');
    const i1 = document.getElementById('num1');
    const i2 = document.getElementById('num2');
    const i3 = document.getElementById('num3');
    const res = document.getElementById('result');

    if (btn) btn.addEventListener('click', compareThreeNumbers);

    [i1, i2, i3].forEach(i => {
        if (!i) return;
        i.addEventListener('input', function () {
            _clickCount3 = 0;
            _last1 = _last2 = _last3 = null;
            if (res) res.innerText = '';
        });
    });
});